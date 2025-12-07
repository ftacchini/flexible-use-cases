import { FlexibleFrameworkModule } from "flexible-core";
import { ControllerLoader } from "flexible-decorators";
import { ContainerModule, Container } from "inversify";
import { UseCasesFramework } from "./use-cases-framework";
import { UseCasesFactory } from "./loader/use-cases-factory";
import { USE_CASES_FRAMEWORK_TYPES } from "./use-cases-framework-types";
import { UseCasesFrameworkModuleBuilder } from "./use-cases-framework-module-builder";

export class UseCasesFrameworkModule implements FlexibleFrameworkModule {

    /**
     * Creates a new builder for constructing UseCasesFrameworkModule instances.
     * @returns A new UseCasesFrameworkModuleBuilder instance
     */
    public static builder(): UseCasesFrameworkModuleBuilder {
        return new UseCasesFrameworkModuleBuilder();
    }

    constructor(
        private controllerLoader: ControllerLoader
    ) {
    }

    public get isolatedContainer(): ContainerModule {
        var module = new ContainerModule(({ bind, unbind, isBound, rebind }) => {
            isBound(USE_CASES_FRAMEWORK_TYPES.USE_CASES_FRAMEWORK) || bind(USE_CASES_FRAMEWORK_TYPES.USE_CASES_FRAMEWORK).to(UseCasesFramework);
            isBound(USE_CASES_FRAMEWORK_TYPES.USE_CASES_LOADER) || bind(USE_CASES_FRAMEWORK_TYPES.USE_CASES_LOADER).toConstantValue(this.controllerLoader);
            isBound(USE_CASES_FRAMEWORK_TYPES.USE_CASES_FACTORY) || bind(USE_CASES_FRAMEWORK_TYPES.USE_CASES_FACTORY).to(UseCasesFactory);
        });

        return module;
    }

    public get container(): ContainerModule {
        var module = new ContainerModule(({ bind, unbind, isBound, rebind }) => {
        });

        return module;
    }

    public getInstance(container: Container): UseCasesFramework {
        container.isBound(USE_CASES_FRAMEWORK_TYPES.USE_CASES_CONTAINER) || container.bind(USE_CASES_FRAMEWORK_TYPES.USE_CASES_CONTAINER).toConstantValue(container);
        return container.get(USE_CASES_FRAMEWORK_TYPES.USE_CASES_FRAMEWORK);
    }
}