"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const ts_mockito_1 = require("ts-mockito");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const src_1 = require("../../src");
const subscription_1 = require("../../src/subscription");
const __fixtures__1 = require("../__fixtures__");
const __fixtures__2 = require("./__fixtures__");
describe('CreateResolver', () => {
    const expectResolverSDL = (sdl, opts) => {
        let TestSDLResolver = class TestSDLResolver extends src_1.CreateResolver(__fixtures__2.TestResolverDTO, opts) {
            test() {
                return { id: '1', stringField: 'foo' };
            }
        };
        tslib_1.__decorate([
            graphql_1.Query(() => __fixtures__2.TestResolverDTO),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", __fixtures__2.TestResolverDTO)
        ], TestSDLResolver.prototype, "test", null);
        TestSDLResolver = tslib_1.__decorate([
            graphql_1.Resolver(() => __fixtures__2.TestResolverDTO)
        ], TestSDLResolver);
        return __fixtures__1.expectSDL([TestSDLResolver], sdl);
    };
    const createTestResolver = (opts) => {
        let TestResolver = class TestResolver extends src_1.CreateResolver(__fixtures__2.TestResolverDTO, opts) {
            constructor(service, pubSub) {
                super(service);
                this.pubSub = pubSub;
            }
        };
        TestResolver = tslib_1.__decorate([
            graphql_1.Resolver(() => __fixtures__2.TestResolverDTO),
            tslib_1.__param(1, src_1.InjectPubSub()),
            tslib_1.__metadata("design:paramtypes", [__fixtures__2.TestService, graphql_subscriptions_1.PubSub])
        ], TestResolver);
        return __fixtures__2.createResolverFromNest(TestResolver);
    };
    it('should create a CreateResolver for the DTO', () => {
        return expectResolverSDL(__fixtures__2.createBasicResolverSDL);
    });
    it('should use the dtoName if provided', () => {
        return expectResolverSDL(__fixtures__2.createCustomNameResolverSDL, { dtoName: 'Test' });
    });
    it('should use the one.name option for the createOne if provided', () => {
        return expectResolverSDL(__fixtures__2.createCustomOneMutationResolverSDL, { one: { name: 'create_one_test' } });
    });
    it('should use the many.name option for the createMany if provided', () => {
        return expectResolverSDL(__fixtures__2.createCustomManyMutationResolverSDL, { many: { name: 'create_many_test' } });
    });
    it('should use the CreateDTOClass if provided', () => {
        return expectResolverSDL(__fixtures__2.createCustomDTOResolverSDL, { CreateDTOClass: __fixtures__2.TestResolverInputDTO });
    });
    it('should not expose create methods if disabled', () => {
        return expectResolverSDL(__fixtures__2.createDisabledResolverSDL, { disabled: true });
    });
    describe('#createOne', () => {
        it('should use the provided CreateOneInput type', () => {
            let CreateOneInput = class CreateOneInput extends src_1.CreateOneInputType('createResolverDTO', __fixtures__2.TestResolverInputDTO) {
            };
            CreateOneInput = tslib_1.__decorate([
                graphql_1.InputType()
            ], CreateOneInput);
            return expectResolverSDL(__fixtures__2.createCustomOneInputResolverSDL, {
                CreateOneInput,
            });
        });
        it('should not expose create one method if disabled', () => {
            return expectResolverSDL(__fixtures__2.createOneDisabledResolverSDL, { one: { disabled: true } });
        });
        it('should call the service createOne with the provided input', async () => {
            const { resolver, mockService } = await createTestResolver();
            const args = {
                input: {
                    stringField: 'foo',
                },
            };
            const output = {
                id: 'id-1',
                stringField: 'foo',
            };
            ts_mockito_1.when(mockService.createOne(ts_mockito_1.objectContaining(args.input))).thenResolve(output);
            const result = await resolver.createOne({ input: args });
            return expect(result).toEqual(output);
        });
    });
    describe('#createMany', () => {
        it('should not create a new type if the CreateManyArgs is supplied', () => {
            let CreateManyInput = class CreateManyInput extends src_1.CreateManyInputType('testResolvers', __fixtures__2.TestResolverInputDTO) {
            };
            CreateManyInput = tslib_1.__decorate([
                graphql_1.InputType()
            ], CreateManyInput);
            return expectResolverSDL(__fixtures__2.createCustomManyInputResolverSDL, {
                CreateManyInput,
            });
        });
        it('should not expose create many method if disabled', () => {
            return expectResolverSDL(__fixtures__2.createManyDisabledResolverSDL, { many: { disabled: true } });
        });
        it('should call the service createMany with the provided input', async () => {
            const { resolver, mockService } = await createTestResolver();
            const args = {
                input: [
                    {
                        stringField: 'foo',
                    },
                ],
            };
            const output = [
                {
                    id: 'id-1',
                    stringField: 'foo',
                },
            ];
            ts_mockito_1.when(mockService.createMany(ts_mockito_1.objectContaining(args.input))).thenResolve(output);
            const result = await resolver.createMany({ input: args });
            return expect(result).toEqual(output);
        });
    });
    describe('created subscription', () => {
        it('should add subscription types if enableSubscriptions is true', () => {
            return expectResolverSDL(__fixtures__2.createSubscriptionResolverSDL, {
                enableSubscriptions: true,
            });
        });
        it('should not expose subscriptions if enableSubscriptions is false', () => {
            return expectResolverSDL(__fixtures__2.createBasicResolverSDL, { enableSubscriptions: false });
        });
        describe('create one events', () => {
            it('should publish events for create one when enableSubscriptions is set to true for all', async () => {
                const { resolver, mockService, mockPubSub } = await createTestResolver({ enableSubscriptions: true });
                const args = {
                    input: {
                        stringField: 'foo',
                    },
                };
                const output = {
                    id: 'id-1',
                    stringField: 'foo',
                };
                const eventName = subscription_1.getDTOEventName(subscription_1.EventType.CREATED, __fixtures__2.TestResolverDTO);
                const event = { [eventName]: output };
                ts_mockito_1.when(mockService.createOne(ts_mockito_1.objectContaining(args.input))).thenResolve(output);
                ts_mockito_1.when(mockPubSub.publish(eventName, ts_mockito_1.deepEqual(event))).thenResolve();
                const result = await resolver.createOne({ input: args });
                ts_mockito_1.verify(mockPubSub.publish(eventName, ts_mockito_1.deepEqual(event))).once();
                return expect(result).toEqual(output);
            });
            it('should publish events for create one when enableSubscriptions is set to true for createOne', async () => {
                const { resolver, mockService, mockPubSub } = await createTestResolver({ one: { enableSubscriptions: true } });
                const args = {
                    input: {
                        stringField: 'foo',
                    },
                };
                const output = {
                    id: 'id-1',
                    stringField: 'foo',
                };
                const eventName = subscription_1.getDTOEventName(subscription_1.EventType.CREATED, __fixtures__2.TestResolverDTO);
                const event = { [eventName]: output };
                ts_mockito_1.when(mockService.createOne(ts_mockito_1.objectContaining(args.input))).thenResolve(output);
                ts_mockito_1.when(mockPubSub.publish(eventName, ts_mockito_1.deepEqual(event))).thenResolve();
                const result = await resolver.createOne({ input: args });
                ts_mockito_1.verify(mockPubSub.publish(eventName, ts_mockito_1.deepEqual(event))).once();
                return expect(result).toEqual(output);
            });
            it('should not publish an event if enableSubscriptions is false', async () => {
                const { resolver, mockService, mockPubSub } = await createTestResolver({ enableSubscriptions: false });
                const args = {
                    input: {
                        stringField: 'foo',
                    },
                };
                const output = {
                    id: 'id-1',
                    stringField: 'foo',
                };
                ts_mockito_1.when(mockService.createOne(ts_mockito_1.objectContaining(args.input))).thenResolve(output);
                const result = await resolver.createOne({ input: args });
                ts_mockito_1.verify(mockPubSub.publish(ts_mockito_1.anything(), ts_mockito_1.anything())).never();
                return expect(result).toEqual(output);
            });
            it('should not publish an event if enableSubscriptions is true and one.enableSubscriptions is false', async () => {
                const { resolver, mockService, mockPubSub } = await createTestResolver({
                    enableSubscriptions: true,
                    one: { enableSubscriptions: false },
                });
                const args = {
                    input: {
                        stringField: 'foo',
                    },
                };
                const output = {
                    id: 'id-1',
                    stringField: 'foo',
                };
                ts_mockito_1.when(mockService.createOne(ts_mockito_1.objectContaining(args.input))).thenResolve(output);
                const result = await resolver.createOne({ input: args });
                ts_mockito_1.verify(mockPubSub.publish(ts_mockito_1.anything(), ts_mockito_1.anything())).never();
                return expect(result).toEqual(output);
            });
        });
        describe('create many events', () => {
            it('should publish events for create many when enableSubscriptions is set to true for all', async () => {
                const { resolver, mockService, mockPubSub } = await createTestResolver({ enableSubscriptions: true });
                const args = {
                    input: [
                        {
                            stringField: 'foo',
                        },
                    ],
                };
                const output = [
                    {
                        id: 'id-1',
                        stringField: 'foo',
                    },
                ];
                const eventName = subscription_1.getDTOEventName(subscription_1.EventType.CREATED, __fixtures__2.TestResolverDTO);
                const events = output.map((o) => ({ [eventName]: o }));
                ts_mockito_1.when(mockService.createMany(ts_mockito_1.objectContaining(args.input))).thenResolve(output);
                events.forEach((e) => ts_mockito_1.when(mockPubSub.publish(eventName, ts_mockito_1.deepEqual(e))).thenResolve());
                const result = await resolver.createMany({ input: args });
                events.forEach((e) => ts_mockito_1.verify(mockPubSub.publish(eventName, ts_mockito_1.deepEqual(e))).once());
                return expect(result).toEqual(output);
            });
            it('should publish events for create one when enableSubscriptions is set to true for createOne', async () => {
                const { resolver, mockService, mockPubSub } = await createTestResolver({ many: { enableSubscriptions: true } });
                const args = {
                    input: [
                        {
                            stringField: 'foo',
                        },
                    ],
                };
                const output = [
                    {
                        id: 'id-1',
                        stringField: 'foo',
                    },
                ];
                const eventName = subscription_1.getDTOEventName(subscription_1.EventType.CREATED, __fixtures__2.TestResolverDTO);
                const events = output.map((o) => ({ [eventName]: o }));
                ts_mockito_1.when(mockService.createMany(ts_mockito_1.objectContaining(args.input))).thenResolve(output);
                events.forEach((e) => ts_mockito_1.when(mockPubSub.publish(eventName, ts_mockito_1.deepEqual(e))).thenResolve());
                const result = await resolver.createMany({ input: args });
                events.forEach((e) => ts_mockito_1.verify(mockPubSub.publish(eventName, ts_mockito_1.deepEqual(e))).once());
                return expect(result).toEqual(output);
            });
            it('should not publish an event if enableSubscriptions is false', async () => {
                const { resolver, mockService, mockPubSub } = await createTestResolver({ enableSubscriptions: false });
                const args = {
                    input: [
                        {
                            stringField: 'foo',
                        },
                    ],
                };
                const output = [
                    {
                        id: 'id-1',
                        stringField: 'foo',
                    },
                ];
                ts_mockito_1.when(mockService.createMany(ts_mockito_1.objectContaining(args.input))).thenResolve(output);
                const result = await resolver.createMany({ input: args });
                ts_mockito_1.verify(mockPubSub.publish(ts_mockito_1.anything(), ts_mockito_1.anything())).never();
                return expect(result).toEqual(output);
            });
            it('should not publish an event if enableSubscriptions is true and many.enableSubscriptions is false', async () => {
                const { resolver, mockService, mockPubSub } = await createTestResolver({
                    enableSubscriptions: true,
                    many: { enableSubscriptions: false },
                });
                const args = {
                    input: [
                        {
                            stringField: 'foo',
                        },
                    ],
                };
                const output = [
                    {
                        id: 'id-1',
                        stringField: 'foo',
                    },
                ];
                ts_mockito_1.when(mockService.createMany(ts_mockito_1.objectContaining(args.input))).thenResolve(output);
                const result = await resolver.createMany({ input: args });
                ts_mockito_1.verify(mockPubSub.publish(ts_mockito_1.anything(), ts_mockito_1.anything())).never();
                return expect(result).toEqual(output);
            });
        });
        describe('createSubscription', () => {
            it('should propagate events if enableSubscriptions is true', async () => {
                const { resolver, mockPubSub } = await createTestResolver({
                    enableSubscriptions: true,
                });
                const eventName = subscription_1.getDTOEventName(subscription_1.EventType.CREATED, __fixtures__2.TestResolverDTO);
                const event = {
                    [eventName]: {
                        id: 'id-1',
                        stringField: 'foo',
                    },
                };
                const mockIterator = ts_mockito_1.mock();
                ts_mockito_1.when(mockPubSub.asyncIterator(eventName)).thenReturn(ts_mockito_1.instance(mockIterator));
                ts_mockito_1.when(mockIterator.next()).thenResolve({ done: false, value: event });
                const result = await resolver.createdSubscription().next();
                ts_mockito_1.verify(mockPubSub.asyncIterator(eventName)).once();
                return expect(result).toEqual({
                    done: false,
                    value: event,
                });
            });
            it('should not propagate events if enableSubscriptions is false', async () => {
                const { resolver } = await createTestResolver({
                    enableSubscriptions: false,
                });
                const eventName = subscription_1.getDTOEventName(subscription_1.EventType.CREATED, __fixtures__2.TestResolverDTO);
                return expect(() => resolver.createdSubscription()).toThrow(`Unable to subscribe to ${eventName}`);
            });
        });
    });
});
//# sourceMappingURL=create.resolver.spec.js.map