import { FilterConfiguration, FlexibleFilter, FlexibleFilterRecipe, Type } from "flexible-core";
import { GenericTriggerConfiguration } from "./generic-trigger-configuration";

export class TriggerConfiguration implements GenericTriggerConfiguration {

    constructor(
        private readonly type: Type<FlexibleFilter>,
        private readonly configuration: FilterConfiguration<FlexibleFilter> = {}
    ) {

    }

    public toFilter(): FlexibleFilterRecipe<FlexibleFilter>[] {
        return [{
            type: this.type,
            configuration: this.configuration
        }];
    }
}

export function Trigger<Filter extends FlexibleFilter>(
    type: Type<Filter>,
    config?: FilterConfiguration<Filter>) {

    return new TriggerConfiguration(type, config);
}