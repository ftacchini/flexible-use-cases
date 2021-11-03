import { Middleware } from "flexible-decorators";

export const PreCondition = function attributeDefinition(
    { priority = 0 }: { priority?: number } = {}) {
        return (target: any, property?: string) => {
            Middleware(target.constructor, property, { priority: Number.MIN_SAFE_INTEGER + Math.abs(priority) })(target, property);
        }
}