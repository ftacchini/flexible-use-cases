import { FlexibleFramework, FlexiblePipelineDocument } from "flexible-core";
import { UseCasesFactory } from "./loader/use-cases-factory";
import { ControllerLoader } from "flexible-decorators";
export declare class UseCasesFramework implements FlexibleFramework {
    private controllerLoader;
    private recipeFactory;
    constructor(controllerLoader: ControllerLoader, recipeFactory: UseCasesFactory);
    createPipelineDefinitions(): Promise<FlexiblePipelineDocument[]>;
    private createPipelineDocument;
    private createMiddlewareStack;
    private createUseCaseMiddleware;
    private createExternalConditionsMiddleware;
    private createExtractorRecipes;
    private hasMetadata;
    private getMetadata;
}
