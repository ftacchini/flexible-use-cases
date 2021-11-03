import { Middleware } from "flexible-decorators";

export const Steps = function attributeDefinition(
    { priority = 0 }: { priority?: number } = {}) {
        return (target: any, property?: string) => {
            Middleware(target.constructor, property, { priority: priority })(target, property);
        }
        
}