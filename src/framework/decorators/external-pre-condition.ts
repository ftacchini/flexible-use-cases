import { Type } from "flexible-core";
import { Middleware } from "flexible-decorators";

export const ExternalPreCondition = function attributeDefinition<T extends object>(
    middleware: Type<T>,
    method: keyof T,
    { singleton = false, config = {}}: {
        singleton?: boolean,
        config?: Partial<T>
    } = {}) {
        return Middleware(middleware, method, { singleton, config, priority: -150 });
}