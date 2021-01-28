"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const ts_mockito_1 = require("ts-mockito");
const src_1 = require("../../../src");
const __fixtures__1 = require("../../__fixtures__");
const __fixtures__2 = require("../__fixtures__");
const __fixtures__3 = require("./__fixtures__");
describe('FederationResolver', () => {
    const expectResolverSDL = (sdl, DTOClass) => {
        let TestSDLResolver = class TestSDLResolver extends src_1.FederationResolver(DTOClass) {
            test() {
                return { id: '1', stringField: 'foo' };
            }
        };
        tslib_1.__decorate([
            graphql_1.Query(() => DTOClass),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", Object)
        ], TestSDLResolver.prototype, "test", null);
        TestSDLResolver = tslib_1.__decorate([
            graphql_1.Resolver(() => DTOClass)
        ], TestSDLResolver);
        return __fixtures__1.expectSDL([TestSDLResolver], sdl);
    };
    let TestFederatedDTO = class TestFederatedDTO extends __fixtures__2.TestResolverDTO {
    };
    tslib_1.__decorate([
        src_1.FilterableField(() => graphql_1.ID),
        tslib_1.__metadata("design:type", String)
    ], TestFederatedDTO.prototype, "id", void 0);
    tslib_1.__decorate([
        src_1.FilterableField(),
        tslib_1.__metadata("design:type", String)
    ], TestFederatedDTO.prototype, "stringField", void 0);
    TestFederatedDTO = tslib_1.__decorate([
        graphql_1.ObjectType('TestFederated'),
        src_1.Relation('relation', () => __fixtures__3.TestRelationDTO),
        src_1.Relation('custom', () => __fixtures__3.TestRelationDTO, { relationName: 'other' }),
        src_1.Relation('relations', () => [__fixtures__3.TestRelationDTO]),
        src_1.Relation('relationsNoPaging', () => [__fixtures__3.TestRelationDTO], { pagingStrategy: src_1.PagingStrategies.NONE }),
        src_1.Connection('relationConnection', () => __fixtures__3.TestRelationDTO)
    ], TestFederatedDTO);
    let TestResolver = class TestResolver extends src_1.FederationResolver(TestFederatedDTO) {
        constructor(service) {
            super(service);
        }
    };
    TestResolver = tslib_1.__decorate([
        graphql_1.Resolver(() => TestFederatedDTO),
        tslib_1.__metadata("design:paramtypes", [__fixtures__2.TestService])
    ], TestResolver);
    it('should not add federation methods if one and many are empty', () => {
        return expectResolverSDL(__fixtures__3.federationRelationEmptySDL, __fixtures__2.TestResolverDTO);
    });
    it('use the defined relations', () => {
        return expectResolverSDL(__fixtures__3.federationRelationSDL, TestFederatedDTO);
    });
    describe('one', () => {
        describe('one relation', () => {
            it('should call the service findRelation with the provided dto', async () => {
                const { resolver, mockService } = await __fixtures__2.createResolverFromNest(TestResolver);
                const dto = {
                    id: 'id-1',
                    stringField: 'foo',
                };
                const output = {
                    id: 'id-2',
                    testResolverId: dto.id,
                };
                ts_mockito_1.when(mockService.findRelation(__fixtures__3.TestRelationDTO, 'relation', ts_mockito_1.deepEqual([dto]), ts_mockito_1.deepEqual({ filter: undefined }))).thenResolve(new Map([[dto, output]]));
                // @ts-ignore
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                const result = await resolver.findRelation(dto, {});
                return expect(result).toEqual(output);
            });
            it('should call the service findRelation with the provided dto and correct relation name', async () => {
                const { resolver, mockService } = await __fixtures__2.createResolverFromNest(TestResolver);
                const dto = {
                    id: 'id-1',
                    stringField: 'foo',
                };
                const output = {
                    id: 'id-2',
                    testResolverId: dto.id,
                };
                ts_mockito_1.when(mockService.findRelation(__fixtures__3.TestRelationDTO, 'other', ts_mockito_1.deepEqual([dto]), ts_mockito_1.deepEqual({ filter: undefined }))).thenResolve(new Map([[dto, output]]));
                // @ts-ignore
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                const result = await resolver.findCustom(dto, {});
                return expect(result).toEqual(output);
            });
        });
    });
    describe('many - connection', () => {
        describe('with cursor paging strategy', () => {
            it('should call the service findRelation with the provided dto', async () => {
                const { resolver, mockService } = await __fixtures__2.createResolverFromNest(TestResolver);
                const dto = {
                    id: 'id-1',
                    stringField: 'foo',
                };
                const query = {
                    filter: { id: { eq: 'id-2' } },
                    paging: { first: 1 },
                };
                const output = [
                    {
                        id: 'id-2',
                        testResolverId: dto.id,
                    },
                ];
                ts_mockito_1.when(mockService.queryRelations(__fixtures__3.TestRelationDTO, 'relationConnections', ts_mockito_1.deepEqual([dto]), ts_mockito_1.objectContaining({ ...query, paging: { limit: 2, offset: 0 } }))).thenResolve(new Map([[dto, output]]));
                // @ts-ignore
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                const result = await resolver.queryRelationConnections(dto, query, {});
                return expect(result).toEqual({
                    edges: [
                        {
                            cursor: 'YXJyYXljb25uZWN0aW9uOjA=',
                            node: {
                                id: output[0].id,
                                testResolverId: dto.id,
                            },
                        },
                    ],
                    pageInfo: {
                        endCursor: 'YXJyYXljb25uZWN0aW9uOjA=',
                        hasNextPage: false,
                        hasPreviousPage: false,
                        startCursor: 'YXJyYXljb25uZWN0aW9uOjA=',
                    },
                    totalCountFn: expect.any(Function),
                });
            });
        });
    });
    describe('with offset paging strategy', () => {
        it('should call the service findRelation with the provided dto', async () => {
            const { resolver, mockService } = await __fixtures__2.createResolverFromNest(TestResolver);
            const dto = {
                id: 'id-1',
                stringField: 'foo',
            };
            const query = {
                filter: { id: { eq: 'id-2' } },
                paging: { limit: 1 },
            };
            const output = [
                {
                    id: 'id-2',
                    testResolverId: dto.id,
                },
            ];
            ts_mockito_1.when(mockService.queryRelations(__fixtures__3.TestRelationDTO, 'relations', ts_mockito_1.deepEqual([dto]), ts_mockito_1.objectContaining(query))).thenResolve(new Map([[dto, output]]));
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            const result = await resolver.queryRelations(dto, query, {});
            return expect(result).toEqual(output);
        });
    });
    describe('with no paging strategy', () => {
        it('should call the service findRelation with the provided dto', async () => {
            const { resolver, mockService } = await __fixtures__2.createResolverFromNest(TestResolver);
            const dto = {
                id: 'id-1',
                stringField: 'foo',
            };
            const query = {
                filter: { id: { eq: 'id-2' } },
                paging: { limit: 1 },
            };
            const output = [
                {
                    id: 'id-2',
                    testResolverId: dto.id,
                },
            ];
            ts_mockito_1.when(mockService.queryRelations(__fixtures__3.TestRelationDTO, 'relationsNoPagings', ts_mockito_1.deepEqual([dto]), ts_mockito_1.objectContaining(query))).thenResolve(new Map([[dto, output]]));
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            const result = await resolver.queryRelationsNoPagings(dto, query, {});
            return expect(result).toEqual(output);
        });
    });
});
//# sourceMappingURL=federation.resolver.spec.js.map