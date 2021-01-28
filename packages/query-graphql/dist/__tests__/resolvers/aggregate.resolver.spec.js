"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const ts_mockito_1 = require("ts-mockito");
const aggregate_resolver_1 = require("../../src/resolvers/aggregate.resolver");
const __fixtures__1 = require("../__fixtures__");
const __fixtures__2 = require("./__fixtures__");
describe('AggregateResolver', () => {
    const expectResolverSDL = (sdl, opts) => {
        let TestSDLResolver = class TestSDLResolver extends aggregate_resolver_1.AggregateResolver(__fixtures__2.TestResolverDTO, opts) {
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
    it('should create a AggregateResolver for the DTO', () => {
        return expectResolverSDL(__fixtures__2.aggregateResolverSDL, { enabled: true });
    });
    it('should not expose read methods if not enabled', () => {
        return expectResolverSDL(__fixtures__2.aggregateDisabledResolverSDL);
    });
    describe('#aggregate', () => {
        let TestResolver = class TestResolver extends aggregate_resolver_1.AggregateResolver(__fixtures__2.TestResolverDTO, { enabled: true }) {
            constructor(service) {
                super(service);
            }
        };
        TestResolver = tslib_1.__decorate([
            graphql_1.Resolver(() => __fixtures__2.TestResolverDTO),
            tslib_1.__metadata("design:paramtypes", [__fixtures__2.TestService])
        ], TestResolver);
        it('should call the service query with the provided input', async () => {
            const { resolver, mockService } = await __fixtures__2.createResolverFromNest(TestResolver);
            const input = {
                filter: {
                    stringField: { eq: 'foo' },
                },
            };
            const aggregateQuery = { count: ['id'] };
            const output = {
                count: { id: 10 },
            };
            ts_mockito_1.when(mockService.aggregate(ts_mockito_1.objectContaining(input.filter), ts_mockito_1.deepEqual(aggregateQuery))).thenResolve(output);
            const result = await resolver.aggregate(input, aggregateQuery);
            return expect(result).toEqual(output);
        });
    });
});
//# sourceMappingURL=aggregate.resolver.spec.js.map