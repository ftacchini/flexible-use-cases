import { IfEventIs, EventData } from "flexible-core";
import { Param } from "flexible-decorators";
import { PostCondition, PreCondition, Steps, Trigger, UseCase } from "../../../src/framework";

@UseCase({
    trigger: Trigger( IfEventIs, {eventType: "conditions"} )
})
export class ConditionsUseCase {

    @PreCondition({ priority: 1 })
    public preCondition1(@Param(EventData) data: any) {
        return { step: "pre1", data };
    }

    @PreCondition({ priority: 0 })
    public preCondition2(@Param(EventData) data: any) {
        return { step: "pre2", data };
    }

    @Steps()
    public execute(@Param(EventData) data: any) {
        return { step: "steps", data };
    }

    @PostCondition({ priority: 1 })
    public postCondition1(@Param(EventData) data: any) {
        return { step: "post1", data };
    }

    @PostCondition({ priority: 0 })
    public postCondition2(@Param(EventData) data: any) {
        return { step: "post2", data };
    }
}
