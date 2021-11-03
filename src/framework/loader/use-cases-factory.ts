import { ControllerFactory } from "flexible-decorators";
import { injectable, inject, Container } from "inversify";
import { USE_CASES_FRAMEWORK_TYPES } from "../use-cases-framework-types";

@injectable()
export class UseCasesFactory extends ControllerFactory {

    constructor(
        @inject(USE_CASES_FRAMEWORK_TYPES.USE_CASES_CONTAINER) container: Container) {
            super(container);
    }

}