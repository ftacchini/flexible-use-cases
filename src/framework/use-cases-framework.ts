import {
    FlexibleActivationContext,
    FlexibleExtractor,
    FlexibleFramework,
    FlexibleMiddlewareDocument,
    FlexiblePipelineDocument,
    FlexibleRecipe,
    Type
} from "flexible-core";
import { injectable, inject } from "inversify";
import { USE_CASES_FRAMEWORK_TYPES } from "./use-cases-framework-types";
import { flatten } from "lodash";
import { UseCasesFactory } from "./loader/use-cases-factory";
import { 
    ActivationContextProvider, 
    ControllerLoader, 
    ExtractorDefinition, 
    EXTRACTOR_KEY, 
    MiddlewareDefinition, 
    MIDDLEWARE_KEY } from "flexible-decorators";
import { USE_CASE_KEY } from "./decorators/use-cases-keys";
import { UseCaseDefinition } from "./decorators/use-case";
import { UseCaseActivationContextProvider } from "./activation/use-case-activation-context-provider";

@injectable()
export class UseCasesFramework implements FlexibleFramework {

    constructor(
        @inject(USE_CASES_FRAMEWORK_TYPES.USE_CASES_LOADER) private controllerLoader: ControllerLoader,
        @inject(USE_CASES_FRAMEWORK_TYPES.USE_CASES_FACTORY) private recipeFactory: UseCasesFactory,

    ) {
    }

    public async createPipelineDefinitions(): Promise<FlexiblePipelineDocument[]> {
        let candidateUseCases = await this.controllerLoader.loadControllers() || [];

        let useCases = candidateUseCases.filter(candidateUseCase => {
            return this.hasMetadata(USE_CASE_KEY, candidateUseCase);
        })

        let pipelineDocuments = flatten(useCases.map(useCase => {
            let useCaseDefinitions: UseCaseDefinition[] = this.getMetadata(USE_CASE_KEY, useCase);

            return useCaseDefinitions.map(useCaseDefinition => {
                return this.createPipelineDocument(useCase, useCaseDefinition);
            });
        }));

        return pipelineDocuments;
    }

    private createPipelineDocument(
        target: Type<any>,
        useCaseDefinition: UseCaseDefinition): FlexiblePipelineDocument {

        return {
            middlewareStack: this.createMiddlewareStack(target, useCaseDefinition),
            filterStack: useCaseDefinition.trigger.toFilter()
        }
    }

    private createMiddlewareStack(
        target: Type<any>,
        controllerDefinition: UseCaseDefinition): FlexibleMiddlewareDocument[] {

        const [preConditions, postConditions] = this.createExternalConditionsMiddleware(target);

        let useCaseActivationContextProvider = UseCaseActivationContextProvider(
            target,
            {},
            controllerDefinition.singleton,
            this.recipeFactory
        );

        const routeMiddleware = this.createUseCaseMiddleware(useCaseActivationContextProvider, target);
        return [...preConditions, ...routeMiddleware, ...postConditions];
    }

    private createUseCaseMiddleware(
        activationContextProvider: (method: any) => FlexibleActivationContext,
        target: Type<any>, 
    ): FlexibleMiddlewareDocument[] {

        let candidateMiddleware = Object.getOwnPropertyNames(target.prototype) || [];

        let middlewareProperties = flatten(candidateMiddleware.filter(candidateMiddleware => {
            return this.hasMetadata(MIDDLEWARE_KEY, target, candidateMiddleware);
        }));

        let middlewareDefinitions: MiddlewareDefinition<object>[] = flatten(middlewareProperties.map(property => {
            return this.getMetadata(MIDDLEWARE_KEY, target, property) || [];
        }));

        return middlewareDefinitions
            .map(middlewareDefinition => {

                let activationContext = activationContextProvider(
                    middlewareDefinition.method,
                );

                let extractorRecipes = this.createExtractorRecipes(middlewareDefinition.middleware,  middlewareDefinition.method);

                return {
                    activationContext: activationContext,
                    extractorRecipes: extractorRecipes,
                    priority: middlewareDefinition.priority
                }
            })
            .sort(middlewareDefinition => middlewareDefinition.priority);
    }

    private createExternalConditionsMiddleware(
        target: Type<any>, 
        property?: string): [FlexibleMiddlewareDocument[], FlexibleMiddlewareDocument[]] {
        
        if (!this.hasMetadata(MIDDLEWARE_KEY, target, property)) {
            return [[], []];
        }

        let middlewareDefinitions: MiddlewareDefinition<object>[] = this.getMetadata(MIDDLEWARE_KEY, target, property) || [];

        return middlewareDefinitions
            .map(middlewareDefinition => {

                let activationContext = ActivationContextProvider(
                    middlewareDefinition.middleware,
                    middlewareDefinition.config,
                    middlewareDefinition.method,
                    middlewareDefinition.singleton,
                    this.recipeFactory
                );

                let extractorRecipes = this.createExtractorRecipes(middlewareDefinition.middleware,  middlewareDefinition.method);

                return {
                    activationContext: activationContext,
                    extractorRecipes: extractorRecipes,
                    priority: middlewareDefinition.priority
                }
            })
            .sort(middlewareDefinition => middlewareDefinition.priority)
            .reduce((result, element) => {
                result[element.priority <= 0 ? 0 : 1].push(element); 
                return result;
            }, [[], []]);
    }

    private createExtractorRecipes(target: Type<any>, property: string): {
        [paramIndex: number]: FlexibleRecipe<FlexibleExtractor> | FlexibleRecipe<FlexibleExtractor>[];
    } {
        let extractorDefinitions: ExtractorDefinition<FlexibleExtractor>[] = this.getMetadata(EXTRACTOR_KEY, target, property) || [];

        let extractors:  {
            [paramIndex: number]: FlexibleRecipe<FlexibleExtractor> | FlexibleRecipe<FlexibleExtractor>[];
        } = {};

        extractorDefinitions.forEach(extractorDefinition => {
            extractors[extractorDefinition.index] = {
                configuration: extractorDefinition.configuration,
                type: extractorDefinition.extractor
            }
        })

        return extractors;
    }

    private hasMetadata(key: Symbol, target: any, property?: string) {
        return Reflect.getMetadata(key, property ? target.prototype : target, property);
    }

    private getMetadata(key: Symbol, target: any, property?: string): any {
        return Reflect.getMetadata(key, property ? target.prototype : target, property);
    }
}