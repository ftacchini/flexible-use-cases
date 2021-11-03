import "reflect-metadata";
import "jasmine";
import {
    FlexibleApp,
    FlexibleEventSourceModule,
    FlexibleAppBuilder,
    SilentLoggerModule
} from "flexible-core";
import { DummyEventSource } from "flexible-dummy-source";
import { AsyncContainerModule } from "inversify";
import { ExplicitControllerLoader } from "flexible-decorators";
import { UseCasesFrameworkModuleBuilder } from "../../src/framework";
import { BasicUseCase } from "./test-use-cases";

describe(`UseCaseBasedApp`, () => {

    let app: FlexibleApp;
    let eventSource: DummyEventSource;

    beforeEach(async () => {
        eventSource = new DummyEventSource();

        let eventSourceModule: FlexibleEventSourceModule = {
            getInstance: () => eventSource,
            container: new AsyncContainerModule(async () => { }),
            isolatedContainer: new AsyncContainerModule(async () => { })
        };

        let frameworkModule = UseCasesFrameworkModuleBuilder.instance
            .withUseCaseLoader(new ExplicitControllerLoader([
                BasicUseCase
            ]))
            .build();

        app = FlexibleAppBuilder.instance
            .withLogger(new SilentLoggerModule())
            .addEventSource(eventSourceModule)
            .addFramework(frameworkModule)
            .createApp();

    })

    it("should start correctly", async () => {
        //ARRANGE
        //ACT
        const result = await app.run();

        //ASSERT
        expect(result[0]).toEqual(true)
    })

    it("Should stop correctly", async () => {
        //Arrange
        await app.run();

        //Act
        var result = await app.stop()

        //Assert
        expect(eventSource.running).toBeFalsy();
        expect(result[0]).toBeFalsy();

    });

    it("should respond to route request with response", async () => {
        //ARRANGE
        const data = { data: "data" };
        const routeData = { routeData: "routeData" };

        //ACT
        await app.run();

        const response = await eventSource.generateEvent({
            data: data,
            eventType: "basic",
            routeData: routeData
        });

        //ASSERT
        expect(response[0].responseStack[0]).toBe(data);
    })

});