import { IfEventIs, EventData } from "flexible-core";
import { Param } from "flexible-decorators";
import { Steps, Trigger, UseCase } from "../../../src/framework";

@UseCase({
    trigger: Trigger( IfEventIs, {eventType: "basic"} )
})
export class BasicUseCase {

    @Steps()
    public execute(@Param(EventData) data: any) {
        return data;
    }
}
