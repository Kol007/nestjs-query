"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ts_mockito_1 = require("ts-mockito");
const graphql_1 = require("@nestjs/graphql");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const src_1 = require("../../src");
const subscription_1 = require("../../src/subscription");
const __fixtures__1 = require("../__fixtures__");
const __fixtures__2 = require("./__fixtures__");
describe('UpdateResolver', () => {
    const expectResolverSDL = (sdl, opts) => {
        let TestSDLResolver = class TestSDLResolver extends src_1.UpdateResolver(__fixtures__2.TestResolverDTO, opts) {
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
        let TestResolver = class TestResolver extends src_1.UpdateResolver(__fixtures__2.TestResolverDTO, opts) {
            constructor(service, pubSub, authorizer) {
                super(service);
                this.pubSub = pubSub;
                this.authorizer = authorizer;
            }
        };
        TestResolver = tslib_1.__decorate([
            graphql_1.Resolver(() => __fixtures__2.TestResolverDTO),
            tslib_1.__param(1, src_1.InjectPubSub()),
            tslib_1.__param(2, src_1.InjectAuthorizer(__fixtures__2.TestResolverDTO)),
            tslib_1.__metadata("design:paramtypes", [__fixtures__2.TestService,
                graphql_subscriptions_1.PubSub, Object])
        ], TestResolver);
        return __fixtures__2.createResolverFromNest(TestResolver);
    };
    it('should create a UpdateResolver for the DTO', () => {
        return expectResolverSDL(__fixtures__2.updateBasicResolverSDL);
    });
    it('should use the dtoName if provided', () => {
        return expectResolverSDL(__fixtures__2.updateCustomNameResolverSDL, { dtoName: 'Test' });
    });
    it('should use the one.name option for the updateOne if provided', () => {
        return expectResolverSDL(__fixtures__2.updateCustomOneMutationResolverSDL, { one: { name: 'update_one_test' } });
    });
    it('should use the many.name option for the updateMany if provided', () => {
        return expectResolverSDL(__fixtures__2.updateCustomManyMutationResolverSDL, { many: { name: 'update_many_test' } });
    });
    it('should use the UpdateDTOClass if provided', () => {
        return expectResolverSDL(__fixtures__2.updateCustomDTOResolverSDL, { UpdateDTOClass: __fixtures__2.TestResolverInputDTO });
    });
    it('should not expose update methods if disabled', () => {
        return expectResolverSDL(__fixtures__2.updateDisabledResolverSDL, { disabled: true });
    });
    describe('#updateOne', () => {
        it('should use the provided UpdateOneInput type', () => {
            let CustomUpdateOneInput = class CustomUpdateOneInput extends src_1.UpdateOneInputType(__fixtures__2.TestResolverInputDTO) {
            };
            tslib_1.__decorate([
                graphql_1.Field(),
                tslib_1.__metadata("design:type", String)
            ], CustomUpdateOneInput.prototype, "other", void 0);
            CustomUpdateOneInput = tslib_1.__decorate([
                graphql_1.InputType()
            ], CustomUpdateOneInput);
            return expectResolverSDL(__fixtures__2.updateCustomOneInputResolverSDL, {
                UpdateOneInput: CustomUpdateOneInput,
            });
        });
        it('should not expose update one method if disabled', () => {
            return expectResolverSDL(__fixtures__2.updateOneDisabledResolverSDL, { one: { disabled: true } });
        });
        it('should call the service updateOne with the provided input', async () => {
            const { resolver, mockService, mockAuthorizer } = await createTestResolver();
            const input = {
                id: 'id-1',
                update: {
                    stringField: 'foo',
                },
            };
            const output = {
                id: 'id-1',
                stringField: 'foo',
            };
            const context = {};
            ts_mockito_1.when(mockAuthorizer.authorize(context)).thenResolve({});
            ts_mockito_1.when(mockService.updateOne(input.id, ts_mockito_1.objectContaining(input.update), ts_mockito_1.deepEqual({ filter: {} }))).thenResolve(output);
            const result = await resolver.updateOne({ input }, context);
            return expect(result).toEqual(output);
        });
        it('should call the service updateOne with the provided input and filter from authorizer', async () => {
            const { resolver, mockService, mockAuthorizer } = await createTestResolver();
            const input = {
                id: 'id-1',
                update: {
                    stringField: 'foo',
                },
            };
            const output = {
                id: 'id-1',
                stringField: 'foo',
            };
            const context = {};
            const authorizeFilter = { stringField: { eq: 'foo' } };
            ts_mockito_1.when(mockAuthorizer.authorize(context)).thenResolve(authorizeFilter);
            ts_mockito_1.when(mockService.updateOne(input.id, ts_mockito_1.objectContaining(input.update), ts_mockito_1.deepEqual({ filter: authorizeFilter }))).thenResolve(output);
            const result = await resolver.updateOne({ input }, context);
            return expect(result).toEqual(output);
        });
    });
    describe('#updateMany', () => {
        it('should not update a new type if the UpdateManyArgs is supplied', () => {
            let CustomUpdateManyInput = class CustomUpdateManyInput extends src_1.UpdateManyInputType(__fixtures__2.TestResolverDTO, __fixtures__2.TestResolverInputDTO) {
            };
            tslib_1.__decorate([
                graphql_1.Field(),
                tslib_1.__metadata("design:type", String)
            ], CustomUpdateManyInput.prototype, "other", void 0);
            CustomUpdateManyInput = tslib_1.__decorate([
                graphql_1.InputType()
            ], CustomUpdateManyInput);
            return expectResolverSDL(__fixtures__2.updateCustomManyInputResolverSDL, {
                UpdateManyInput: CustomUpdateManyInput,
            });
        });
        it('should not expose update many method if disabled', () => {
            return expectResolverSDL(__fixtures__2.updateManyDisabledResolverSDL, { many: { disabled: true } });
        });
        it('should call the service updateMany with the provided input', async () => {
            const { resolver, mockService } = await createTestResolver();
            const input = {
                input: {
                    filter: { id: { eq: 'id-1' } },
                    update: {
                        stringField: 'foo',
                    },
                },
            };
            const output = { updatedCount: 1 };
            ts_mockito_1.when(mockService.updateMany(ts_mockito_1.objectContaining(input.input.update), ts_mockito_1.objectContaining(input.input.filter))).thenResolve(output);
            const result = await resolver.updateMany(input);
            return expect(result).toEqual(output);
        });
        it('should call the service updateMany with the provided input and filter from authorizer', async () => {
            const { resolver, mockService, mockAuthorizer } = await createTestResolver();
            const input = {
                input: {
                    filter: { id: { eq: 'id-1' } },
                    update: {
                        stringField: 'foo',
                    },
                },
            };
            const output = { updatedCount: 1 };
            const context = {};
            const authorizeFilter = { stringField: { eq: 'foo' } };
            ts_mockito_1.when(mockAuthorizer.authorize(context)).thenResolve(authorizeFilter);
            ts_mockito_1.when(mockService.updateMany(ts_mockito_1.objectContaining(input.input.update), ts_mockito_1.objectContaining({ and: [authorizeFilter, input.input.filter] }))).thenResolve(output);
            const result = await resolver.updateMany(input, context);
            return expect(result).toEqual(output);
        });
    });
    describe('updated subscription', () => {
        it('should add subscription types if enableSubscriptions is true', () => {
            return expectResolverSDL(__fixtures__2.updateSubscriptionResolverSDL, {
                enableSubscriptions: true,
            });
        });
        it('should add subscription types if one.enableSubscriptions is true', () => {
            return expectResolverSDL(__fixtures__2.updateOneSubscriptionResolverSDL, {
                one: {
                    enableSubscriptions: true,
                },
            });
        });
        it('should add subscription types if many.enableSubscriptions is true', () => {
            return expectResolverSDL(__fixtures__2.updateManySubscriptionResolverSDL, {
                many: {
                    enableSubscriptions: true,
                },
            });
        });
        it('should not expose subscriptions if enableSubscriptions is false', () => {
            return expectResolverSDL(__fixtures__2.updateBasicResolverSDL, { enableSubscriptions: false });
        });
        describe('update one events', () => {
            it('should publish events for create one when enableSubscriptions is set to true for all', async () => {
                const { resolver, mockService, mockPubSub, mockAuthorizer } = await createTestResolver({
                    enableSubscriptions: true,
                });
                const input = {
                    id: 'id-1',
                    update: {
                        stringField: 'foo',
                    },
                };
                const output = {
                    id: 'id-1',
                    stringField: 'foo',
                };
                const eventName = subscription_1.getDTOEventName(subscription_1.EventType.UPDATED_ONE, __fixtures__2.TestResolverDTO);
                const event = { [eventName]: output };
                const context = {};
                ts_mockito_1.when(mockAuthorizer.authorize(context)).thenResolve({});
                ts_mockito_1.when(mockService.updateOne(input.id, ts_mockito_1.objectContaining(input.update), ts_mockito_1.deepEqual({ filter: {} }))).thenResolve(output);
                ts_mockito_1.when(mockPubSub.publish(eventName, ts_mockito_1.deepEqual(event))).thenResolve();
                const result = await resolver.updateOne({ input }, context);
                ts_mockito_1.verify(mockPubSub.publish(eventName, ts_mockito_1.deepEqual(event))).once();
                return expect(result).toEqual(output);
            });
            it('should publish events for create one when enableSubscriptions is set to true for createOne', async () => {
                const { resolver, mockService, mockPubSub, mockAuthorizer } = await createTestResolver({
                    one: { enableSubscriptions: true },
                });
                const input = {
                    id: 'id-1',
                    update: {
                        stringField: 'foo',
                    },
                };
                const output = {
                    id: 'id-1',
                    stringField: 'foo',
                };
                const eventName = subscription_1.getDTOEventName(subscription_1.EventType.UPDATED_ONE, __fixtures__2.TestResolverDTO);
                const event = { [eventName]: output };
                const context = {};
                ts_mockito_1.when(mockAuthorizer.authorize(context)).thenResolve({});
                ts_mockito_1.when(mockService.updateOne(input.id, ts_mockito_1.objectContaining(input.update), ts_mockito_1.deepEqual({ filter: {} }))).thenResolve(output);
                ts_mockito_1.when(mockPubSub.publish(eventName, ts_mockito_1.deepEqual(event))).thenResolve();
                const result = await resolver.updateOne({ input }, context);
                ts_mockito_1.verify(mockPubSub.publish(eventName, ts_mockito_1.deepEqual(event))).once();
                return expect(result).toEqual(output);
            });
            it('should not publish an event if enableSubscriptions is false', async () => {
                const { resolver, mockService, mockPubSub, mockAuthorizer } = await createTestResolver({
                    enableSubscriptions: false,
                });
                const input = {
                    id: 'id-1',
                    update: {
                        stringField: 'foo',
                    },
                };
                const output = {
                    id: 'id-1',
                    stringField: 'foo',
                };
                const context = {};
                ts_mockito_1.when(mockAuthorizer.authorize(context)).thenResolve({});
                ts_mockito_1.when(mockService.updateOne(input.id, ts_mockito_1.objectContaining(input.update), ts_mockito_1.deepEqual({ filter: {} }))).thenResolve(output);
                const result = await resolver.updateOne({ input }, context);
                ts_mockito_1.verify(mockPubSub.publish(ts_mockito_1.anything(), ts_mockito_1.anything())).never();
                return expect(result).toEqual(output);
            });
            it('should not publish an event if enableSubscriptions is true and one.enableSubscriptions is false', async () => {
                const { resolver, mockService, mockPubSub, mockAuthorizer } = await createTestResolver({
                    enableSubscriptions: true,
                    one: { enableSubscriptions: false },
                });
                const input = {
                    id: 'id-1',
                    update: {
                        stringField: 'foo',
                    },
                };
                const output = {
                    id: 'id-1',
                    stringField: 'foo',
                };
                const context = {};
                ts_mockito_1.when(mockAuthorizer.authorize(context)).thenResolve({});
                ts_mockito_1.when(mockService.updateOne(input.id, ts_mockito_1.objectContaining(input.update), ts_mockito_1.deepEqual({ filter: {} }))).thenResolve(output);
                const result = await resolver.updateOne({ input }, context);
                ts_mockito_1.verify(mockPubSub.publish(ts_mockito_1.anything(), ts_mockito_1.anything())).never();
                return expect(result).toEqual(output);
            });
        });
        describe('update many events', () => {
            it('should publish events for create one when enableSubscriptions is set to true for all', async () => {
                const { resolver, mockService, mockPubSub } = await createTestResolver({ enableSubscriptions: true });
                const input = {
                    input: {
                        filter: { id: { eq: 'id-1' } },
                        update: {
                            stringField: 'foo',
                        },
                    },
                };
                const output = { updatedCount: 1 };
                const eventName = subscription_1.getDTOEventName(subscription_1.EventType.UPDATED_MANY, __fixtures__2.TestResolverDTO);
                const event = { [eventName]: output };
                ts_mockito_1.when(mockService.updateMany(ts_mockito_1.objectContaining(input.input.update), ts_mockito_1.objectContaining(input.input.filter))).thenResolve(output);
                ts_mockito_1.when(mockPubSub.publish(eventName, ts_mockito_1.deepEqual(event))).thenResolve();
                const result = await resolver.updateMany(input);
                ts_mockito_1.verify(mockPubSub.publish(eventName, ts_mockito_1.deepEqual(event))).once();
                return expect(result).toEqual(output);
            });
            it('should publish events for create manhy when many.enableSubscriptions is true', async () => {
                const { resolver, mockService, mockPubSub } = await createTestResolver({ many: { enableSubscriptions: true } });
                const input = {
                    input: {
                        filter: { id: { eq: 'id-1' } },
                        update: {
                            stringField: 'foo',
                        },
                    },
                };
                const output = { updatedCount: 1 };
                const eventName = subscription_1.getDTOEventName(subscription_1.EventType.UPDATED_MANY, __fixtures__2.TestResolverDTO);
                const event = { [eventName]: output };
                ts_mockito_1.when(mockService.updateMany(ts_mockito_1.objectContaining(input.input.update), ts_mockito_1.objectContaining(input.input.filter))).thenResolve(output);
                ts_mockito_1.when(mockPubSub.publish(eventName, ts_mockito_1.deepEqual(event))).thenResolve();
                const result = await resolver.updateMany(input);
                ts_mockito_1.verify(mockPubSub.publish(eventName, ts_mockito_1.deepEqual(event))).once();
                return expect(result).toEqual(output);
            });
            it('should not publish an event if enableSubscriptions is false', async () => {
                const { resolver, mockService, mockPubSub } = await createTestResolver({ enableSubscriptions: false });
                const input = {
                    input: {
                        filter: { id: { eq: 'id-1' } },
                        update: {
                            stringField: 'foo',
                        },
                    },
                };
                const output = { updatedCount: 1 };
                ts_mockito_1.when(mockService.updateMany(ts_mockito_1.objectContaining(input.input.update), ts_mockito_1.objectContaining(input.input.filter))).thenResolve(output);
                const result = await resolver.updateMany(input);
                ts_mockito_1.verify(mockPubSub.publish(ts_mockito_1.anything(), ts_mockito_1.anything())).never();
                return expect(result).toEqual(output);
            });
            it('should not publish an event if enableSubscriptions is true and one.enableSubscriptions is false', async () => {
                const { resolver, mockService, mockPubSub } = await createTestResolver({
                    enableSubscriptions: true,
                    many: { enableSubscriptions: false },
                });
                const input = {
                    input: {
                        filter: { id: { eq: 'id-1' } },
                        update: {
                            stringField: 'foo',
                        },
                    },
                };
                const output = { updatedCount: 1 };
                ts_mockito_1.when(mockService.updateMany(ts_mockito_1.objectContaining(input.input.update), ts_mockito_1.objectContaining(input.input.filter))).thenResolve(output);
                const result = await resolver.updateMany(input);
                ts_mockito_1.verify(mockPubSub.publish(ts_mockito_1.anything(), ts_mockito_1.anything())).never();
                return expect(result).toEqual(output);
            });
        });
        describe('updatedOneSubscription', () => {
            it('should propagate events if enableSubscriptions is true', async () => {
                const { resolver, mockPubSub } = await createTestResolver({
                    enableSubscriptions: true,
                });
                const eventName = subscription_1.getDTOEventName(subscription_1.EventType.UPDATED_ONE, __fixtures__2.TestResolverDTO);
                const event = {
                    [eventName]: {
                        id: 'id-1',
                        stringField: 'foo',
                    },
                };
                const mockIterator = ts_mockito_1.mock();
                ts_mockito_1.when(mockPubSub.asyncIterator(eventName)).thenReturn(ts_mockito_1.instance(mockIterator));
                ts_mockito_1.when(mockIterator.next()).thenResolve({ done: false, value: event });
                const result = await resolver.updatedOneSubscription().next();
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
                const eventName = subscription_1.getDTOEventName(subscription_1.EventType.UPDATED_ONE, __fixtures__2.TestResolverDTO);
                return expect(() => resolver.updatedOneSubscription()).toThrow(`Unable to subscribe to ${eventName}`);
            });
            it('should not propagate events if enableSubscriptions is true and one.enableSubscriptions is false', async () => {
                const { resolver } = await createTestResolver({
                    enableSubscriptions: true,
                    one: { enableSubscriptions: false },
                });
                const eventName = subscription_1.getDTOEventName(subscription_1.EventType.UPDATED_ONE, __fixtures__2.TestResolverDTO);
                return expect(() => resolver.updatedOneSubscription()).toThrow(`Unable to subscribe to ${eventName}`);
            });
        });
        describe('updatedManySubscription', () => {
            it('should propagate events if enableSubscriptions is true', async () => {
                const { resolver, mockPubSub } = await createTestResolver({ enableSubscriptions: true });
                const eventName = subscription_1.getDTOEventName(subscription_1.EventType.UPDATED_MANY, __fixtures__2.TestResolverDTO);
                const event = { updatedCount: 1 };
                const mockIterator = ts_mockito_1.mock();
                ts_mockito_1.when(mockPubSub.asyncIterator(eventName)).thenReturn(ts_mockito_1.instance(mockIterator));
                ts_mockito_1.when(mockIterator.next()).thenResolve({ done: false, value: event });
                const result = await resolver.updatedManySubscription().next();
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
                const eventName = subscription_1.getDTOEventName(subscription_1.EventType.UPDATED_MANY, __fixtures__2.TestResolverDTO);
                return expect(() => resolver.updatedManySubscription()).toThrow(`Unable to subscribe to ${eventName}`);
            });
            it('should not propagate events if enableSubscriptions is true and one.enableSubscriptions is false', async () => {
                const { resolver } = await createTestResolver({
                    enableSubscriptions: true,
                    many: { enableSubscriptions: false },
                });
                const eventName = subscription_1.getDTOEventName(subscription_1.EventType.UPDATED_MANY, __fixtures__2.TestResolverDTO);
                return expect(() => resolver.updatedManySubscription()).toThrow(`Unable to subscribe to ${eventName}`);
            });
        });
    });
});
//# sourceMappingURL=update.resolver.spec.js.map