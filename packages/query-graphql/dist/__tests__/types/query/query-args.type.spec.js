"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// eslint-disable-next-line max-classes-per-file
const core_1 = require("nestjs-query/packages/core");
const nestjsGraphql = tslib_1.__importStar(require("@nestjs/graphql"));
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const src_1 = require("../../../src");
const __fixtures__1 = require("../../__fixtures__");
describe('QueryType', () => {
    const fieldSpy = jest.spyOn(nestjsGraphql, 'Field');
    afterEach(() => jest.clearAllMocks());
    let TestDto = class TestDto {
    };
    tslib_1.__decorate([
        src_1.FilterableField(() => nestjsGraphql.ID),
        tslib_1.__metadata("design:type", Number)
    ], TestDto.prototype, "idField", void 0);
    tslib_1.__decorate([
        src_1.FilterableField(() => nestjsGraphql.ID, { nullable: true }),
        tslib_1.__metadata("design:type", Number)
    ], TestDto.prototype, "idFieldOption", void 0);
    tslib_1.__decorate([
        src_1.FilterableField(),
        tslib_1.__metadata("design:type", String)
    ], TestDto.prototype, "stringField", void 0);
    tslib_1.__decorate([
        src_1.FilterableField({ nullable: true }),
        tslib_1.__metadata("design:type", String)
    ], TestDto.prototype, "stringFieldOptional", void 0);
    tslib_1.__decorate([
        src_1.FilterableField(),
        tslib_1.__metadata("design:type", Boolean)
    ], TestDto.prototype, "booleanField", void 0);
    tslib_1.__decorate([
        src_1.FilterableField({ nullable: true }),
        tslib_1.__metadata("design:type", Boolean)
    ], TestDto.prototype, "booleanFieldOptional", void 0);
    tslib_1.__decorate([
        src_1.FilterableField(),
        tslib_1.__metadata("design:type", Number)
    ], TestDto.prototype, "numberField", void 0);
    tslib_1.__decorate([
        src_1.FilterableField({ nullable: true }),
        tslib_1.__metadata("design:type", Number)
    ], TestDto.prototype, "numberFieldOptional", void 0);
    tslib_1.__decorate([
        src_1.FilterableField(() => nestjsGraphql.Float),
        tslib_1.__metadata("design:type", Number)
    ], TestDto.prototype, "floatField", void 0);
    tslib_1.__decorate([
        src_1.FilterableField(() => nestjsGraphql.Float, { nullable: true }),
        tslib_1.__metadata("design:type", Number)
    ], TestDto.prototype, "floatFieldOptional", void 0);
    tslib_1.__decorate([
        src_1.FilterableField(() => nestjsGraphql.Int),
        tslib_1.__metadata("design:type", Number)
    ], TestDto.prototype, "intField", void 0);
    tslib_1.__decorate([
        src_1.FilterableField(() => nestjsGraphql.Int, { nullable: true }),
        tslib_1.__metadata("design:type", Number)
    ], TestDto.prototype, "intFieldOptional", void 0);
    tslib_1.__decorate([
        src_1.FilterableField(() => nestjsGraphql.GraphQLTimestamp),
        tslib_1.__metadata("design:type", Date)
    ], TestDto.prototype, "timestampField", void 0);
    tslib_1.__decorate([
        src_1.FilterableField(() => nestjsGraphql.GraphQLTimestamp, { nullable: true }),
        tslib_1.__metadata("design:type", Date)
    ], TestDto.prototype, "timestampFieldOptional", void 0);
    tslib_1.__decorate([
        src_1.FilterableField(() => nestjsGraphql.GraphQLISODateTime),
        tslib_1.__metadata("design:type", Date)
    ], TestDto.prototype, "date", void 0);
    tslib_1.__decorate([
        src_1.FilterableField(() => nestjsGraphql.GraphQLISODateTime, { nullable: true }),
        tslib_1.__metadata("design:type", Date)
    ], TestDto.prototype, "dateOptional", void 0);
    TestDto = tslib_1.__decorate([
        nestjsGraphql.ObjectType('TestQuery')
    ], TestDto);
    let TestFilterRequiredDto = class TestFilterRequiredDto {
    };
    tslib_1.__decorate([
        src_1.FilterableField({ filterRequired: true }),
        tslib_1.__metadata("design:type", String)
    ], TestFilterRequiredDto.prototype, "requiredFilterableField", void 0);
    TestFilterRequiredDto = tslib_1.__decorate([
        nestjsGraphql.ObjectType()
    ], TestFilterRequiredDto);
    describe('cursor query args', () => {
        let TestCursorQuery = class TestCursorQuery extends src_1.QueryArgsType(TestDto) {
        };
        TestCursorQuery = tslib_1.__decorate([
            nestjsGraphql.ArgsType()
        ], TestCursorQuery);
        it('create a query for string fields', async () => {
            let TestResolver = class TestResolver {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                test(query) {
                    return 'hello';
                }
            };
            tslib_1.__decorate([
                nestjsGraphql.Query(() => String),
                tslib_1.__param(0, nestjsGraphql.Args()),
                tslib_1.__metadata("design:type", Function),
                tslib_1.__metadata("design:paramtypes", [TestCursorQuery]),
                tslib_1.__metadata("design:returntype", String)
            ], TestResolver.prototype, "test", null);
            TestResolver = tslib_1.__decorate([
                nestjsGraphql.Resolver()
            ], TestResolver);
            return __fixtures__1.expectSDL([TestResolver], __fixtures__1.cursorQueryArgsTypeSDL);
        });
        it('should paging to the correct instance of paging', () => {
            const queryObj = {
                paging: {
                    first: 10,
                    after: 'YXJyYXljb25uZWN0aW9uOjEw',
                },
            };
            const queryInstance = class_transformer_1.plainToClass(TestCursorQuery, queryObj);
            expect(class_validator_1.validateSync(queryInstance)).toEqual([]);
            expect(queryInstance.paging).toBeInstanceOf(TestCursorQuery.PageType);
        });
        it('should sorting to the correct instance of sorting', () => {
            const queryObj = {
                sorting: [{ field: 'stringField', direction: core_1.SortDirection.ASC, nulls: core_1.SortNulls.NULLS_LAST }],
            };
            const queryInstance = class_transformer_1.plainToClass(TestCursorQuery, queryObj);
            expect(class_validator_1.validateSync(queryInstance)).toEqual([]);
            expect(queryInstance.sorting[0]).toBeInstanceOf(TestCursorQuery.SortType);
        });
        it('should make filter to the correct instance of sorting', () => {
            const queryObj = {
                filter: {
                    stringField: { eq: 'foo' },
                },
            };
            const queryInstance = class_transformer_1.plainToClass(TestCursorQuery, queryObj);
            expect(class_validator_1.validateSync(queryInstance)).toEqual([]);
            expect(queryInstance.filter).toBeInstanceOf(TestCursorQuery.FilterType);
        });
        it('should make the filter required if there is a filterRequired field', () => {
            let TestFilterRequiredQuery = class TestFilterRequiredQuery extends src_1.QueryArgsType(TestFilterRequiredDto) {
            };
            TestFilterRequiredQuery = tslib_1.__decorate([
                nestjsGraphql.ArgsType()
            ], TestFilterRequiredQuery);
            let TestResolver = class TestResolver {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                test(query) {
                    return 'hello';
                }
            };
            tslib_1.__decorate([
                nestjsGraphql.Query(() => String),
                tslib_1.__param(0, nestjsGraphql.Args()),
                tslib_1.__metadata("design:type", Function),
                tslib_1.__metadata("design:paramtypes", [TestFilterRequiredQuery]),
                tslib_1.__metadata("design:returntype", String)
            ], TestResolver.prototype, "test", null);
            TestResolver = tslib_1.__decorate([
                nestjsGraphql.Resolver()
            ], TestResolver);
            return __fixtures__1.expectSDL([TestResolver], __fixtures__1.cursorQueryArgsFilterRequiredTypeSDL);
        });
        describe('options', () => {
            it('by default first should be set to 10 in the paging object', () => {
                src_1.QueryArgsType(TestDto);
                expect(fieldSpy).toHaveBeenCalledWith(expect.any(Function), {
                    defaultValue: { first: 10 },
                    description: 'Limit or page results.',
                });
                expect(fieldSpy).toHaveBeenCalledWith(expect.any(Function), {
                    defaultValue: {},
                    description: 'Specify to filter the records returned.',
                    nullable: false,
                });
                expect(fieldSpy).toHaveBeenCalledWith(expect.any(Function), {
                    defaultValue: [],
                    description: 'Specify to sort results.',
                });
            });
            it('allow specifying a defaultResultSize', () => {
                src_1.QueryArgsType(TestDto, { pagingStrategy: src_1.PagingStrategies.CURSOR, defaultResultSize: 2 });
                expect(fieldSpy).toHaveBeenCalledWith(expect.any(Function), {
                    defaultValue: { first: 2 },
                    description: 'Limit or page results.',
                });
                expect(fieldSpy).toHaveBeenCalledWith(expect.any(Function), {
                    defaultValue: {},
                    description: 'Specify to filter the records returned.',
                    nullable: false,
                });
                expect(fieldSpy).toHaveBeenCalledWith(expect.any(Function), {
                    defaultValue: [],
                    description: 'Specify to sort results.',
                });
            });
            it('allow validate a maxResultsSize for paging.first', () => {
                const queryObj = {
                    paging: { first: 10 },
                };
                const QT = src_1.QueryArgsType(TestDto, { maxResultsSize: 5 });
                const queryInstance = class_transformer_1.plainToClass(QT, queryObj);
                expect(class_validator_1.validateSync(queryInstance)).toEqual([
                    {
                        children: [],
                        constraints: {
                            PropertyMax: 'Field paging.first max allowed value is `5`.',
                        },
                        property: 'paging',
                        target: queryObj,
                        value: queryObj.paging,
                    },
                ]);
            });
            it('allow validate a maxResultsSize for paging.last', () => {
                const queryObj = {
                    paging: { last: 10, before: 'abc' },
                };
                const QT = src_1.QueryArgsType(TestDto, { maxResultsSize: 5 });
                const queryInstance = class_transformer_1.plainToClass(QT, queryObj);
                expect(class_validator_1.validateSync(queryInstance)).toEqual([
                    {
                        children: [],
                        constraints: {
                            PropertyMax: 'Field paging.last max allowed value is `5`.',
                        },
                        property: 'paging',
                        target: queryObj,
                        value: queryObj.paging,
                    },
                ]);
            });
            it('allow specifying a default filter', () => {
                const filter = { booleanField: { is: true } };
                src_1.QueryArgsType(TestDto, { defaultFilter: filter });
                expect(fieldSpy).toHaveBeenNthCalledWith(1, expect.any(Function), {
                    defaultValue: { first: 10 },
                    description: 'Limit or page results.',
                });
                expect(fieldSpy).toHaveBeenCalledWith(expect.any(Function), {
                    defaultValue: filter,
                    description: 'Specify to filter the records returned.',
                    nullable: false,
                });
                expect(fieldSpy).toHaveBeenCalledWith(expect.any(Function), {
                    defaultValue: [],
                    description: 'Specify to sort results.',
                });
            });
            it('allow specifying a default sort', () => {
                const sort = [{ field: 'booleanField', direction: core_1.SortDirection.DESC }];
                src_1.QueryArgsType(TestDto, { defaultSort: sort });
                expect(fieldSpy).toHaveBeenNthCalledWith(1, expect.any(Function), {
                    defaultValue: { first: 10 },
                    description: 'Limit or page results.',
                });
                expect(fieldSpy).toHaveBeenCalledWith(expect.any(Function), {
                    defaultValue: {},
                    description: 'Specify to filter the records returned.',
                    nullable: false,
                });
                expect(fieldSpy).toHaveBeenCalledWith(expect.any(Function), {
                    defaultValue: sort,
                    description: 'Specify to sort results.',
                });
            });
        });
    });
    describe('offset query args', () => {
        let TestOffsetQuery = class TestOffsetQuery extends src_1.QueryArgsType(TestDto, { pagingStrategy: src_1.PagingStrategies.OFFSET }) {
        };
        TestOffsetQuery = tslib_1.__decorate([
            nestjsGraphql.ArgsType()
        ], TestOffsetQuery);
        it('create a query for string fields', async () => {
            let TestResolver = class TestResolver {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                test(query) {
                    return 'hello';
                }
            };
            tslib_1.__decorate([
                nestjsGraphql.Query(() => String),
                tslib_1.__param(0, nestjsGraphql.Args()),
                tslib_1.__metadata("design:type", Function),
                tslib_1.__metadata("design:paramtypes", [TestOffsetQuery]),
                tslib_1.__metadata("design:returntype", String)
            ], TestResolver.prototype, "test", null);
            TestResolver = tslib_1.__decorate([
                nestjsGraphql.Resolver()
            ], TestResolver);
            return __fixtures__1.expectSDL([TestResolver], __fixtures__1.offsetQueryArgsTypeSDL);
        });
        it('should paging to the correct instance of paging', () => {
            const queryObj = {
                paging: {
                    limit: 10,
                    offset: 2,
                },
            };
            const queryInstance = class_transformer_1.plainToClass(TestOffsetQuery, queryObj);
            expect(class_validator_1.validateSync(queryInstance)).toEqual([]);
            expect(queryInstance.paging).toBeInstanceOf(TestOffsetQuery.PageType);
        });
        it('should sorting to the correct instance of sorting', () => {
            const queryObj = {
                sorting: [{ field: 'stringField', direction: core_1.SortDirection.ASC, nulls: core_1.SortNulls.NULLS_LAST }],
            };
            const queryInstance = class_transformer_1.plainToClass(TestOffsetQuery, queryObj);
            expect(class_validator_1.validateSync(queryInstance)).toEqual([]);
            expect(queryInstance.sorting[0]).toBeInstanceOf(TestOffsetQuery.SortType);
        });
        it('should make filter to the correct instance of sorting', () => {
            const queryObj = {
                filter: {
                    stringField: { eq: 'foo' },
                },
            };
            const queryInstance = class_transformer_1.plainToClass(TestOffsetQuery, queryObj);
            expect(class_validator_1.validateSync(queryInstance)).toEqual([]);
            expect(queryInstance.filter).toBeInstanceOf(TestOffsetQuery.FilterType);
        });
        it('should make the filter required if there is a filterRequired field', () => {
            let TestFilterRequiredQuery = class TestFilterRequiredQuery extends src_1.QueryArgsType(TestFilterRequiredDto, {
                pagingStrategy: src_1.PagingStrategies.OFFSET,
            }) {
            };
            TestFilterRequiredQuery = tslib_1.__decorate([
                nestjsGraphql.ArgsType()
            ], TestFilterRequiredQuery);
            let TestResolver = class TestResolver {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                test(query) {
                    return 'hello';
                }
            };
            tslib_1.__decorate([
                nestjsGraphql.Query(() => String),
                tslib_1.__param(0, nestjsGraphql.Args()),
                tslib_1.__metadata("design:type", Function),
                tslib_1.__metadata("design:paramtypes", [TestFilterRequiredQuery]),
                tslib_1.__metadata("design:returntype", String)
            ], TestResolver.prototype, "test", null);
            TestResolver = tslib_1.__decorate([
                nestjsGraphql.Resolver()
            ], TestResolver);
            return __fixtures__1.expectSDL([TestResolver], __fixtures__1.offsetQueryArgsFilterRequiredTypeSDL);
        });
        describe('options', () => {
            it('by default limit should be set to 10 in the paging object', () => {
                src_1.QueryArgsType(TestDto, { pagingStrategy: src_1.PagingStrategies.OFFSET });
                expect(fieldSpy).toHaveBeenCalledWith(expect.any(Function), {
                    defaultValue: { limit: 10 },
                    description: 'Limit or page results.',
                });
                expect(fieldSpy).toHaveBeenCalledWith(expect.any(Function), {
                    defaultValue: {},
                    description: 'Specify to filter the records returned.',
                    nullable: false,
                });
                expect(fieldSpy).toHaveBeenCalledWith(expect.any(Function), {
                    defaultValue: [],
                    description: 'Specify to sort results.',
                });
            });
            it('allow specifying a defaultResultSize', () => {
                src_1.QueryArgsType(TestDto, { pagingStrategy: src_1.PagingStrategies.OFFSET, defaultResultSize: 2 });
                expect(fieldSpy).toHaveBeenCalledWith(expect.any(Function), {
                    defaultValue: { limit: 2 },
                    description: 'Limit or page results.',
                });
                expect(fieldSpy).toHaveBeenCalledWith(expect.any(Function), {
                    defaultValue: {},
                    description: 'Specify to filter the records returned.',
                    nullable: false,
                });
                expect(fieldSpy).toHaveBeenCalledWith(expect.any(Function), {
                    defaultValue: [],
                    description: 'Specify to sort results.',
                });
            });
            it('validate a maxResultsSize for paging.limit', () => {
                const queryObj = {
                    paging: { limit: 10 },
                };
                const QT = src_1.QueryArgsType(TestDto, { pagingStrategy: src_1.PagingStrategies.OFFSET, maxResultsSize: 5 });
                const queryInstance = class_transformer_1.plainToClass(QT, queryObj);
                expect(class_validator_1.validateSync(queryInstance)).toEqual([
                    {
                        children: [],
                        constraints: {
                            PropertyMax: 'Field paging.limit max allowed value is `5`.',
                        },
                        property: 'paging',
                        target: queryObj,
                        value: queryObj.paging,
                    },
                ]);
            });
            it('allow specifying a default filter', () => {
                const filter = { booleanField: { is: true } };
                src_1.QueryArgsType(TestDto, { pagingStrategy: src_1.PagingStrategies.OFFSET, defaultFilter: filter });
                expect(fieldSpy).toHaveBeenNthCalledWith(1, expect.any(Function), {
                    defaultValue: { limit: 10 },
                    description: 'Limit or page results.',
                });
                expect(fieldSpy).toHaveBeenCalledWith(expect.any(Function), {
                    defaultValue: filter,
                    description: 'Specify to filter the records returned.',
                    nullable: false,
                });
                expect(fieldSpy).toHaveBeenCalledWith(expect.any(Function), {
                    defaultValue: [],
                    description: 'Specify to sort results.',
                });
            });
            it('allow specifying a default sort', () => {
                const sort = [{ field: 'booleanField', direction: core_1.SortDirection.DESC }];
                src_1.QueryArgsType(TestDto, { pagingStrategy: src_1.PagingStrategies.OFFSET, defaultSort: sort });
                expect(fieldSpy).toHaveBeenNthCalledWith(1, expect.any(Function), {
                    defaultValue: { limit: 10 },
                    description: 'Limit or page results.',
                });
                expect(fieldSpy).toHaveBeenCalledWith(expect.any(Function), {
                    defaultValue: {},
                    description: 'Specify to filter the records returned.',
                    nullable: false,
                });
                expect(fieldSpy).toHaveBeenCalledWith(expect.any(Function), {
                    defaultValue: sort,
                    description: 'Specify to sort results.',
                });
            });
        });
    });
    describe('no paging query args', () => {
        let TestNoPagingQuery = class TestNoPagingQuery extends src_1.QueryArgsType(TestDto, { pagingStrategy: src_1.PagingStrategies.NONE }) {
        };
        TestNoPagingQuery = tslib_1.__decorate([
            nestjsGraphql.ArgsType()
        ], TestNoPagingQuery);
        it('create a query for string fields', async () => {
            let TestResolver = class TestResolver {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                test(query) {
                    return 'hello';
                }
            };
            tslib_1.__decorate([
                nestjsGraphql.Query(() => String),
                tslib_1.__param(0, nestjsGraphql.Args()),
                tslib_1.__metadata("design:type", Function),
                tslib_1.__metadata("design:paramtypes", [TestNoPagingQuery]),
                tslib_1.__metadata("design:returntype", String)
            ], TestResolver.prototype, "test", null);
            TestResolver = tslib_1.__decorate([
                nestjsGraphql.Resolver()
            ], TestResolver);
            return __fixtures__1.expectSDL([TestResolver], __fixtures__1.noPagingQueryArgsTypeSDL);
        });
        it('should sorting to the correct instance of sorting', () => {
            const queryObj = {
                sorting: [{ field: 'stringField', direction: core_1.SortDirection.ASC, nulls: core_1.SortNulls.NULLS_LAST }],
            };
            const queryInstance = class_transformer_1.plainToClass(TestNoPagingQuery, queryObj);
            expect(class_validator_1.validateSync(queryInstance)).toEqual([]);
            expect(queryInstance.sorting[0]).toBeInstanceOf(TestNoPagingQuery.SortType);
        });
        it('should make filter to the correct instance of sorting', () => {
            const queryObj = {
                filter: {
                    stringField: { eq: 'foo' },
                },
            };
            const queryInstance = class_transformer_1.plainToClass(TestNoPagingQuery, queryObj);
            expect(class_validator_1.validateSync(queryInstance)).toEqual([]);
            expect(queryInstance.filter).toBeInstanceOf(TestNoPagingQuery.FilterType);
        });
        it('should make the filter required if there is a filterRequired field', () => {
            let TestFilterRequiredQuery = class TestFilterRequiredQuery extends src_1.QueryArgsType(TestFilterRequiredDto, {
                pagingStrategy: src_1.PagingStrategies.NONE,
            }) {
            };
            TestFilterRequiredQuery = tslib_1.__decorate([
                nestjsGraphql.ArgsType()
            ], TestFilterRequiredQuery);
            let TestResolver = class TestResolver {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                test(query) {
                    return 'hello';
                }
            };
            tslib_1.__decorate([
                nestjsGraphql.Query(() => String),
                tslib_1.__param(0, nestjsGraphql.Args()),
                tslib_1.__metadata("design:type", Function),
                tslib_1.__metadata("design:paramtypes", [TestFilterRequiredQuery]),
                tslib_1.__metadata("design:returntype", String)
            ], TestResolver.prototype, "test", null);
            TestResolver = tslib_1.__decorate([
                nestjsGraphql.Resolver()
            ], TestResolver);
            return __fixtures__1.expectSDL([TestResolver], __fixtures__1.noPagingQueryArgsFilterRequiredTypeSDL);
        });
        describe('options', () => {
            it('allow specifying a default filter', () => {
                const filter = { booleanField: { is: true } };
                src_1.QueryArgsType(TestDto, { pagingStrategy: src_1.PagingStrategies.NONE, defaultFilter: filter });
                expect(fieldSpy).toHaveBeenCalledWith(expect.any(Function), {
                    defaultValue: filter,
                    description: 'Specify to filter the records returned.',
                    nullable: false,
                });
                expect(fieldSpy).toHaveBeenCalledWith(expect.any(Function), {
                    defaultValue: [],
                    description: 'Specify to sort results.',
                });
            });
            it('allow specifying a default sort', () => {
                const sort = [{ field: 'booleanField', direction: core_1.SortDirection.DESC }];
                src_1.QueryArgsType(TestDto, { pagingStrategy: src_1.PagingStrategies.NONE, defaultSort: sort });
                expect(fieldSpy).toHaveBeenCalledWith(expect.any(Function), {
                    defaultValue: {},
                    description: 'Specify to filter the records returned.',
                    nullable: false,
                });
                expect(fieldSpy).toHaveBeenCalledWith(expect.any(Function), {
                    defaultValue: sort,
                    description: 'Specify to sort results.',
                });
            });
        });
    });
});
//# sourceMappingURL=query-args.type.spec.js.map