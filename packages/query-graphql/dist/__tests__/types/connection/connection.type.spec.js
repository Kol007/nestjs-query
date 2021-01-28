"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// eslint-disable-next-line max-classes-per-file
const graphql_1 = require("@nestjs/graphql");
const class_transformer_1 = require("class-transformer");
const core_1 = require("nestjs-query/packages/core");
const src_1 = require("../../../src");
const __fixtures__1 = require("../../__fixtures__");
const decorators_1 = require("../../../src/decorators");
describe('ConnectionType', () => {
    let TestDto = class TestDto {
    };
    tslib_1.__decorate([
        graphql_1.Field(),
        tslib_1.__metadata("design:type", String)
    ], TestDto.prototype, "stringField", void 0);
    tslib_1.__decorate([
        graphql_1.Field(),
        tslib_1.__metadata("design:type", Number)
    ], TestDto.prototype, "numberField", void 0);
    tslib_1.__decorate([
        graphql_1.Field(),
        tslib_1.__metadata("design:type", Boolean)
    ], TestDto.prototype, "boolField", void 0);
    TestDto = tslib_1.__decorate([
        graphql_1.ObjectType('Test')
    ], TestDto);
    let TestTotalCountDto = class TestTotalCountDto {
    };
    tslib_1.__decorate([
        graphql_1.Field(),
        tslib_1.__metadata("design:type", String)
    ], TestTotalCountDto.prototype, "stringField", void 0);
    TestTotalCountDto = tslib_1.__decorate([
        graphql_1.ObjectType('TestTotalCount')
    ], TestTotalCountDto);
    const createPage = (paging) => {
        return class_transformer_1.plainToClass(src_1.CursorPagingType(), paging);
    };
    const createTestDTO = (index) => {
        return { stringField: `foo${index}`, numberField: index, boolField: index % 2 === 0 };
    };
    it('should create the connection SDL', async () => {
        const TestConnection = src_1.ConnectionType(TestDto);
        let TestConnectionTypeResolver = class TestConnectionTypeResolver {
            test() {
                return undefined;
            }
        };
        tslib_1.__decorate([
            graphql_1.Query(() => TestConnection),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", Object)
        ], TestConnectionTypeResolver.prototype, "test", null);
        TestConnectionTypeResolver = tslib_1.__decorate([
            graphql_1.Resolver()
        ], TestConnectionTypeResolver);
        return __fixtures__1.expectSDL([TestConnectionTypeResolver], __fixtures__1.connectionObjectTypeSDL);
    });
    it('should create the connection SDL with totalCount if enabled', async () => {
        const TestConnectionWithTotalCount = src_1.ConnectionType(TestTotalCountDto, { enableTotalCount: true });
        let TestConnectionTypeResolver = class TestConnectionTypeResolver {
            test() {
                return undefined;
            }
        };
        tslib_1.__decorate([
            graphql_1.Query(() => TestConnectionWithTotalCount),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", Object)
        ], TestConnectionTypeResolver.prototype, "test", null);
        TestConnectionTypeResolver = tslib_1.__decorate([
            graphql_1.Resolver()
        ], TestConnectionTypeResolver);
        return __fixtures__1.expectSDL([TestConnectionTypeResolver], __fixtures__1.connectionObjectTypeWithTotalCountSDL);
    });
    it('should throw an error if the object is not registered with @nestjs/graphql', () => {
        class TestBadDto {
        }
        tslib_1.__decorate([
            graphql_1.Field(),
            tslib_1.__metadata("design:type", String)
        ], TestBadDto.prototype, "stringField", void 0);
        expect(() => src_1.ConnectionType(TestBadDto)).toThrow('Unable to make ConnectionType. Ensure TestBadDto is annotated with @nestjs/graphql @ObjectType');
    });
    describe('limit offset offset connection', () => {
        const TestConnection = src_1.ConnectionType(TestDto);
        it('should create an empty connection when created with new', () => {
            expect(new TestConnection()).toEqual({
                pageInfo: { hasNextPage: false, hasPreviousPage: false },
                edges: [],
                totalCountFn: expect.any(Function),
            });
        });
        describe('.createFromPromise', () => {
            it('should create a connections response with an empty query', async () => {
                const queryMany = jest.fn();
                const response = await TestConnection.createFromPromise(queryMany, {});
                expect(queryMany).toHaveBeenCalledTimes(0);
                expect(response).toEqual({
                    edges: [],
                    pageInfo: {
                        hasNextPage: false,
                        hasPreviousPage: false,
                    },
                    totalCountFn: expect.any(Function),
                });
            });
            it('should create a connections response with an empty paging', async () => {
                const queryMany = jest.fn();
                const response = await TestConnection.createFromPromise(queryMany, { paging: {} });
                expect(queryMany).toHaveBeenCalledTimes(0);
                expect(response).toEqual({
                    edges: [],
                    pageInfo: {
                        hasNextPage: false,
                        hasPreviousPage: false,
                    },
                    totalCountFn: expect.any(Function),
                });
            });
            describe('with first', () => {
                it('should return hasNextPage and hasPreviousPage false when there are the exact number of records', async () => {
                    const queryMany = jest.fn();
                    const dtos = [createTestDTO(1), createTestDTO(2)];
                    queryMany.mockResolvedValueOnce([...dtos]);
                    const response = await TestConnection.createFromPromise(queryMany, { paging: createPage({ first: 2 }) });
                    expect(queryMany).toHaveBeenCalledTimes(1);
                    expect(queryMany).toHaveBeenCalledWith({ paging: { limit: 3, offset: 0 } });
                    expect(response).toEqual({
                        edges: [
                            { cursor: 'YXJyYXljb25uZWN0aW9uOjA=', node: dtos[0] },
                            { cursor: 'YXJyYXljb25uZWN0aW9uOjE=', node: dtos[1] },
                        ],
                        pageInfo: {
                            endCursor: 'YXJyYXljb25uZWN0aW9uOjE=',
                            hasNextPage: false,
                            hasPreviousPage: false,
                            startCursor: 'YXJyYXljb25uZWN0aW9uOjA=',
                        },
                        totalCountFn: expect.any(Function),
                    });
                });
                it('should return hasNextPage true and hasPreviousPage false when the number of records more than the first', async () => {
                    const queryMany = jest.fn();
                    const dtos = [createTestDTO(1), createTestDTO(2), createTestDTO(3)];
                    queryMany.mockResolvedValueOnce([...dtos]);
                    const response = await TestConnection.createFromPromise(queryMany, { paging: createPage({ first: 2 }) });
                    expect(queryMany).toHaveBeenCalledTimes(1);
                    expect(queryMany).toHaveBeenCalledWith({ paging: { limit: 3, offset: 0 } });
                    expect(response).toEqual({
                        edges: [
                            { cursor: 'YXJyYXljb25uZWN0aW9uOjA=', node: dtos[0] },
                            { cursor: 'YXJyYXljb25uZWN0aW9uOjE=', node: dtos[1] },
                        ],
                        pageInfo: {
                            endCursor: 'YXJyYXljb25uZWN0aW9uOjE=',
                            hasNextPage: true,
                            hasPreviousPage: false,
                            startCursor: 'YXJyYXljb25uZWN0aW9uOjA=',
                        },
                        totalCountFn: expect.any(Function),
                    });
                });
            });
            describe('with last', () => {
                it("should return hasPreviousPage false if paging backwards and we're on the first page", async () => {
                    const queryMany = jest.fn();
                    const dtos = [createTestDTO(1)];
                    queryMany.mockResolvedValueOnce([...dtos]);
                    const response = await TestConnection.createFromPromise(queryMany, {
                        paging: createPage({ last: 2, before: 'YXJyYXljb25uZWN0aW9uOjE=' }),
                    });
                    expect(queryMany).toHaveBeenCalledTimes(1);
                    expect(queryMany).toHaveBeenCalledWith({ paging: { limit: 1, offset: 0 } });
                    expect(response).toEqual({
                        edges: [{ cursor: 'YXJyYXljb25uZWN0aW9uOjA=', node: dtos[0] }],
                        pageInfo: {
                            endCursor: 'YXJyYXljb25uZWN0aW9uOjA=',
                            hasNextPage: true,
                            hasPreviousPage: false,
                            startCursor: 'YXJyYXljb25uZWN0aW9uOjA=',
                        },
                        totalCountFn: expect.any(Function),
                    });
                });
                it('should return hasPreviousPage true if paging backwards and there is an additional node', async () => {
                    const queryMany = jest.fn();
                    const dtos = [createTestDTO(1), createTestDTO(2), createTestDTO(3)];
                    queryMany.mockResolvedValueOnce([...dtos]);
                    const response = await TestConnection.createFromPromise(queryMany, {
                        paging: createPage({ last: 2, before: 'YXJyYXljb25uZWN0aW9uOjM=' }),
                    });
                    expect(queryMany).toHaveBeenCalledTimes(1);
                    expect(queryMany).toHaveBeenCalledWith({ paging: { limit: 3, offset: 0 } });
                    expect(response).toEqual({
                        edges: [
                            { cursor: 'YXJyYXljb25uZWN0aW9uOjE=', node: dtos[1] },
                            { cursor: 'YXJyYXljb25uZWN0aW9uOjI=', node: dtos[2] },
                        ],
                        pageInfo: {
                            endCursor: 'YXJyYXljb25uZWN0aW9uOjI=',
                            hasNextPage: true,
                            hasPreviousPage: true,
                            startCursor: 'YXJyYXljb25uZWN0aW9uOjE=',
                        },
                        totalCountFn: expect.any(Function),
                    });
                });
            });
            it('should create an empty connection', async () => {
                const queryMany = jest.fn();
                queryMany.mockResolvedValueOnce([]);
                const response = await TestConnection.createFromPromise(queryMany, {
                    paging: createPage({ first: 2 }),
                });
                expect(queryMany).toHaveBeenCalledTimes(1);
                expect(queryMany).toHaveBeenCalledWith({ paging: { limit: 3, offset: 0 } });
                expect(response).toEqual({
                    edges: [],
                    pageInfo: {
                        hasNextPage: false,
                        hasPreviousPage: false,
                    },
                    totalCountFn: expect.any(Function),
                });
            });
        });
    });
    describe('keyset connection', () => {
        let TestKeySetDTO = class TestKeySetDTO extends TestDto {
        };
        TestKeySetDTO = tslib_1.__decorate([
            graphql_1.ObjectType(),
            decorators_1.KeySet(['stringField'])
        ], TestKeySetDTO);
        function getConnectionType() {
            return src_1.ConnectionType(TestKeySetDTO);
        }
        it('should create an empty connection when created with new', () => {
            const CT = getConnectionType();
            expect(new CT()).toEqual({
                pageInfo: { hasNextPage: false, hasPreviousPage: false },
                edges: [],
                totalCountFn: expect.any(Function),
            });
        });
        describe('.createFromPromise', () => {
            it('should create a connections response with an empty query', async () => {
                const queryMany = jest.fn();
                const response = await getConnectionType().createFromPromise(queryMany, {});
                expect(queryMany).toHaveBeenCalledTimes(0);
                expect(response).toEqual({
                    edges: [],
                    pageInfo: {
                        hasNextPage: false,
                        hasPreviousPage: false,
                    },
                    totalCountFn: expect.any(Function),
                });
            });
            it('should create a connections response with an empty paging', async () => {
                const queryMany = jest.fn();
                const response = await getConnectionType().createFromPromise(queryMany, { paging: {} });
                expect(queryMany).toHaveBeenCalledTimes(0);
                expect(response).toEqual({
                    edges: [],
                    pageInfo: {
                        hasNextPage: false,
                        hasPreviousPage: false,
                    },
                    totalCountFn: expect.any(Function),
                });
            });
            describe('with first', () => {
                it('should return hasNextPage and hasPreviousPage false when there are the exact number of records', async () => {
                    const queryMany = jest.fn();
                    const dtos = [createTestDTO(1), createTestDTO(2)];
                    queryMany.mockResolvedValueOnce([...dtos]);
                    const response = await getConnectionType().createFromPromise(queryMany, { paging: createPage({ first: 2 }) });
                    expect(queryMany).toHaveBeenCalledTimes(1);
                    expect(queryMany).toHaveBeenCalledWith({
                        filter: {},
                        paging: { limit: 3 },
                        sorting: [{ field: 'stringField', direction: core_1.SortDirection.ASC }],
                    });
                    expect(response).toEqual({
                        edges: [
                            {
                                cursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28xIn1dfQ==',
                                node: dtos[0],
                            },
                            {
                                cursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28yIn1dfQ==',
                                node: dtos[1],
                            },
                        ],
                        pageInfo: {
                            startCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28xIn1dfQ==',
                            endCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28yIn1dfQ==',
                            hasNextPage: false,
                            hasPreviousPage: false,
                        },
                        totalCountFn: expect.any(Function),
                    });
                });
                it('should return hasNextPage true and hasPreviousPage false when the number of records more than the first', async () => {
                    const queryMany = jest.fn();
                    const dtos = [createTestDTO(1), createTestDTO(2), createTestDTO(3)];
                    queryMany.mockResolvedValueOnce([...dtos]);
                    const response = await getConnectionType().createFromPromise(queryMany, { paging: createPage({ first: 2 }) });
                    expect(queryMany).toHaveBeenCalledTimes(1);
                    expect(queryMany).toHaveBeenCalledWith({
                        filter: {},
                        paging: { limit: 3 },
                        sorting: [{ field: 'stringField', direction: core_1.SortDirection.ASC }],
                    });
                    expect(response).toEqual({
                        edges: [
                            {
                                cursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28xIn1dfQ==',
                                node: dtos[0],
                            },
                            {
                                cursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28yIn1dfQ==',
                                node: dtos[1],
                            },
                        ],
                        pageInfo: {
                            startCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28xIn1dfQ==',
                            endCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28yIn1dfQ==',
                            hasNextPage: true,
                            hasPreviousPage: false,
                        },
                        totalCountFn: expect.any(Function),
                    });
                });
                it('should fetch nodes after the cursor', async () => {
                    const queryMany = jest.fn();
                    const dtos = [createTestDTO(2), createTestDTO(3), createTestDTO(4)];
                    queryMany.mockResolvedValueOnce([...dtos]);
                    const response = await getConnectionType().createFromPromise(queryMany, {
                        paging: createPage({
                            first: 2,
                            after: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28xIn1dfQ==',
                        }),
                    });
                    expect(queryMany).toHaveBeenCalledTimes(1);
                    expect(queryMany).toHaveBeenCalledWith({
                        filter: { or: [{ and: [{ stringField: { gt: 'foo1' } }] }] },
                        paging: { limit: 3 },
                        sorting: [{ field: 'stringField', direction: core_1.SortDirection.ASC }],
                    });
                    expect(response).toEqual({
                        edges: [
                            {
                                cursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28yIn1dfQ==',
                                node: dtos[0],
                            },
                            {
                                cursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28zIn1dfQ==',
                                node: dtos[1],
                            },
                        ],
                        pageInfo: {
                            startCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28yIn1dfQ==',
                            endCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28zIn1dfQ==',
                            hasNextPage: true,
                            hasPreviousPage: true,
                        },
                        totalCountFn: expect.any(Function),
                    });
                });
                describe('with additional filter', () => {
                    it('should merge the cursor filter and query filter', async () => {
                        const queryMany = jest.fn();
                        const dtos = [createTestDTO(2), createTestDTO(3), createTestDTO(4)];
                        queryMany.mockResolvedValueOnce([...dtos]);
                        const response = await getConnectionType().createFromPromise(queryMany, {
                            filter: { boolField: { is: true } },
                            paging: createPage({
                                first: 2,
                                after: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28xIn1dfQ==',
                            }),
                        });
                        expect(queryMany).toHaveBeenCalledTimes(1);
                        expect(queryMany).toHaveBeenCalledWith({
                            filter: { and: [{ or: [{ and: [{ stringField: { gt: 'foo1' } }] }] }, { boolField: { is: true } }] },
                            paging: { limit: 3 },
                            sorting: [{ field: 'stringField', direction: core_1.SortDirection.ASC }],
                        });
                        expect(response).toEqual({
                            edges: [
                                {
                                    cursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28yIn1dfQ==',
                                    node: dtos[0],
                                },
                                {
                                    cursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28zIn1dfQ==',
                                    node: dtos[1],
                                },
                            ],
                            pageInfo: {
                                startCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28yIn1dfQ==',
                                endCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28zIn1dfQ==',
                                hasNextPage: true,
                                hasPreviousPage: true,
                            },
                            totalCountFn: expect.any(Function),
                        });
                    });
                });
                describe('with additional sorting', () => {
                    it('should merge the cursor filter and query filter', async () => {
                        const queryMany = jest.fn();
                        const dtos = [createTestDTO(2), createTestDTO(3), createTestDTO(4)];
                        queryMany.mockResolvedValueOnce([...dtos]);
                        const response = await getConnectionType().createFromPromise(queryMany, {
                            filter: { boolField: { is: true } },
                            sorting: [{ field: 'boolField', direction: core_1.SortDirection.DESC }],
                            paging: createPage({
                                first: 2,
                                after: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6ImJvb2xGaWVsZCIsInZhbHVlIjpmYWxzZX0seyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28xIn1dfQ==',
                            }),
                        });
                        expect(queryMany).toHaveBeenCalledTimes(1);
                        expect(queryMany).toHaveBeenCalledWith({
                            filter: {
                                and: [
                                    {
                                        or: [
                                            { and: [{ boolField: { lt: false } }] },
                                            { and: [{ boolField: { eq: false } }, { stringField: { gt: 'foo1' } }] },
                                        ],
                                    },
                                    { boolField: { is: true } },
                                ],
                            },
                            paging: { limit: 3 },
                            sorting: [
                                { field: 'boolField', direction: core_1.SortDirection.DESC },
                                { field: 'stringField', direction: core_1.SortDirection.ASC },
                            ],
                        });
                        expect(response).toEqual({
                            edges: [
                                {
                                    cursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6ImJvb2xGaWVsZCIsInZhbHVlIjp0cnVlfSx7ImZpZWxkIjoic3RyaW5nRmllbGQiLCJ2YWx1ZSI6ImZvbzIifV19',
                                    node: dtos[0],
                                },
                                {
                                    cursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6ImJvb2xGaWVsZCIsInZhbHVlIjpmYWxzZX0seyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28zIn1dfQ==',
                                    node: dtos[1],
                                },
                            ],
                            pageInfo: {
                                startCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6ImJvb2xGaWVsZCIsInZhbHVlIjp0cnVlfSx7ImZpZWxkIjoic3RyaW5nRmllbGQiLCJ2YWx1ZSI6ImZvbzIifV19',
                                endCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6ImJvb2xGaWVsZCIsInZhbHVlIjpmYWxzZX0seyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28zIn1dfQ==',
                                hasNextPage: true,
                                hasPreviousPage: true,
                            },
                            totalCountFn: expect.any(Function),
                        });
                    });
                });
            });
            describe('with last', () => {
                it("should return hasPreviousPage false if paging backwards and we're on the first page", async () => {
                    const queryMany = jest.fn();
                    const dtos = [createTestDTO(1)];
                    queryMany.mockResolvedValueOnce([...dtos]);
                    const response = await getConnectionType().createFromPromise(queryMany, {
                        paging: createPage({
                            last: 2,
                            before: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28yIn1dfQ==',
                        }),
                    });
                    expect(queryMany).toHaveBeenCalledTimes(1);
                    expect(queryMany).toHaveBeenCalledWith({
                        filter: { or: [{ and: [{ stringField: { lt: 'foo2' } }] }] },
                        paging: { limit: 3 },
                        sorting: [{ field: 'stringField', direction: core_1.SortDirection.DESC, nulls: undefined }],
                    });
                    expect(response).toEqual({
                        edges: [
                            {
                                cursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28xIn1dfQ==',
                                node: dtos[0],
                            },
                        ],
                        pageInfo: {
                            endCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28xIn1dfQ==',
                            hasNextPage: true,
                            hasPreviousPage: false,
                            startCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28xIn1dfQ==',
                        },
                        totalCountFn: expect.any(Function),
                    });
                });
                it('should return hasPreviousPage true if paging backwards and there is an additional node', async () => {
                    const queryMany = jest.fn();
                    const dtos = [createTestDTO(1), createTestDTO(2), createTestDTO(3)];
                    queryMany.mockResolvedValueOnce([...dtos].reverse());
                    const response = await getConnectionType().createFromPromise(queryMany, {
                        paging: createPage({
                            last: 2,
                            before: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb280In1dfQ==',
                        }),
                    });
                    expect(queryMany).toHaveBeenCalledTimes(1);
                    expect(queryMany).toHaveBeenCalledWith({
                        filter: { or: [{ and: [{ stringField: { lt: 'foo4' } }] }] },
                        paging: { limit: 3 },
                        sorting: [{ field: 'stringField', direction: core_1.SortDirection.DESC, nulls: undefined }],
                    });
                    expect(response).toEqual({
                        edges: [
                            {
                                cursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28yIn1dfQ==',
                                node: dtos[1],
                            },
                            {
                                cursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28zIn1dfQ==',
                                node: dtos[2],
                            },
                        ],
                        pageInfo: {
                            startCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28yIn1dfQ==',
                            endCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28zIn1dfQ==',
                            hasNextPage: true,
                            hasPreviousPage: true,
                        },
                        totalCountFn: expect.any(Function),
                    });
                });
                describe('with additional filter', () => {
                    it('should merge the cursor filter and query filter', async () => {
                        const queryMany = jest.fn();
                        const dtos = [createTestDTO(1), createTestDTO(2), createTestDTO(3)];
                        queryMany.mockResolvedValueOnce([...dtos].reverse());
                        const response = await getConnectionType().createFromPromise(queryMany, {
                            filter: { boolField: { is: true } },
                            paging: createPage({
                                last: 2,
                                before: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb280In1dfQ==',
                            }),
                        });
                        expect(queryMany).toHaveBeenCalledTimes(1);
                        expect(queryMany).toHaveBeenCalledWith({
                            filter: { and: [{ or: [{ and: [{ stringField: { lt: 'foo4' } }] }] }, { boolField: { is: true } }] },
                            paging: { limit: 3 },
                            sorting: [{ field: 'stringField', direction: core_1.SortDirection.DESC }],
                        });
                        expect(response).toEqual({
                            edges: [
                                {
                                    cursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28yIn1dfQ==',
                                    node: dtos[1],
                                },
                                {
                                    cursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28zIn1dfQ==',
                                    node: dtos[2],
                                },
                            ],
                            pageInfo: {
                                startCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28yIn1dfQ==',
                                endCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28zIn1dfQ==',
                                hasNextPage: true,
                                hasPreviousPage: true,
                            },
                            totalCountFn: expect.any(Function),
                        });
                    });
                });
                describe('with additional sort', () => {
                    it('should merge the cursor sort', async () => {
                        const queryMany = jest.fn();
                        const dtos = [createTestDTO(1), createTestDTO(2), createTestDTO(3)];
                        queryMany.mockResolvedValueOnce([...dtos].reverse());
                        const response = await getConnectionType().createFromPromise(queryMany, {
                            filter: { boolField: { is: true } },
                            sorting: [{ field: 'boolField', direction: core_1.SortDirection.DESC }],
                            paging: createPage({
                                last: 2,
                                before: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6ImJvb2xGaWVsZCIsInZhbHVlIjp0cnVlfSx7ImZpZWxkIjoic3RyaW5nRmllbGQiLCJ2YWx1ZSI6ImZvbzQifV19',
                            }),
                        });
                        expect(queryMany).toHaveBeenCalledTimes(1);
                        expect(queryMany).toHaveBeenCalledWith({
                            filter: {
                                and: [
                                    {
                                        or: [
                                            { and: [{ boolField: { gt: true } }] },
                                            { and: [{ boolField: { eq: true } }, { stringField: { lt: 'foo4' } }] },
                                        ],
                                    },
                                    { boolField: { is: true } },
                                ],
                            },
                            paging: { limit: 3 },
                            sorting: [
                                { field: 'boolField', direction: core_1.SortDirection.ASC },
                                { field: 'stringField', direction: core_1.SortDirection.DESC },
                            ],
                        });
                        expect(response).toEqual({
                            edges: [
                                {
                                    cursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6ImJvb2xGaWVsZCIsInZhbHVlIjp0cnVlfSx7ImZpZWxkIjoic3RyaW5nRmllbGQiLCJ2YWx1ZSI6ImZvbzIifV19',
                                    node: dtos[1],
                                },
                                {
                                    cursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6ImJvb2xGaWVsZCIsInZhbHVlIjpmYWxzZX0seyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28zIn1dfQ==',
                                    node: dtos[2],
                                },
                            ],
                            pageInfo: {
                                startCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6ImJvb2xGaWVsZCIsInZhbHVlIjp0cnVlfSx7ImZpZWxkIjoic3RyaW5nRmllbGQiLCJ2YWx1ZSI6ImZvbzIifV19',
                                endCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6ImJvb2xGaWVsZCIsInZhbHVlIjpmYWxzZX0seyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28zIn1dfQ==',
                                hasNextPage: true,
                                hasPreviousPage: true,
                            },
                            totalCountFn: expect.any(Function),
                        });
                    });
                });
            });
            it('should create an empty connection', async () => {
                const queryMany = jest.fn();
                queryMany.mockResolvedValueOnce([]);
                const response = await getConnectionType().createFromPromise(queryMany, {
                    paging: createPage({ first: 2 }),
                });
                expect(queryMany).toHaveBeenCalledTimes(1);
                expect(queryMany).toHaveBeenCalledWith({
                    filter: {},
                    paging: { limit: 3 },
                    sorting: [{ field: 'stringField', direction: core_1.SortDirection.ASC, nulls: undefined }],
                });
                expect(response).toEqual({
                    edges: [],
                    pageInfo: {
                        hasNextPage: false,
                        hasPreviousPage: false,
                    },
                    totalCountFn: expect.any(Function),
                });
            });
        });
    });
});
//# sourceMappingURL=connection.type.spec.js.map