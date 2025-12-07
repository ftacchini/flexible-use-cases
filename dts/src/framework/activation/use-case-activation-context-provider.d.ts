import { Type, FlexibleActivationContext } from "flexible-core";
import { ControllerFactory } from "flexible-decorators";
export declare function UseCaseActivationContextProvider<T extends object>(target: Type<T>, configuration: Partial<T>, singleton: boolean, recipeFactory: ControllerFactory): (method: keyof T) => FlexibleActivationContext;
