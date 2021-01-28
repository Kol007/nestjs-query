"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const ts_mockito_1 = require("ts-mockito");
const relations_1 = require("../../../src/resolvers/relations");
const __fixtures__1 = require("../../__fixtures__");
const __fixtures__2 = require("../__fixtures__");
const __fixtures__3 = require("./__fixtures__");
describe('AggregateRelationsResolver', () => {
    const expectResolverSDL = (sdl, opts) => {
        let TestSDLResolver = class TestSDLResolver extends relations_1.AggregateRelationsResolver(__fixtures__2.TestResolverDTO, opts !== null && opts !== void 0 ? opts : {}) {
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
    it('should not add read methods if one and many are empty', () => {
        return expectResolverSDL(__fixtures__3.aggregateRelationEmptyResolverSDL);
    });
    describe('aggregate', () => {
        it('should use the object type name', () => {
            return expectResolverSDL(__fixtures__3.aggregateRelationResolverSDL, {
                enableAggregate: true,
                many: { relations: { DTO: __fixtures__3.TestRelationDTO } },
            });
        });
        it('should use the dtoName if provided', () => {
            return expectResolverSDL(__fixtures__3.aggregateRelationCustomNameSDL, {
                enableAggregate: true,
                many: { relations: { DTO: __fixtures__3.TestRelationDTO, dtoName: 'Test' } },
            });
        });
        it('should not add read methods if enableAggregate is not true', () => {
            return expectResolverSDL(__fixtures__3.aggregateRelationDisabledSDL, {
                many: { relations: { DTO: __fixtures__3.TestRelationDTO, disableRead: true } },
            });
        });
        describe('aggregate query', () => {
            it('should call the service aggregateRelations with the provided dto', async () => {
                let TestResolver = class TestResolver extends relations_1.AggregateRelationsResolver(__fixtures__2.TestResolverDTO, {
                    enableAggregate: true,
                    one: { relation: { DTO: __fixtures__3.TestRelationDTO }, custom: { DTO: __fixtures__3.TestRelationDTO, relationName: 'other' } },
                    many: { relations: { DTO: __fixtures__3.TestRelationDTO }, customs: { DTO: __fixtures__3.TestRelationDTO, relationName: 'others' } },
                }) {
                    constructor(service) {
                        super(service);
                    }
                };
                TestResolver = tslib_1.__decorate([
                    graphql_1.Resolver(() => __fixtures__2.TestResolverDTO),
                    tslib_1.__metadata("design:paramtypes", [__fixtures__2.TestService])
                ], TestResolver);
                const { resolver, mockService } = await __fixtures__2.createResolverFromNest(TestResolver);
                const dto = {
                    id: 'id-1',
                    stringField: 'foo',
                };
                const filter = { id: { eq: 'id-2' } };
                const aggregateQuery = {
                    count: ['id'],
                    sum: ['testResolverId'],
                };
                const output = {
                    count: { id: 10 },
                    sum: { testResolverId: 100 },
                };
                ts_mockito_1.when(mockService.aggregateRelations(__fixtures__3.TestRelationDTO, 'relations', ts_mockito_1.deepEqual([dto]), ts_mockito_1.objectContaining(filter), ts_mockito_1.objectContaining(aggregateQuery))).thenResolve(new Map([[dto, output]]));
                // @ts-ignore
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                const result = await resolver.aggregateRelations(dto, { filter }, aggregateQuery, {});
                return expect(result).toEqual(output);
            });
        });
    });
});
//# sourceMappingURL=aggregate-relation.resolver.spec.js.map