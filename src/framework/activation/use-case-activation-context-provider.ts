import { Type, FlexibleActivationContext } from "flexible-core";
import { ControllerFactory } from "flexible-decorators";


export function UseCaseActivationContextProvider<T extends object>(
    target: Type<T>,
    configuration: Partial<T>,
    singleton: boolean,
    recipeFactory: ControllerFactory): (method: keyof T) => FlexibleActivationContext {

    type UseCaseContext = { useCase?: T };

    let singletonContext: UseCaseContext = {};

    return (method: keyof T): FlexibleActivationContext => {
        return {
            activate: function (contextBinnacle: { [key: string]: any; }, ...params: any[]) {

                var useCase: T;

                if (singleton) {
                    useCase = singletonContext.useCase || (singletonContext.useCase = recipeFactory.createController({
                        configuration: configuration,
                        type: target
                    }));
                }
                else {
                    useCase = contextBinnacle.useCase || (contextBinnacle.useCase = recipeFactory.createController({
                        configuration: configuration,
                        type: target
                    }));
                }

                return (<any>useCase[method])(...params);
            }
        }

    }


}