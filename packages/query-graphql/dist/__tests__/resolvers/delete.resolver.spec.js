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
const test_resolver_dto_1 = require("./__fixtures__/test-resolver.dto");
describe('DeleteResolver', () => {
    const expectResolverSDL = (sdl, opts) => {
        let TestSDLResolver = class TestSDLResolver extends src_1.DeleteResolver(test_resolver_dto_1.TestResolverDTO, opts) {
            test() {
                return { id: '1', stringField: 'foo' };
            }
        };
        tslib_1.__decorate([
            graphql_1.Query(() => test_resolver_dto_1.TestResolverDTO),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", test_resolver_dto_1.TestResolverDTO)
        ], TestSDLResolver.prototype, "test", null);
        TestSDLResolver = tslib_1.__decorate([
            graphql_1.Resolver(() => test_resolver_dto_1.TestResolverDTO)
        ], TestSDLResolver);
        return __fixtures__1.expectSDL([TestSDLResolver], sdl);
    };
    const createTestResolver = (opts) => {
        let TestResolver = class TestResolver extends src_1.DeleteResolver(test_resolver_dto_1.TestResolverDTO, opts) {
            constructor(service, pubSub, authorizer) {
                super(service);
                this.pubSub = pubSub;
                this.authorizer = authorizer;
            }
        };
        TestResolver = tslib_1.__decorate([
            graphql_1.Resolver(() => test_resolver_dto_1.TestResolverDTO),
            tslib_1.__param(1, src_1.InjectPubSub()),
            tslib_1.__param(2, src_1.InjectAuthorizer(test_resolver_dto_1.TestResolverDTO)),
            tslib_1.__metadata("design:paramtypes", [__fixtures__2.TestService,
                graphql_subscriptions_1.PubSub, Object])
        ], TestResolver);
        return __fixtures__2.createResolverFromNest(TestResolver);
    };
    it('should create a DeleteResolver for the DTO', () => {
        return expectResolverSDL(__fixtures__2.deleteBasicResolverSDL);
    });
    it('should use the dtoName if provided', () => {
        return expectResolverSDL(__fixtures__2.deleteCustomNameResolverSDL, { dtoName: 'Test' });
    });
    it('should use the one.name option for the deleteOne if provided', () => {
        return expectResolverSDL(__fixtures__2.deleteCustomOneMutationResolverSDL, { one: { name: 'delete_one_test' } });
    });
    it('should use the many.name option for the deleteMany if provided', () => {
        return expectResolverSDL(__fixtures__2.deleteCustomManyMutationResolverSDL, { many: { name: 'delete_many_test' } });
    });
    it('should not expose delete methods if disabled', () => {
        return expectResolverSDL(__fixtures__2.deleteDisabledResolverSDL, { disabled: true });
    });
    describe('#deleteOne', () => {
        it('should use the provided DeleteOneInput type', () => {
            let CustomDeleteOneInput = class CustomDeleteOneInput {
            };
            tslib_1.__decorate([
                graphql_1.Field(),
                tslib_1.__metadata("design:type", String)
            ], CustomDeleteOneInput.prototype, "id", void 0);
            tslib_1.__decorate([
                graphql_1.Field(),
                tslib_1.__metadata("design:type", String)
            ], CustomDeleteOneInput.prototype, "foo", void 0);
            CustomDeleteOneInput = tslib_1.__decorate([
                graphql_1.InputType()
            ], CustomDeleteOneInput);
            return expectResolverSDL(__fixtures__2.deleteCustomOneInputResolverSDL, {
                DeleteOneInput: CustomDeleteOneInput,
            });
        });
        it('should not expose delete one method if disabled', () => {
            return expectResolverSDL(__fixtures__2.deleteOneDisabledResolverSDL, { one: { disabled: true } });
        });
        it('should call the service deleteOne with the provided input', async () => {
            const { resolver, mockService, mockAuthorizer } = await createTestResolver();
            const input = {
                id: 'id-1',
            };
            const output = {
                id: 'id-1',
                stringField: 'foo',
            };
            const context = {};
            ts_mockito_1.when(mockAuthorizer.authorize(context)).thenResolve({});
            ts_mockito_1.when(mockService.deleteOne(input.id, ts_mockito_1.deepEqual({ filter: {} }))).thenResolve(output);
            const result = await resolver.deleteOne({ input }, context);
            return expect(result).toEqual(output);
        });
        it('should call the service deleteOne with the provided input and authorizer filter', async () => {
            const { resolver, mockService, mockAuthorizer } = await createTestResolver();
            const input = {
                id: 'id-1',
            };
            const output = {
                id: 'id-1',
                stringField: 'foo',
            };
            const context = {};
            const authorizeFilter = { stringField: { eq: 'foo' } };
            ts_mockito_1.when(mockAuthorizer.authorize(context)).thenResolve(authorizeFilter);
            ts_mockito_1.when(mockService.deleteOne(input.id, ts_mockito_1.deepEqual({ filter: authorizeFilter }))).thenResolve(output);
            const result = await resolver.deleteOne({ input }, context);
            return expect(result).toEqual(output);
        });
    });
    describe('#deleteMany', () => {
        it('should not create a new delete type if the DeleteManyArgs is supplied', () => {
            let CustomDeleteManyInput = class CustomDeleteManyInput extends src_1.DeleteManyInputType(test_resolver_dto_1.TestResolverDTO) {
            };
            tslib_1.__decorate([
                graphql_1.Field(),
                tslib_1.__metadata("design:type", String)
            ], CustomDeleteManyInput.prototype, "foo", void 0);
            CustomDeleteManyInput = tslib_1.__decorate([
                graphql_1.InputType()
            ], CustomDeleteManyInput);
            return expectResolverSDL(__fixtures__2.deleteCustomManyInputResolverSDL, {
                DeleteManyInput: CustomDeleteManyInput,
            });
        });
        it('should not expose delete many method if disabled', () => {
            return expectResolverSDL(__fixtures__2.deleteManyDisabledResolverSDL, { many: { disabled: true } });
        });
        it('should call the service deleteMany with the provided input', async () => {
            const { resolver, mockService, mockAuthorizer } = await createTestResolver();
            const input = {
                filter: { id: { eq: 'id-1' } },
            };
            const output = { deletedCount: 1 };
            const context = {};
            ts_mockito_1.when(mockAuthorizer.authorize(context)).thenResolve({});
            ts_mockito_1.when(mockService.deleteMany(ts_mockito_1.objectContaining(input.filter))).thenResolve(output);
            const result = await resolver.deleteMany({ input }, context);
            return expect(result).toEqual(output);
        });
        it('should call the service deleteMany with the provided input and filter from authorizer', async () => {
            const { resolver, mockService, mockAuthorizer } = await createTestResolver();
            const input = {
                filter: { id: { eq: 'id-1' } },
            };
            const output = { deletedCount: 1 };
            const context = {};
            const authorizeFilter = { stringField: { eq: 'foo' } };
            ts_mockito_1.when(mockAuthorizer.authorize(context)).thenResolve(authorizeFilter);
            ts_mockito_1.when(mockService.deleteMany(ts_mockito_1.objectContaining({ and: [authorizeFilter, input.filter] }))).thenResolve(output);
            const result = await resolver.deleteMany({ input }, context);
            return expect(result).toEqual(output);
        });
    });
    describe('deleted subscription', () => {
        it('should add subscription types if enableSubscriptions is true', () => {
            return expectResolverSDL(__fixtures__2.deleteSubscriptionResolverSDL, {
                enableSubscriptions: true,
            });
        });
        it('should add subscription types if one.enableSubscriptions is true', () => {
            return expectResolverSDL(__fixtures__2.deleteOneSubscriptionResolverSDL, {
                one: {
                    enableSubscriptions: true,
                },
            });
        });
        it('should add subscription types if many.enableSubscriptions is true', () => {
            return expectResolverSDL(__fixtures__2.deleteManySubscriptionResolverSDL, {
                many: {
                    enableSubscriptions: true,
                },
            });
        });
        it('should not expose subscriptions if enableSubscriptions is false', () => {
            return expectResolverSDL(__fixtures__2.deleteBasicResolverSDL, { enableSubscriptions: false });
        });
        describe('delete one events', () => {
            it('should publish events for create one when enableSubscriptions is set to true for all', async () => {
                const { resolver, mockService, mockPubSub, mockAuthorizer } = await createTestResolver({
                    enableSubscriptions: true,
                });
                const input = {
                    id: 'id-1',
                };
                const output = {
                    id: 'id-1',
                    stringField: 'foo',
                };
                const eventName = subscription_1.getDTOEventName(subscription_1.EventType.DELETED_ONE, test_resolver_dto_1.TestResolverDTO);
                const event = { [eventName]: output };
                const context = {};
                ts_mockito_1.when(mockAuthorizer.authorize(context)).thenResolve({});
                ts_mockito_1.when(mockService.deleteOne(input.id, ts_mockito_1.deepEqual({ filter: {} }))).thenResolve(output);
                ts_mockito_1.when(mockPubSub.publish(eventName, ts_mockito_1.deepEqual(event))).thenResolve();
                const result = await resolver.deleteOne({ input }, context);
                ts_mockito_1.verify(mockPubSub.publish(eventName, ts_mockito_1.deepEqual(event))).once();
                return expect(result).toEqual(output);
            });
            it('should publish events for create one when enableSubscriptions is set to true for createOne', async () => {
                const { resolver, mockService, mockPubSub, mockAuthorizer } = await createTestResolver({
                    one: { enableSubscriptions: true },
                });
                const input = {
                    id: 'id-1',
                };
                const output = {
                    id: 'id-1',
                    stringField: 'foo',
                };
                const eventName = subscription_1.getDTOEventName(subscription_1.EventType.DELETED_ONE, test_resolver_dto_1.TestResolverDTO);
                const event = { [eventName]: output };
                const context = {};
                ts_mockito_1.when(mockAuthorizer.authorize(context)).thenResolve({});
                ts_mockito_1.when(mockService.deleteOne(input.id, ts_mockito_1.deepEqual({ filter: {} }))).thenResolve(output);
                ts_mockito_1.when(mockPubSub.publish(eventName, ts_mockito_1.deepEqual(event))).thenResolve();
                const result = await resolver.deleteOne({ input }, context);
                ts_mockito_1.verify(mockPubSub.publish(eventName, ts_mockito_1.deepEqual(event))).once();
                return expect(result).toEqual(output);
            });
            it('should not publish an event if enableSubscriptions is false', async () => {
                const { resolver, mockService, mockPubSub, mockAuthorizer } = await createTestResolver({
                    enableSubscriptions: false,
                });
                const input = {
                    id: 'id-1',
                };
                const output = {
                    id: 'id-1',
                    stringField: 'foo',
                };
                const context = {};
                ts_mockito_1.when(mockAuthorizer.authorize(context)).thenResolve({});
                ts_mockito_1.when(mockService.deleteOne(input.id, ts_mockito_1.deepEqual({ filter: {} }))).thenResolve(output);
                const result = await resolver.deleteOne({ input }, context);
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
                };
                const output = {
                    id: 'id-1',
                    stringField: 'foo',
                };
                const context = {};
                ts_mockito_1.when(mockAuthorizer.authorize(context)).thenResolve({});
                ts_mockito_1.when(mockService.deleteOne(input.id, ts_mockito_1.deepEqual({ filter: {} }))).thenResolve(output);
                const result = await resolver.deleteOne({ input }, context);
                ts_mockito_1.verify(mockPubSub.publish(ts_mockito_1.anything(), ts_mockito_1.anything())).never();
                return expect(result).toEqual(output);
            });
        });
        describe('delete many events', () => {
            it('should publish events for create one when enableSubscriptions is set to true for all', async () => {
                const { resolver, mockService, mockPubSub } = await createTestResolver({ enableSubscriptions: true });
                const input = {
                    filter: { id: { eq: 'id-1' } },
                };
                const output = { deletedCount: 1 };
                const eventName = subscription_1.getDTOEventName(subscription_1.EventType.DELETED_MANY, test_resolver_dto_1.TestResolverDTO);
                const event = { [eventName]: output };
                ts_mockito_1.when(mockService.deleteMany(ts_mockito_1.objectContaining(input.filter))).thenResolve(output);
                ts_mockito_1.when(mockPubSub.publish(eventName, ts_mockito_1.deepEqual(event))).thenResolve();
                const result = await resolver.deleteMany({ input });
                ts_mockito_1.verify(mockPubSub.publish(eventName, ts_mockito_1.deepEqual(event))).once();
                return expect(result).toEqual(output);
            });
            it('should publish events for create manhy when many.enableSubscriptions is true', async () => {
                const { resolver, mockService, mockPubSub } = await createTestResolver({ many: { enableSubscriptions: true } });
                const input = {
                    filter: { id: { eq: 'id-1' } },
                };
                const output = { deletedCount: 1 };
                const eventName = subscription_1.getDTOEventName(subscription_1.EventType.DELETED_MANY, test_resolver_dto_1.TestResolverDTO);
                const event = { [eventName]: output };
                ts_mockito_1.when(mockService.deleteMany(ts_mockito_1.objectContaining(input.filter))).thenResolve(output);
                ts_mockito_1.when(mockPubSub.publish(eventName, ts_mockito_1.deepEqual(event))).thenResolve();
                const result = await resolver.deleteMany({ input });
                ts_mockito_1.verify(mockPubSub.publish(eventName, ts_mockito_1.deepEqual(event))).once();
                return expect(result).toEqual(output);
            });
            it('should not publish an event if enableSubscriptions is false', async () => {
                const { resolver, mockService, mockPubSub } = await createTestResolver({ enableSubscriptions: false });
                const input = {
                    filter: { id: { eq: 'id-1' } },
                };
                const output = { deletedCount: 1 };
                ts_mockito_1.when(mockService.deleteMany(ts_mockito_1.objectContaining(input.filter))).thenResolve(output);
                const result = await resolver.deleteMany({ input });
                ts_mockito_1.verify(mockPubSub.publish(ts_mockito_1.anything(), ts_mockito_1.anything())).never();
                return expect(result).toEqual(output);
            });
            it('should not publish an event if enableSubscriptions is true and one.enableSubscriptions is false', async () => {
                const { resolver, mockService, mockPubSub } = await createTestResolver({
                    enableSubscriptions: true,
                    many: { enableSubscriptions: false },
                });
                const input = {
                    filter: { id: { eq: 'id-1' } },
                };
                const output = { deletedCount: 1 };
                ts_mockito_1.when(mockService.deleteMany(ts_mockito_1.objectContaining(input.filter))).thenResolve(output);
                const result = await resolver.deleteMany({ input });
                ts_mockito_1.verify(mockPubSub.publish(ts_mockito_1.anything(), ts_mockito_1.anything())).never();
                return expect(result).toEqual(output);
            });
        });
        describe('deletedOneSubscription', () => {
            it('should propagate events if enableSubscriptions is true', async () => {
                const { resolver, mockPubSub } = await createTestResolver({
                    enableSubscriptions: true,
                });
                const eventName = subscription_1.getDTOEventName(subscription_1.EventType.DELETED_ONE, test_resolver_dto_1.TestResolverDTO);
                const event = {
                    [eventName]: {
                        id: 'id-1',
                        stringField: 'foo',
                    },
                };
                const mockIterator = ts_mockito_1.mock();
                ts_mockito_1.when(mockPubSub.asyncIterator(eventName)).thenReturn(ts_mockito_1.instance(mockIterator));
                ts_mockito_1.when(mockIterator.next()).thenResolve({ done: false, value: event });
                const result = await resolver.deletedOneSubscription().next();
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
                const eventName = subscription_1.getDTOEventName(subscription_1.EventType.DELETED_ONE, test_resolver_dto_1.TestResolverDTO);
                return expect(() => resolver.deletedOneSubscription()).toThrow(`Unable to subscribe to ${eventName}`);
            });
            it('should not propagate events if enableSubscriptions is true and one.enableSubscriptions is false', async () => {
                const { resolver } = await createTestResolver({
                    enableSubscriptions: true,
                    one: { enableSubscriptions: false },
                });
                const eventName = subscription_1.getDTOEventName(subscription_1.EventType.DELETED_ONE, test_resolver_dto_1.TestResolverDTO);
                return expect(() => resolver.deletedOneSubscription()).toThrow(`Unable to subscribe to ${eventName}`);
            });
        });
        describe('deletedManySubscription', () => {
            it('should propagate events if enableSubscriptions is true', async () => {
                const { resolver, mockPubSub } = await createTestResolver({ enableSubscriptions: true });
                const eventName = subscription_1.getDTOEventName(subscription_1.EventType.DELETED_MANY, test_resolver_dto_1.TestResolverDTO);
                const event = { deletedCount: 1 };
                const mockIterator = ts_mockito_1.mock();
                ts_mockito_1.when(mockPubSub.asyncIterator(eventName)).thenReturn(ts_mockito_1.instance(mockIterator));
                ts_mockito_1.when(mockIterator.next()).thenResolve({ done: false, value: event });
                const result = await resolver.deletedManySubscription().next();
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
                const eventName = subscription_1.getDTOEventName(subscription_1.EventType.DELETED_MANY, test_resolver_dto_1.TestResolverDTO);
                return expect(() => resolver.deletedManySubscription()).toThrow(`Unable to subscribe to ${eventName}`);
            });
            it('should not propagate events if enableSubscriptions is true and one.enableSubscriptions is false', async () => {
                const { resolver } = await createTestResolver({
                    enableSubscriptions: true,
                    many: { enableSubscriptions: false },
                });
                const eventName = subscription_1.getDTOEventName(subscription_1.EventType.DELETED_MANY, test_resolver_dto_1.TestResolverDTO);
                return expect(() => resolver.deletedManySubscription()).toThrow(`Unable to subscribe to ${eventName}`);
            });
        });
    });
});
//# sourceMappingURL=delete.resolver.spec.js.map