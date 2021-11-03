import { ControllerLoader } from "flexible-decorators";
import { UseCasesFrameworkModule } from "./use-cases-framework-module";
import { PathUseCaseLoader } from "./loader";

export class UseCasesFrameworkModuleBuilder {
    
    private controllerLoader: ControllerLoader;

    private static _instance: UseCasesFrameworkModuleBuilder;
    public static get instance() {
        return this._instance || (this._instance = new UseCasesFrameworkModuleBuilder());
    }

    private constructor() {
        this.reset();
    }

    public withUseCaseLoader(controllerLoader: ControllerLoader): this {
        this.controllerLoader = controllerLoader;
        return this;
    }

    public build() {

        let module: UseCasesFrameworkModule = new UseCasesFrameworkModule(
            this.controllerLoader || new PathUseCaseLoader()
        );

        this.reset();
        return module;
    }

    public reset() {
        this.controllerLoader = null;
    }
}