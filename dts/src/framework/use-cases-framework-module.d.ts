import { FlexibleFrameworkModule } from "flexible-core";
import { ControllerLoader } from "flexible-decorators";
import { ContainerModule, Container } from "inversify";
import { UseCasesFramework } from "./use-cases-framework";
export declare class UseCasesFrameworkModule implements FlexibleFrameworkModule {
    private controllerLoader;
    constructor(controllerLoader: ControllerLoader);
    get isolatedContainer(): ContainerModule;
    get container(): ContainerModule;
    getInstance(container: Container): UseCasesFramework;
}
