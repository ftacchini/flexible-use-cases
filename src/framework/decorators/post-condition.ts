import { Middleware } from "flexible-decorators";

export const PostCondition = function attributeDefinition(
    { priority = 0 }: { priority?: number } = {}) {
        return (target: any, property?: string) => {
            Middleware(target.constructor, property, { priority: Number.MAX_SAFE_INTEGER - Math.abs(priority) })(target, property);
        }
        
}