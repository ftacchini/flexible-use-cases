import { IfEventIs, FlexibleFilter, RouteData, EventData } from "flexible-core";
import { Param } from "flexible-decorators";
import { Steps, Trigger, UseCase } from "../../../src/framework";

export declare class IfEventIs2 implements FlexibleFilter {
    eventType2: string | string[];
    get staticRouting(): RouteData<"eventType">;
}


@UseCase({
    trigger: Trigger( IfEventIs, {eventType: "basic"} )
})
export class BasicUseCase {

    @Steps()
    public execute(@Param(EventData) data: any) {
        return data;
    }
}
