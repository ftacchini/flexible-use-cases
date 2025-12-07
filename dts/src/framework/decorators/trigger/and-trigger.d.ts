import { FlexibleFilter, FlexibleFilterRecipe } from "flexible-core";
import { GenericTriggerConfiguration } from "./generic-trigger-configuration";
import { OrTriggerConfiguration } from "./or-trigger";
import { TriggerConfiguration } from "./trigger";
export declare class AndTriggerConfiguration implements GenericTriggerConfiguration {
    private readonly triggers;
    constructor(triggers: TriggerConfiguration[]);
    toFilter(): FlexibleFilterRecipe<FlexibleFilter>[][];
}
export declare function AndTrigger(...triggers: (TriggerConfiguration | OrTriggerConfiguration)[]): AndTriggerConfiguration;
