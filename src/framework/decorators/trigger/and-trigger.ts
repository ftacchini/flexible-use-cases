import { FlexibleFilter, FlexibleFilterRecipe } from "flexible-core";
import { GenericTriggerConfiguration } from "./generic-trigger-configuration";
import { OrTriggerConfiguration } from "./or-trigger";
import { TriggerConfiguration } from "./trigger";

export class AndTriggerConfiguration implements GenericTriggerConfiguration {
    
    constructor(
        private readonly triggers: TriggerConfiguration[]
    ) {

    }

    public toFilter(): FlexibleFilterRecipe<FlexibleFilter>[][] {
        return this.triggers.map(t => t.toFilter());
    }
}

export function AndTrigger(...triggers: (TriggerConfiguration | OrTriggerConfiguration)[]) {
    const plainTriggers: TriggerConfiguration[] = [].concat(...triggers);
    return new AndTriggerConfiguration(plainTriggers);
}