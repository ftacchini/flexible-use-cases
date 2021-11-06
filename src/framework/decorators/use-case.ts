import { injectable } from 'inversify';
import { USE_CASE_KEY } from "./use-cases-keys";
import { GenericTriggerConfiguration } from './trigger/generic-trigger-configuration';

export const UseCase = function attributeDefinition(
    useCaseDefinition: UseCaseDefinition) {

    return (target: any) => {
        injectable()(target);

        if (!Reflect.hasMetadata(USE_CASE_KEY, target)) {
            Reflect.defineMetadata(USE_CASE_KEY, [], target);
        }

        if(!useCaseDefinition.name) {
            useCaseDefinition.name = target.name;
        }

        var useCases: UseCaseDefinition[] = Reflect.getMetadata(USE_CASE_KEY, target);
        useCases.push(useCaseDefinition);
    }
}

export interface UseCaseDefinition {
    name?: string;
    readonly description?: string;
    readonly singleton?: boolean;
    readonly trigger: GenericTriggerConfiguration;
}