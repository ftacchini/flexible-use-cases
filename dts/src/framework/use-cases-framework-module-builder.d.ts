import { ControllerLoader } from "flexible-decorators";
import { UseCasesFrameworkModule } from "./use-cases-framework-module";
export declare class UseCasesFrameworkModuleBuilder {
    private controllerLoader;
    private static _instance;
    static get instance(): UseCasesFrameworkModuleBuilder;
    private constructor();
    withUseCaseLoader(controllerLoader: ControllerLoader): this;
    build(): UseCasesFrameworkModule;
    reset(): void;
}
