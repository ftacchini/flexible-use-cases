import { FlexibleFilter, FlexibleFilterRecipe } from "flexible-core";

export interface GenericTriggerConfiguration {
    toFilter(): (FlexibleFilterRecipe<FlexibleFilter> | FlexibleFilterRecipe<FlexibleFilter>[])[];
}