import { FlexibleEventSource, FlexibleResponse } from 'flexible-core';
export declare abstract class UseCasesEventSource implements FlexibleEventSource {
    private handler;
    constructor();
    run(): Promise<any>;
    stop(): Promise<any>;
    onEvent(handler: (event: any) => Promise<FlexibleResponse[]>): void;
}
