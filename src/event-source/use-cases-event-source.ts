import { FlexibleEventSource, FlexibleResponse, FlexibleLogger } from 'flexible-core';
import { injectable } from "inversify";

export abstract class UseCasesEventSource implements FlexibleEventSource {

    private handler: (event: any) => Promise<FlexibleResponse[]>;

    constructor() {
    }

    public run(): Promise<any> {
        return null;
    }

    public stop(): Promise<any> {
        return null;
    }

    public onEvent(handler: (event: any) => Promise<FlexibleResponse[]>): void {
        this.handler = handler;
    }

}