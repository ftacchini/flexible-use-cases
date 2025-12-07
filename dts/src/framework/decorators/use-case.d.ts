import { GenericTriggerConfiguration } from './trigger/generic-trigger-configuration';
export declare const UseCase: (useCaseDefinition: UseCaseDefinition) => (target: any) => void;
export interface UseCaseDefinition {
    name?: string;
    readonly description?: string;
    readonly singleton?: boolean;
    readonly trigger: GenericTriggerConfiguration;
}
