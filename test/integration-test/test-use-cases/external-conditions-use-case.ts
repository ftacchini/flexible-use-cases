import { IfEventIs, EventData } from "flexible-core";
import { Param } from "flexible-decorators";
import { ExternalPostCondition, ExternalPreCondition, Steps, Trigger, UseCase } from "../../../src/framework";
import { TestMiddleware } from "./test-middleware";

@UseCase({
    trigger: Trigger( IfEventIs, {eventType: "externalConditions"} )
})
@ExternalPreCondition(TestMiddleware, "execMiddleware", { config: { configValue: "a" }} )
@ExternalPostCondition(TestMiddleware, "execMiddleware", { config: { configValue: "b" }} )
export class ExternalConditionsUseCase {

    @Steps()
    public execute(@Param(EventData) data: any) {
        return { step: "steps", data };
    }
}
