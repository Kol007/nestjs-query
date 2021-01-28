"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const ts_mockito_1 = require("ts-mockito");
const src_1 = require("../../../src");
const relations_1 = require("../../../src/resolvers/relations");
const __fixtures__1 = require("../../__fixtures__");
const __fixtures__2 = require("../__fixtures__");
const __fixtures__3 = require("./__fixtures__");
describe('ReadRelationsResolver', () => {
    const expectResolverSDL = (sdl, opts) => {
        let TestSDLResolver = class TestSDLResolver extends relations_1.ReadRelationsResolver(__fixtures__2.TestResolverDTO, opts !== null && opts !== void 0 ? opts : {}) {
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
        return expectResolverSDL(__fixtures__3.readRelationEmptySDL);
    });
    describe('one', () => {
        let TestResolver = class TestResolver extends relations_1.ReadRelationsResolver(__fixtures__2.TestResolverDTO, {
            one: { relation: { DTO: __fixtures__3.TestRelationDTO }, custom: { DTO: __fixtures__3.TestRelationDTO, relationName: 'other' } },
        }) {
            constructor(service) {
                super(service);
            }
        };
        TestResolver = tslib_1.__decorate([
            graphql_1.Resolver(() => __fixtures__2.TestResolverDTO),
            tslib_1.__metadata("design:paramtypes", [__fixtures__2.TestService])
        ], TestResolver);
        it('should use the object type name', () => {
            return expectResolverSDL(__fixtures__3.readRelationOneSDL, { one: { relation: { DTO: __fixtures__3.TestRelationDTO } } });
        });
        it('should use the dtoName if provided', () => {
            return expectResolverSDL(__fixtures__3.readRelationOneCustomNameSDL, {
                one: { relation: { DTO: __fixtures__3.TestRelationDTO, dtoName: 'Test' } },
            });
        });
        it('should set the field to nullable if set to true', () => {
            return expectResolverSDL(__fixtures__3.readRelationOneNullableSDL, {
                one: { relation: { DTO: __fixtures__3.TestRelationDTO, nullable: true } },
            });
        });
        it('should not add read one methods if disableRead is true', () => {
            return expectResolverSDL(__fixtures__3.readRelationOneDisabledSDL, {
                one: { relation: { DTO: __fixtures__3.TestRelationDTO, disableRead: true } },
            });
        });
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
    describe('many', () => {
        it('should use the object type name', () => {
            return expectResolverSDL(__fixtures__3.readRelationManySDL, { many: { relations: { DTO: __fixtures__3.TestRelationDTO } } });
        });
        it('should use the dtoName if provided', () => {
            return expectResolverSDL(__fixtures__3.readRelationManyCustomNameSDL, {
                many: { relations: { DTO: __fixtures__3.TestRelationDTO, dtoName: 'Test' } },
            });
        });
        it('should set the field to nullable if set to true', () => {
            return expectResolverSDL(__fixtures__3.readRelationManyNullableSDL, {
                many: { relations: { DTO: __fixtures__3.TestRelationDTO, nullable: true } },
            });
        });
        it('should not use connections if pagingStrategy is offset', () => {
            return expectResolverSDL(__fixtures__3.readRelationManyOffset, {
                many: { relations: { DTO: __fixtures__3.TestRelationDTO, nullable: true, pagingStrategy: src_1.PagingStrategies.OFFSET } },
            });
        });
        it('should not add read methods if disableRead is true', () => {
            return expectResolverSDL(__fixtures__3.readRelationManyDisabledSDL, {
                many: { relations: { DTO: __fixtures__3.TestRelationDTO, disableRead: true } },
            });
        });
        describe('many connection query', () => {
            let TestResolver = class TestResolver extends relations_1.ReadRelationsResolver(__fixtures__2.TestResolverDTO, {
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
            it('should call the service queryRelations with the provided dto', async () => {
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
                ts_mockito_1.when(mockService.queryRelations(__fixtures__3.TestRelationDTO, 'relations', ts_mockito_1.deepEqual([dto]), ts_mockito_1.objectContaining({ ...query, paging: { limit: 2, offset: 0 } }))).thenResolve(new Map([[dto, output]]));
                // @ts-ignore
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                const result = await resolver.queryRelations(dto, query, {});
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
            it('should call the service countRelations with the provided dto', async () => {
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
                ts_mockito_1.when(mockService.queryRelations(__fixtures__3.TestRelationDTO, 'relations', ts_mockito_1.deepEqual([dto]), ts_mockito_1.objectContaining({ ...query, paging: { limit: 2, offset: 0 } }))).thenResolve(new Map([[dto, output]]));
                // @ts-ignore
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                const result = await resolver.queryRelations(dto, query, {});
                ts_mockito_1.when(mockService.countRelations(__fixtures__3.TestRelationDTO, 'relations', ts_mockito_1.deepEqual([dto]), ts_mockito_1.objectContaining(query.filter))).thenResolve(new Map([[dto, 10]]));
                return expect(result.totalCount).resolves.toBe(10);
            });
            it('should call the service findRelation with the provided dto and correct relation name', async () => {
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
                ts_mockito_1.when(mockService.queryRelations(__fixtures__3.TestRelationDTO, 'others', ts_mockito_1.deepEqual([dto]), ts_mockito_1.objectContaining({ ...query, paging: { limit: 2, offset: 0 } }))).thenResolve(new Map([[dto, output]]));
                // @ts-ignore
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                const result = await resolver.queryCustoms(dto, query, {});
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
        describe('many limit offset query', () => {
            let TestResolver = class TestResolver extends relations_1.ReadRelationsResolver(__fixtures__2.TestResolverDTO, {
                one: { relation: { DTO: __fixtures__3.TestRelationDTO }, custom: { DTO: __fixtures__3.TestRelationDTO, relationName: 'other' } },
                many: {
                    relations: { DTO: __fixtures__3.TestRelationDTO, pagingStrategy: src_1.PagingStrategies.OFFSET },
                    customs: { DTO: __fixtures__3.TestRelationDTO, relationName: 'others', pagingStrategy: src_1.PagingStrategies.OFFSET },
                },
            }) {
                constructor(service) {
                    super(service);
                }
            };
            TestResolver = tslib_1.__decorate([
                graphql_1.Resolver(() => __fixtures__2.TestResolverDTO),
                tslib_1.__metadata("design:paramtypes", [__fixtures__2.TestService])
            ], TestResolver);
            it('should call the service queryRelations with the provided dto', async () => {
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
                ts_mockito_1.when(mockService.queryRelations(__fixtures__3.TestRelationDTO, 'relations', ts_mockito_1.deepEqual([dto]), ts_mockito_1.objectContaining({ ...query }))).thenResolve(new Map([[dto, output]]));
                // @ts-ignore
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                const result = await resolver.queryRelations(dto, query, {});
                return expect(result).toEqual(output);
            });
            it('should call the service findRelation with the provided dto and correct relation name', async () => {
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
                ts_mockito_1.when(mockService.queryRelations(__fixtures__3.TestRelationDTO, 'others', ts_mockito_1.deepEqual([dto]), ts_mockito_1.objectContaining(query))).thenResolve(new Map([[dto, output]]));
                // @ts-ignore
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                const result = await resolver.queryCustoms(dto, query, {});
                return expect(result).toEqual(output);
            });
        });
        describe('many limit no paging', () => {
            let TestResolver = class TestResolver extends relations_1.ReadRelationsResolver(__fixtures__2.TestResolverDTO, {
                one: { relation: { DTO: __fixtures__3.TestRelationDTO }, custom: { DTO: __fixtures__3.TestRelationDTO, relationName: 'other' } },
                many: {
                    relations: { DTO: __fixtures__3.TestRelationDTO, pagingStrategy: src_1.PagingStrategies.NONE },
                    customs: { DTO: __fixtures__3.TestRelationDTO, pagingStrategy: src_1.PagingStrategies.NONE, relationName: 'others' },
                },
            }) {
                constructor(service) {
                    super(service);
                }
            };
            TestResolver = tslib_1.__decorate([
                graphql_1.Resolver(() => __fixtures__2.TestResolverDTO),
                tslib_1.__metadata("design:paramtypes", [__fixtures__2.TestService])
            ], TestResolver);
            it('should call the service queryRelations with the provided dto', async () => {
                const { resolver, mockService } = await __fixtures__2.createResolverFromNest(TestResolver);
                const dto = {
                    id: 'id-1',
                    stringField: 'foo',
                };
                const query = {
                    filter: { id: { eq: 'id-2' } },
                };
                const output = [
                    {
                        id: 'id-2',
                        testResolverId: dto.id,
                    },
                ];
                ts_mockito_1.when(mockService.queryRelations(__fixtures__3.TestRelationDTO, 'relations', ts_mockito_1.deepEqual([dto]), ts_mockito_1.objectContaining({ ...query }))).thenResolve(new Map([[dto, output]]));
                // @ts-ignore
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                const result = await resolver.queryRelations(dto, query, {});
                return expect(result).toEqual(output);
            });
            it('should call the service findRelation with the provided dto and correct relation name', async () => {
                const { resolver, mockService } = await __fixtures__2.createResolverFromNest(TestResolver);
                const dto = {
                    id: 'id-1',
                    stringField: 'foo',
                };
                const query = {
                    filter: { id: { eq: 'id-2' } },
                };
                const output = [
                    {
                        id: 'id-2',
                        testResolverId: dto.id,
                    },
                ];
                ts_mockito_1.when(mockService.queryRelations(__fixtures__3.TestRelationDTO, 'others', ts_mockito_1.deepEqual([dto]), ts_mockito_1.objectContaining(query))).thenResolve(new Map([[dto, output]]));
                // @ts-ignore
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                const result = await resolver.queryCustoms(dto, query, {});
                return expect(result).toEqual(output);
            });
        });
    });
});
//# sourceMappingURL=read-relation.resolver.spec.js.map