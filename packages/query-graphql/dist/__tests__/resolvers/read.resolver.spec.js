"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// eslint-disable-next-line max-classes-per-file
const graphql_1 = require("@nestjs/graphql");
const ts_mockito_1 = require("ts-mockito");
const src_1 = require("../../src");
const __fixtures__1 = require("../__fixtures__");
const __fixtures__2 = require("./__fixtures__");
describe('ReadResolver', () => {
    const expectResolverSDL = (sdl, opts) => {
        let TestSDLResolver = class TestSDLResolver extends src_1.ReadResolver(__fixtures__2.TestResolverDTO, opts) {
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
    it('should create a ReadResolver for the DTO', () => {
        return expectResolverSDL(__fixtures__2.readBasicResolverSDL);
    });
    it('should use the dtoName if provided', () => {
        return expectResolverSDL(__fixtures__2.readCustomNameResolverSDL, { dtoName: 'Test' });
    });
    it('should use the one.name option for the findById if provided', () => {
        return expectResolverSDL(__fixtures__2.readCustomOneQueryResolverSDL, { one: { name: 'read_one_test' } });
    });
    it('should use the many.name option for the queryMany if provided', () => {
        return expectResolverSDL(__fixtures__2.readCustomManyQueryResolverSDL, { many: { name: 'read_many_test' } });
    });
    it('should not expose read methods if disabled', () => {
        return expectResolverSDL(__fixtures__2.readDisabledResolverSDL, { disabled: true });
    });
    describe('query many', () => {
        it('should not create a new type if the QueryArgs is supplied', () => {
            let CustomQueryArgs = class CustomQueryArgs extends src_1.QueryArgsType(__fixtures__2.TestResolverDTO) {
            };
            tslib_1.__decorate([
                graphql_1.Field(),
                tslib_1.__metadata("design:type", String)
            ], CustomQueryArgs.prototype, "other", void 0);
            CustomQueryArgs = tslib_1.__decorate([
                graphql_1.ArgsType()
            ], CustomQueryArgs);
            return expectResolverSDL(__fixtures__2.readCustomQueryResolverSDL, { QueryArgs: CustomQueryArgs });
        });
        it('should use a connection if custom QueryArgs is a cursor', () => {
            let CustomQueryArgs = class CustomQueryArgs extends src_1.QueryArgsType(__fixtures__2.TestResolverDTO, { pagingStrategy: src_1.PagingStrategies.CURSOR }) {
            };
            CustomQueryArgs = tslib_1.__decorate([
                graphql_1.ArgsType()
            ], CustomQueryArgs);
            return expectResolverSDL(__fixtures__2.readBasicResolverSDL, { QueryArgs: CustomQueryArgs });
        });
        it('should not use a connection if pagingStrategy is OFFSET', () => {
            return expectResolverSDL(__fixtures__2.readOffsetQueryResolverSDL, { pagingStrategy: src_1.PagingStrategies.OFFSET });
        });
        it('should not use a connection if custom QueryArgs is a limit offset', () => {
            let CustomQueryArgs = class CustomQueryArgs extends src_1.QueryArgsType(__fixtures__2.TestResolverDTO, { pagingStrategy: src_1.PagingStrategies.OFFSET }) {
            };
            CustomQueryArgs = tslib_1.__decorate([
                graphql_1.ArgsType()
            ], CustomQueryArgs);
            return expectResolverSDL(__fixtures__2.readOffsetQueryResolverSDL, { QueryArgs: CustomQueryArgs });
        });
        it('should not expose query method if disabled', () => {
            return expectResolverSDL(__fixtures__2.readManyDisabledResolverSDL, { many: { disabled: true } });
        });
        it('should not create a new type if the Connection is supplied', () => {
            let CustomConnection = class CustomConnection extends src_1.ConnectionType(__fixtures__2.TestResolverDTO) {
            };
            tslib_1.__decorate([
                graphql_1.Field(),
                tslib_1.__metadata("design:type", String)
            ], CustomConnection.prototype, "other", void 0);
            CustomConnection = tslib_1.__decorate([
                graphql_1.ObjectType()
            ], CustomConnection);
            return expectResolverSDL(__fixtures__2.readCustomConnectionResolverSDL, { Connection: CustomConnection });
        });
        describe('#queryMany cursor connection', () => {
            let TestResolver = class TestResolver extends src_1.ReadResolver(__fixtures__2.TestResolverDTO) {
                constructor(service, authorizer) {
                    super(service);
                    this.authorizer = authorizer;
                }
            };
            TestResolver = tslib_1.__decorate([
                graphql_1.Resolver(() => __fixtures__2.TestResolverDTO),
                tslib_1.__param(1, src_1.InjectAuthorizer(__fixtures__2.TestResolverDTO)),
                tslib_1.__metadata("design:paramtypes", [__fixtures__2.TestService, Object])
            ], TestResolver);
            it('should call the service query with the provided input', async () => {
                const { resolver, mockService, mockAuthorizer } = await __fixtures__2.createResolverFromNest(TestResolver);
                const input = {
                    filter: {
                        stringField: { eq: 'foo' },
                    },
                    paging: { first: 1 },
                };
                const output = [
                    {
                        id: 'id-1',
                        stringField: 'foo',
                    },
                ];
                const context = {};
                ts_mockito_1.when(mockAuthorizer.authorize(context)).thenResolve({});
                ts_mockito_1.when(mockService.query(ts_mockito_1.objectContaining({ ...input, paging: { limit: 2, offset: 0 } }))).thenResolve(output);
                const result = await resolver.queryMany(input, context);
                return expect(result).toEqual({
                    edges: [
                        {
                            cursor: 'YXJyYXljb25uZWN0aW9uOjA=',
                            node: {
                                id: 'id-1',
                                stringField: 'foo',
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
            it('should invoke the auth service for a filter for the DTO', async () => {
                const { resolver, mockService, mockAuthorizer } = await __fixtures__2.createResolverFromNest(TestResolver);
                const input = {
                    filter: {
                        stringField: { eq: 'foo' },
                    },
                    paging: { first: 1 },
                };
                const output = [
                    {
                        id: 'id-1',
                        stringField: 'foo',
                    },
                ];
                const authorizeFilter = { id: { eq: '1' } };
                const context = {};
                ts_mockito_1.when(mockAuthorizer.authorize(context)).thenResolve(authorizeFilter);
                ts_mockito_1.when(mockService.query(ts_mockito_1.objectContaining({ filter: { ...input.filter, ...authorizeFilter }, paging: { limit: 2, offset: 0 } }))).thenResolve(output);
                const result = await resolver.queryMany(input, context);
                return expect(result).toEqual({
                    edges: [
                        {
                            cursor: 'YXJyYXljb25uZWN0aW9uOjA=',
                            node: {
                                id: 'id-1',
                                stringField: 'foo',
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
            it('should call the service count with the provided input', async () => {
                const { resolver, mockService, mockAuthorizer } = await __fixtures__2.createResolverFromNest(TestResolver);
                const input = {
                    filter: {
                        stringField: { eq: 'foo' },
                    },
                    paging: { first: 1 },
                };
                const output = [
                    {
                        id: 'id-1',
                        stringField: 'foo',
                    },
                ];
                const context = {};
                ts_mockito_1.when(mockAuthorizer.authorize(context)).thenResolve({});
                ts_mockito_1.when(mockService.query(ts_mockito_1.objectContaining({ ...input, paging: { limit: 2, offset: 0 } }))).thenResolve(output);
                const result = await resolver.queryMany(input, context);
                ts_mockito_1.when(mockService.count(ts_mockito_1.objectContaining(input.filter))).thenResolve(10);
                return expect(result.totalCount).resolves.toBe(10);
            });
            it('should call the service count with the provided input and auth filter', async () => {
                const { resolver, mockService, mockAuthorizer } = await __fixtures__2.createResolverFromNest(TestResolver);
                const input = {
                    filter: {
                        stringField: { eq: 'foo' },
                    },
                    paging: { first: 1 },
                };
                const output = [
                    {
                        id: 'id-1',
                        stringField: 'foo',
                    },
                ];
                const context = {};
                const authorizeFilter = { id: { eq: '1' } };
                ts_mockito_1.when(mockAuthorizer.authorize(context)).thenResolve(authorizeFilter);
                ts_mockito_1.when(mockService.query(ts_mockito_1.objectContaining({ filter: { ...input.filter, ...authorizeFilter }, paging: { limit: 2, offset: 0 } }))).thenResolve(output);
                const result = await resolver.queryMany(input, context);
                ts_mockito_1.when(mockService.count(ts_mockito_1.objectContaining({ ...input.filter, ...authorizeFilter }))).thenResolve(10);
                return expect(result.totalCount).resolves.toBe(10);
            });
        });
        describe('queryMany array connection', () => {
            let TestResolver = class TestResolver extends src_1.ReadResolver(__fixtures__2.TestResolverDTO, { pagingStrategy: src_1.PagingStrategies.OFFSET }) {
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
                    paging: { limit: 1 },
                };
                const output = [
                    {
                        id: 'id-1',
                        stringField: 'foo',
                    },
                ];
                ts_mockito_1.when(mockService.query(ts_mockito_1.objectContaining(input))).thenResolve(output);
                const result = await resolver.queryMany(input);
                return expect(result).toEqual(output);
            });
        });
        describe('queryMany no paging connection', () => {
            let TestResolver = class TestResolver extends src_1.ReadResolver(__fixtures__2.TestResolverDTO, { pagingStrategy: src_1.PagingStrategies.NONE }) {
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
                const output = [
                    {
                        id: 'id-1',
                        stringField: 'foo',
                    },
                ];
                ts_mockito_1.when(mockService.query(ts_mockito_1.objectContaining(input))).thenResolve(output);
                const result = await resolver.queryMany(input);
                return expect(result).toEqual(output);
            });
        });
    });
    describe('#findById', () => {
        let TestResolver = class TestResolver extends src_1.ReadResolver(__fixtures__2.TestResolverDTO) {
            constructor(service, authorizer) {
                super(service);
                this.authorizer = authorizer;
            }
        };
        TestResolver = tslib_1.__decorate([
            graphql_1.Resolver(() => __fixtures__2.TestResolverDTO),
            tslib_1.__param(1, src_1.InjectAuthorizer(__fixtures__2.TestResolverDTO)),
            tslib_1.__metadata("design:paramtypes", [__fixtures__2.TestService, Object])
        ], TestResolver);
        it('should not expose findById method if disabled', () => {
            return expectResolverSDL(__fixtures__2.readOneDisabledResolverSDL, { one: { disabled: true } });
        });
        it('should call the service findById with the provided input', async () => {
            const { resolver, mockService, mockAuthorizer } = await __fixtures__2.createResolverFromNest(TestResolver);
            const input = { id: 'id-1' };
            const output = {
                id: 'id-1',
                stringField: 'foo',
            };
            const context = {};
            ts_mockito_1.when(mockAuthorizer.authorize(context)).thenResolve({});
            ts_mockito_1.when(mockService.findById(input.id, ts_mockito_1.deepEqual({ filter: {} }))).thenResolve(output);
            const result = await resolver.findById(input, context);
            return expect(result).toEqual(output);
        });
        it('should call the service findById with the provided input filter from the authorizer', async () => {
            const { resolver, mockService, mockAuthorizer } = await __fixtures__2.createResolverFromNest(TestResolver);
            const input = { id: 'id-1' };
            const output = {
                id: 'id-1',
                stringField: 'foo',
            };
            const context = {};
            const authorizeFilter = { stringField: { eq: 'foo' } };
            ts_mockito_1.when(mockAuthorizer.authorize(context)).thenResolve(authorizeFilter);
            ts_mockito_1.when(mockService.findById(input.id, ts_mockito_1.deepEqual({ filter: authorizeFilter }))).thenResolve(output);
            const result = await resolver.findById(input, context);
            return expect(result).toEqual(output);
        });
    });
    it('should expose totalCount on connections if enableTotalCount is true', () => {
        let TotalCountDTO = class TotalCountDTO extends __fixtures__2.TestResolverDTO {
        };
        TotalCountDTO = tslib_1.__decorate([
            graphql_1.ObjectType('TotalCountDTO')
        ], TotalCountDTO);
        let TestTotalCountSDLResolver = class TestTotalCountSDLResolver extends src_1.ReadResolver(TotalCountDTO, { enableTotalCount: true }) {
            test() {
                return { id: '1', stringField: 'foo' };
            }
        };
        tslib_1.__decorate([
            graphql_1.Query(() => TotalCountDTO),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", TotalCountDTO)
        ], TestTotalCountSDLResolver.prototype, "test", null);
        TestTotalCountSDLResolver = tslib_1.__decorate([
            graphql_1.Resolver(() => TotalCountDTO)
        ], TestTotalCountSDLResolver);
        return __fixtures__1.expectSDL([TestTotalCountSDLResolver], __fixtures__2.readConnectionWithTotalCountSDL);
    });
});
//# sourceMappingURL=read.resolver.spec.js.map