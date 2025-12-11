import "reflect-metadata";
import "jasmine";
import {
    FlexibleApp,
    FlexibleEventSourceModule,
    SilentLoggerModule,
    DummyEventSource
} from "flexible-core";
import { ContainerModule } from "inversify";
import { ExplicitControllerLoader } from "flexible-decorators";
import { UseCasesFrameworkModule } from "../../src/framework";
import { BasicUseCase, ConditionsUseCase, ExternalConditionsUseCase } from "./test-use-cases";

describe(`UseCaseBasedApp`, () => {

    let app: FlexibleApp;
    let eventSource: DummyEventSource;

    beforeEach(async () => {
        eventSource = new DummyEventSource();

        let eventSourceModule: FlexibleEventSourceModule = {
            getInstance: () => eventSource,
            container: new ContainerModule(() => { }),
            isolatedContainer: new ContainerModule(() => { })
        };

        let frameworkModule = UseCasesFrameworkModule.builder()
            .withUseCaseLoader(new ExplicitControllerLoader([
                BasicUseCase,
                ConditionsUseCase,
                ExternalConditionsUseCase
            ]))
            .build();

        app = FlexibleApp.builder()
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


    it("should respond to route request with pre and post conditions", async () => {
        //ARRANGE
        const data = { data: "data" };
        const routeData = { routeData: "routeData" };

        //ACT
        await app.run();

        const response = await eventSource.generateEvent({
            data: data,
            eventType: "conditions",
            routeData: routeData
        });

        //ASSERT
        expect(response[0].responseStack[0]).toEqual({ step: "pre1", data });
        expect(response[0].responseStack[1]).toEqual({ step: "pre2", data });
        expect(response[0].responseStack[2]).toEqual({ step: "steps", data });
        expect(response[0].responseStack[3]).toEqual({ step: "post1", data });
        expect(response[0].responseStack[4]).toEqual({ step: "post2", data });
    })


    it("should respond to route request with external pre and post conditions", async () => {
        //ARRANGE
        const data = { data: "data" };
        const routeData = { routeData: "routeData" };

        //ACT
        await app.run();

        const response = await eventSource.generateEvent({
            data: data,
            eventType: "externalConditions",
            routeData: routeData
        });

        //ASSERT
        expect(response[0].responseStack[0]).toEqual({
            configValue: "a",
            eventType: "externalConditions"
        });
        expect(response[0].responseStack[1]).toEqual({ step: "steps", data });
        expect(response[0].responseStack[2]).toEqual({
            configValue: "b",
            eventType: "externalConditions"
        });
    })
});