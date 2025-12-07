import { FilterConfiguration, FlexibleFilter, FlexibleFilterRecipe, Type } from "flexible-core";
import { GenericTriggerConfiguration } from "./generic-trigger-configuration";
export declare class TriggerConfiguration implements GenericTriggerConfiguration {
    private readonly type;
    private readonly configuration;
    constructor(type: Type<FlexibleFilter>, configuration?: FilterConfiguration<FlexibleFilter>);
    toFilter(): FlexibleFilterRecipe<FlexibleFilter>[];
}
export declare function Trigger<Filter extends FlexibleFilter>(type: Type<Filter>, config?: FilterConfiguration<Filter>): TriggerConfiguration;
