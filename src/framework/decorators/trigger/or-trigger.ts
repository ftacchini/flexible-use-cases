import { FlexibleFilter, FlexibleFilterRecipe } from "flexible-core";
import { GenericTriggerConfiguration } from "./generic-trigger-configuration";
import { TriggerConfiguration } from "./trigger";

export class OrTriggerConfiguration implements GenericTriggerConfiguration {

    constructor(
        private readonly triggers: TriggerConfiguration[]
    ) {

    }

    public toFilter(): FlexibleFilterRecipe<FlexibleFilter>[] {
        return [].concat(...this.triggers.map(t => t.toFilter()));
    }
}

export function OrTrigger(...triggers: (TriggerConfiguration | OrTriggerConfiguration)[]) {
    const plainTriggers: TriggerConfiguration[] = [].concat(...triggers);
    return new OrTriggerConfiguration(plainTriggers);
}