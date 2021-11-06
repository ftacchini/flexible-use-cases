import { Middleware } from "flexible-decorators";

export const PostCondition = function attributeDefinition(
    { priority = 0 }: { priority?: number } = {}) {
        return (target: any, property?: string) => {
            Middleware(target.constructor, property, { priority: 1000000 - Math.abs(priority) })(target, property);
        }
        
}