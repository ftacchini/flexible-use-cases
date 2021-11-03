import { FlexibleFrameworkModule } from "flexible-core";
import { ControllerLoader } from "flexible-decorators";
import { AsyncContainerModule, Container, interfaces } from "inversify";
import { UseCasesFramework } from "./use-cases-framework";
import { UseCasesFactory } from "./loader/use-cases-factory";
import { USE_CASES_FRAMEWORK_TYPES } from "./use-cases-framework-types";

export class UseCasesFrameworkModule implements FlexibleFrameworkModule {

    constructor(
        private controllerLoader: ControllerLoader
    ) { 
    }

    public get isolatedContainer(): AsyncContainerModule {
        var module = new AsyncContainerModule(async (
            bind: interfaces.Bind,
            unbind: interfaces.Unbind,
            isBound: interfaces.IsBound,
            rebind: interfaces.Rebind) => {

            isBound(USE_CASES_FRAMEWORK_TYPES.USE_CASES_FRAMEWORK) || bind(USE_CASES_FRAMEWORK_TYPES.USE_CASES_FRAMEWORK).to(UseCasesFramework);
            isBound(USE_CASES_FRAMEWORK_TYPES.USE_CASES_LOADER) || bind(USE_CASES_FRAMEWORK_TYPES.USE_CASES_LOADER).toConstantValue(this.controllerLoader);
            isBound(USE_CASES_FRAMEWORK_TYPES.USE_CASES_FACTORY) || bind(USE_CASES_FRAMEWORK_TYPES.USE_CASES_FACTORY).to(UseCasesFactory);
        });

        return module;
    }

    public get container(): AsyncContainerModule {
        var module = new AsyncContainerModule(async (
            bind: interfaces.Bind,
            unbind: interfaces.Unbind,
            isBound: interfaces.IsBound,
            rebind: interfaces.Rebind) => {
        });

        return module;
    }

    public getInstance(container: Container): UseCasesFramework {
        container.isBound(USE_CASES_FRAMEWORK_TYPES.USE_CASES_CONTAINER) || container.bind(USE_CASES_FRAMEWORK_TYPES.USE_CASES_CONTAINER).toConstantValue(container);
        return container.get(USE_CASES_FRAMEWORK_TYPES.USE_CASES_FRAMEWORK);
    }
}