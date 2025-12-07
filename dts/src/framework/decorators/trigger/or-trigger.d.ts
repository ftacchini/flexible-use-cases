import { FlexibleFilter, FlexibleFilterRecipe } from "flexible-core";
import { GenericTriggerConfiguration } from "./generic-trigger-configuration";
import { TriggerConfiguration } from "./trigger";
export declare class OrTriggerConfiguration implements GenericTriggerConfiguration {
    private readonly triggers;
    constructor(triggers: TriggerConfiguration[]);
    toFilter(): FlexibleFilterRecipe<FlexibleFilter>[];
}
export declare function OrTrigger(...triggers: (TriggerConfiguration | OrTriggerConfiguration)[]): OrTriggerConfiguration;
