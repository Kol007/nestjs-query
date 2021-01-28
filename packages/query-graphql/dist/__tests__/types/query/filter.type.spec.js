"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const graphql_1 = require("@nestjs/graphql");
const src_1 = require("../../../src");
const __fixtures__1 = require("../../__fixtures__");
describe('filter types', () => {
    let NumberEnum;
    (function (NumberEnum) {
        NumberEnum[NumberEnum["ONE"] = 0] = "ONE";
        NumberEnum[NumberEnum["TWO"] = 1] = "TWO";
        NumberEnum[NumberEnum["THREE"] = 2] = "THREE";
        NumberEnum[NumberEnum["FOUR"] = 3] = "FOUR";
    })(NumberEnum || (NumberEnum = {}));
    let StringEnum;
    (function (StringEnum) {
        StringEnum["ONE_STR"] = "one";
        StringEnum["TWO_STR"] = "two";
        StringEnum["THREE_STR"] = "three";
        StringEnum["FOUR_STR"] = "four";
    })(StringEnum || (StringEnum = {}));
    graphql_1.registerEnumType(StringEnum, {
        name: 'StringEnum',
    });
    graphql_1.registerEnumType(NumberEnum, {
        name: 'NumberEnum',
    });
    let BaseType = class BaseType {
    };
    tslib_1.__decorate([
        src_1.FilterableField(),
        tslib_1.__metadata("design:type", Number)
    ], BaseType.prototype, "id", void 0);
    BaseType = tslib_1.__decorate([
        graphql_1.ObjectType({ isAbstract: true })
    ], BaseType);
    let TestRelation = class TestRelation extends BaseType {
    };
    tslib_1.__decorate([
        src_1.FilterableField(),
        tslib_1.__metadata("design:type", String)
    ], TestRelation.prototype, "relationName", void 0);
    tslib_1.__decorate([
        src_1.FilterableField(),
        tslib_1.__metadata("design:type", Number)
    ], TestRelation.prototype, "relationAge", void 0);
    TestRelation = tslib_1.__decorate([
        graphql_1.ObjectType('TestRelationDto')
    ], TestRelation);
    let TestDto = class TestDto extends BaseType {
    };
    tslib_1.__decorate([
        src_1.FilterableField(),
        tslib_1.__metadata("design:type", Boolean)
    ], TestDto.prototype, "boolField", void 0);
    tslib_1.__decorate([
        src_1.FilterableField(),
        tslib_1.__metadata("design:type", Date)
    ], TestDto.prototype, "dateField", void 0);
    tslib_1.__decorate([
        src_1.FilterableField(() => graphql_1.Float),
        tslib_1.__metadata("design:type", Number)
    ], TestDto.prototype, "floatField", void 0);
    tslib_1.__decorate([
        src_1.FilterableField(() => graphql_1.Int),
        tslib_1.__metadata("design:type", Number)
    ], TestDto.prototype, "intField", void 0);
    tslib_1.__decorate([
        src_1.FilterableField(),
        tslib_1.__metadata("design:type", Number)
    ], TestDto.prototype, "numberField", void 0);
    tslib_1.__decorate([
        src_1.FilterableField(),
        tslib_1.__metadata("design:type", String)
    ], TestDto.prototype, "stringField", void 0);
    tslib_1.__decorate([
        src_1.FilterableField(() => StringEnum),
        tslib_1.__metadata("design:type", String)
    ], TestDto.prototype, "stringEnumField", void 0);
    tslib_1.__decorate([
        src_1.FilterableField(() => NumberEnum),
        tslib_1.__metadata("design:type", Number)
    ], TestDto.prototype, "numberEnumField", void 0);
    tslib_1.__decorate([
        src_1.FilterableField(() => graphql_1.GraphQLTimestamp),
        tslib_1.__metadata("design:type", Date)
    ], TestDto.prototype, "timestampField", void 0);
    tslib_1.__decorate([
        graphql_1.Field(),
        tslib_1.__metadata("design:type", Number)
    ], TestDto.prototype, "nonFilterField", void 0);
    TestDto = tslib_1.__decorate([
        graphql_1.ObjectType('TestFilterDto'),
        src_1.Relation('unfilterableRelation', () => TestRelation),
        src_1.FilterableRelation('filterableRelation', () => TestRelation),
        src_1.FilterableRelation('filterableRelations', () => [TestRelation]),
        src_1.Connection('unfilterableConnection', () => TestRelation),
        src_1.FilterableConnection('filterableConnection', () => TestRelation)
    ], TestDto);
    describe('FilterType', () => {
        const TestGraphQLFilter = src_1.FilterType(TestDto);
        let TestDtoFilter = class TestDtoFilter extends TestGraphQLFilter {
        };
        TestDtoFilter = tslib_1.__decorate([
            graphql_1.InputType()
        ], TestDtoFilter);
        it('should throw an error if the class is not annotated with @ObjectType', () => {
            class TestInvalidFilter {
            }
            expect(() => src_1.FilterType(TestInvalidFilter)).toThrow('No fields found to create FilterType. Ensure TestInvalidFilter is annotated with @nestjs/graphql @ObjectType');
        });
        it('should create the correct filter graphql schema', () => {
            let FilterTypeSpec = class FilterTypeSpec {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                test(input) {
                    return 1;
                }
            };
            tslib_1.__decorate([
                graphql_1.Query(() => graphql_1.Int),
                tslib_1.__param(0, graphql_1.Args('input')),
                tslib_1.__metadata("design:type", Function),
                tslib_1.__metadata("design:paramtypes", [TestDtoFilter]),
                tslib_1.__metadata("design:returntype", Number)
            ], FilterTypeSpec.prototype, "test", null);
            FilterTypeSpec = tslib_1.__decorate([
                graphql_1.Resolver()
            ], FilterTypeSpec);
            return __fixtures__1.expectSDL([FilterTypeSpec], __fixtures__1.filterInputTypeSDL);
        });
        it('should throw an error if no fields are found', () => {
            let TestInvalidFilter = class TestInvalidFilter {
            };
            TestInvalidFilter = tslib_1.__decorate([
                graphql_1.ObjectType('TestNoFields')
            ], TestInvalidFilter);
            expect(() => src_1.FilterType(TestInvalidFilter)).toThrow('No fields found to create GraphQLFilter for TestInvalidFilter');
        });
        it('should throw an error when the field type is unknown', () => {
            let EnumField;
            (function (EnumField) {
                EnumField["ONE"] = "one";
            })(EnumField || (EnumField = {}));
            let TestInvalidFilter = class TestInvalidFilter {
            };
            tslib_1.__decorate([
                src_1.FilterableField(() => EnumField),
                tslib_1.__metadata("design:type", String)
            ], TestInvalidFilter.prototype, "fakeType", void 0);
            TestInvalidFilter = tslib_1.__decorate([
                graphql_1.ObjectType('TestBadField')
            ], TestInvalidFilter);
            expect(() => src_1.FilterType(TestInvalidFilter)).toThrow('Unable to create filter comparison for {"ONE":"one"}.');
        });
        it('should convert and filters to filter class', () => {
            const filterObject = {
                and: [{ stringField: { eq: 'foo' } }],
            };
            const filterInstance = class_transformer_1.plainToClass(TestDtoFilter, filterObject);
            expect(filterInstance.and[0]).toBeInstanceOf(TestGraphQLFilter);
        });
        it('should convert or filters to filter class', () => {
            const filterObject = {
                or: [{ stringField: { eq: 'foo' } }],
            };
            const filterInstance = class_transformer_1.plainToClass(TestDtoFilter, filterObject);
            expect(filterInstance.or[0]).toBeInstanceOf(TestGraphQLFilter);
        });
        describe('allowedComparisons option', () => {
            let TestAllowedComparisonsDto = class TestAllowedComparisonsDto extends BaseType {
            };
            tslib_1.__decorate([
                src_1.FilterableField({ allowedComparisons: ['is'] }),
                tslib_1.__metadata("design:type", Boolean)
            ], TestAllowedComparisonsDto.prototype, "boolField", void 0);
            tslib_1.__decorate([
                src_1.FilterableField({ allowedComparisons: ['eq', 'neq'] }),
                tslib_1.__metadata("design:type", Date)
            ], TestAllowedComparisonsDto.prototype, "dateField", void 0);
            tslib_1.__decorate([
                src_1.FilterableField(() => graphql_1.Float, { allowedComparisons: ['gt', 'gte'] }),
                tslib_1.__metadata("design:type", Number)
            ], TestAllowedComparisonsDto.prototype, "floatField", void 0);
            tslib_1.__decorate([
                src_1.FilterableField(() => graphql_1.Int, { allowedComparisons: ['lt', 'lte'] }),
                tslib_1.__metadata("design:type", Number)
            ], TestAllowedComparisonsDto.prototype, "intField", void 0);
            tslib_1.__decorate([
                src_1.FilterableField({ allowedComparisons: ['eq', 'neq', 'gt', 'gte', 'lt', 'lte'] }),
                tslib_1.__metadata("design:type", Number)
            ], TestAllowedComparisonsDto.prototype, "numberField", void 0);
            tslib_1.__decorate([
                src_1.FilterableField({ allowedComparisons: ['like', 'notLike'] }),
                tslib_1.__metadata("design:type", String)
            ], TestAllowedComparisonsDto.prototype, "stringField", void 0);
            TestAllowedComparisonsDto = tslib_1.__decorate([
                graphql_1.ObjectType('TestAllowedComparison')
            ], TestAllowedComparisonsDto);
            const TestGraphQLComparisonFilter = src_1.FilterType(TestAllowedComparisonsDto);
            let TestComparisonDtoFilter = class TestComparisonDtoFilter extends TestGraphQLComparisonFilter {
            };
            TestComparisonDtoFilter = tslib_1.__decorate([
                graphql_1.InputType()
            ], TestComparisonDtoFilter);
            it('should only expose allowed comparisons', () => {
                let FilterTypeSpec = class FilterTypeSpec {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    test(input) {
                        return 1;
                    }
                };
                tslib_1.__decorate([
                    graphql_1.Query(() => graphql_1.Int),
                    tslib_1.__param(0, graphql_1.Args('input')),
                    tslib_1.__metadata("design:type", Function),
                    tslib_1.__metadata("design:paramtypes", [TestComparisonDtoFilter]),
                    tslib_1.__metadata("design:returntype", Number)
                ], FilterTypeSpec.prototype, "test", null);
                FilterTypeSpec = tslib_1.__decorate([
                    graphql_1.Resolver()
                ], FilterTypeSpec);
                return __fixtures__1.expectSDL([FilterTypeSpec], __fixtures__1.filterAllowedComparisonsInputTypeSDL);
            });
        });
        describe('filterRequired option', () => {
            let TestFilterRequiredDto = class TestFilterRequiredDto extends BaseType {
            };
            tslib_1.__decorate([
                src_1.FilterableField({ filterRequired: true }),
                tslib_1.__metadata("design:type", Boolean)
            ], TestFilterRequiredDto.prototype, "requiredField", void 0);
            tslib_1.__decorate([
                src_1.FilterableField({ filterRequired: false }),
                tslib_1.__metadata("design:type", Date)
            ], TestFilterRequiredDto.prototype, "nonRequiredField", void 0);
            tslib_1.__decorate([
                src_1.FilterableField(),
                tslib_1.__metadata("design:type", Number)
            ], TestFilterRequiredDto.prototype, "notSpecifiedField", void 0);
            TestFilterRequiredDto = tslib_1.__decorate([
                graphql_1.ObjectType('TestFilterRequiredComparison')
            ], TestFilterRequiredDto);
            const TestGraphQLComparisonFilter = src_1.FilterType(TestFilterRequiredDto);
            let TestComparisonDtoFilter = class TestComparisonDtoFilter extends TestGraphQLComparisonFilter {
            };
            TestComparisonDtoFilter = tslib_1.__decorate([
                graphql_1.InputType()
            ], TestComparisonDtoFilter);
            it('should only expose allowed comparisons', () => {
                let FilterTypeSpec = class FilterTypeSpec {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    test(input) {
                        return 1;
                    }
                };
                tslib_1.__decorate([
                    graphql_1.Query(() => graphql_1.Int),
                    tslib_1.__param(0, graphql_1.Args('input')),
                    tslib_1.__metadata("design:type", Function),
                    tslib_1.__metadata("design:paramtypes", [TestComparisonDtoFilter]),
                    tslib_1.__metadata("design:returntype", Number)
                ], FilterTypeSpec.prototype, "test", null);
                FilterTypeSpec = tslib_1.__decorate([
                    graphql_1.Resolver()
                ], FilterTypeSpec);
                return __fixtures__1.expectSDL([FilterTypeSpec], __fixtures__1.filterRequiredFieldInputTypeSDL);
            });
        });
    });
    describe('UpdateFilterType', () => {
        const TestGraphQLFilter = src_1.UpdateFilterType(TestDto);
        let TestDtoFilter = class TestDtoFilter extends TestGraphQLFilter {
        };
        TestDtoFilter = tslib_1.__decorate([
            graphql_1.InputType()
        ], TestDtoFilter);
        it('should throw an error if the class is not annotated with @ObjectType', () => {
            class TestInvalidFilter {
            }
            expect(() => src_1.UpdateFilterType(TestInvalidFilter)).toThrow('No fields found to create FilterType. Ensure TestInvalidFilter is annotated with @nestjs/graphql @ObjectType');
        });
        it('should create the correct filter graphql schema', () => {
            let FilterTypeSpec = class FilterTypeSpec {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                test(input) {
                    return 1;
                }
            };
            tslib_1.__decorate([
                graphql_1.Query(() => graphql_1.Int),
                tslib_1.__param(0, graphql_1.Args('input')),
                tslib_1.__metadata("design:type", Function),
                tslib_1.__metadata("design:paramtypes", [TestDtoFilter]),
                tslib_1.__metadata("design:returntype", Number)
            ], FilterTypeSpec.prototype, "test", null);
            FilterTypeSpec = tslib_1.__decorate([
                graphql_1.Resolver()
            ], FilterTypeSpec);
            return __fixtures__1.expectSDL([FilterTypeSpec], __fixtures__1.updateFilterInputTypeSDL);
        });
        it('should throw an error if no fields are found', () => {
            let TestInvalidFilter = class TestInvalidFilter {
            };
            TestInvalidFilter = tslib_1.__decorate([
                graphql_1.ObjectType('TestNoFields')
            ], TestInvalidFilter);
            expect(() => src_1.UpdateFilterType(TestInvalidFilter)).toThrow('No fields found to create GraphQLFilter for TestInvalidFilter');
        });
        it('should throw an error when the field type is unknown', () => {
            let EnumField;
            (function (EnumField) {
                EnumField["ONE"] = "one";
            })(EnumField || (EnumField = {}));
            let TestInvalidFilter = class TestInvalidFilter {
            };
            tslib_1.__decorate([
                src_1.FilterableField(() => EnumField),
                tslib_1.__metadata("design:type", String)
            ], TestInvalidFilter.prototype, "fakeType", void 0);
            TestInvalidFilter = tslib_1.__decorate([
                graphql_1.ObjectType('TestBadField')
            ], TestInvalidFilter);
            expect(() => src_1.UpdateFilterType(TestInvalidFilter)).toThrow('Unable to create filter comparison for {"ONE":"one"}.');
        });
        it('should convert and filters to filter class', () => {
            const filterObject = {
                and: [{ stringField: { eq: 'foo' } }],
            };
            const filterInstance = class_transformer_1.plainToClass(TestDtoFilter, filterObject);
            expect(filterInstance.and[0]).toBeInstanceOf(TestGraphQLFilter);
        });
        it('should convert or filters to filter class', () => {
            const filterObject = {
                or: [{ stringField: { eq: 'foo' } }],
            };
            const filterInstance = class_transformer_1.plainToClass(TestDtoFilter, filterObject);
            expect(filterInstance.or[0]).toBeInstanceOf(TestGraphQLFilter);
        });
    });
    describe('DeleteFilterType', () => {
        const TestGraphQLFilter = src_1.DeleteFilterType(TestDto);
        let TestDtoFilter = class TestDtoFilter extends TestGraphQLFilter {
        };
        TestDtoFilter = tslib_1.__decorate([
            graphql_1.InputType()
        ], TestDtoFilter);
        it('should throw an error if the class is not annotated with @ObjectType', () => {
            class TestInvalidFilter {
            }
            expect(() => src_1.DeleteFilterType(TestInvalidFilter)).toThrow('No fields found to create FilterType. Ensure TestInvalidFilter is annotated with @nestjs/graphql @ObjectType');
        });
        it('should create the correct filter graphql schema', () => {
            let FilterTypeSpec = class FilterTypeSpec {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                test(input) {
                    return 1;
                }
            };
            tslib_1.__decorate([
                graphql_1.Query(() => graphql_1.Int),
                tslib_1.__param(0, graphql_1.Args('input')),
                tslib_1.__metadata("design:type", Function),
                tslib_1.__metadata("design:paramtypes", [TestDtoFilter]),
                tslib_1.__metadata("design:returntype", Number)
            ], FilterTypeSpec.prototype, "test", null);
            FilterTypeSpec = tslib_1.__decorate([
                graphql_1.Resolver()
            ], FilterTypeSpec);
            return __fixtures__1.expectSDL([FilterTypeSpec], __fixtures__1.deleteFilterInputTypeSDL);
        });
        it('should throw an error if no fields are found', () => {
            let TestInvalidFilter = class TestInvalidFilter {
            };
            TestInvalidFilter = tslib_1.__decorate([
                graphql_1.ObjectType('TestNoFields')
            ], TestInvalidFilter);
            expect(() => src_1.DeleteFilterType(TestInvalidFilter)).toThrow('No fields found to create GraphQLFilter for TestInvalidFilter');
        });
        it('should throw an error when the field type is unknown', () => {
            let EnumField;
            (function (EnumField) {
                EnumField["ONE"] = "one";
            })(EnumField || (EnumField = {}));
            let TestInvalidFilter = class TestInvalidFilter {
            };
            tslib_1.__decorate([
                src_1.FilterableField(() => EnumField),
                tslib_1.__metadata("design:type", String)
            ], TestInvalidFilter.prototype, "fakeType", void 0);
            TestInvalidFilter = tslib_1.__decorate([
                graphql_1.ObjectType('TestBadField')
            ], TestInvalidFilter);
            expect(() => src_1.DeleteFilterType(TestInvalidFilter)).toThrow('Unable to create filter comparison for {"ONE":"one"}.');
        });
        it('should convert and filters to filter class', () => {
            const filterObject = {
                and: [{ stringField: { eq: 'foo' } }],
            };
            const filterInstance = class_transformer_1.plainToClass(TestDtoFilter, filterObject);
            expect(filterInstance.and[0]).toBeInstanceOf(TestGraphQLFilter);
        });
        it('should convert or filters to filter class', () => {
            const filterObject = {
                or: [{ stringField: { eq: 'foo' } }],
            };
            const filterInstance = class_transformer_1.plainToClass(TestDtoFilter, filterObject);
            expect(filterInstance.or[0]).toBeInstanceOf(TestGraphQLFilter);
        });
    });
    describe('SubscriptionFilterType', () => {
        const TestGraphQLFilter = src_1.SubscriptionFilterType(TestDto);
        let TestDtoFilter = class TestDtoFilter extends TestGraphQLFilter {
        };
        TestDtoFilter = tslib_1.__decorate([
            graphql_1.InputType()
        ], TestDtoFilter);
        it('should throw an error if the class is not annotated with @ObjectType', () => {
            class TestInvalidFilter {
            }
            expect(() => src_1.SubscriptionFilterType(TestInvalidFilter)).toThrow('No fields found to create FilterType. Ensure TestInvalidFilter is annotated with @nestjs/graphql @ObjectType');
        });
        it('should create the correct filter graphql schema', () => {
            let FilterTypeSpec = class FilterTypeSpec {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                test(input) {
                    return 1;
                }
            };
            tslib_1.__decorate([
                graphql_1.Query(() => graphql_1.Int),
                tslib_1.__param(0, graphql_1.Args('input')),
                tslib_1.__metadata("design:type", Function),
                tslib_1.__metadata("design:paramtypes", [TestDtoFilter]),
                tslib_1.__metadata("design:returntype", Number)
            ], FilterTypeSpec.prototype, "test", null);
            FilterTypeSpec = tslib_1.__decorate([
                graphql_1.Resolver()
            ], FilterTypeSpec);
            return __fixtures__1.expectSDL([FilterTypeSpec], __fixtures__1.subscriptionFilterInputTypeSDL);
        });
        it('should throw an error if no fields are found', () => {
            let TestInvalidFilter = class TestInvalidFilter {
            };
            TestInvalidFilter = tslib_1.__decorate([
                graphql_1.ObjectType('TestNoFields')
            ], TestInvalidFilter);
            expect(() => src_1.SubscriptionFilterType(TestInvalidFilter)).toThrow('No fields found to create GraphQLFilter for TestInvalidFilter');
        });
        it('should throw an error when the field type is unknown', () => {
            let EnumField;
            (function (EnumField) {
                EnumField["ONE"] = "one";
            })(EnumField || (EnumField = {}));
            let TestInvalidFilter = class TestInvalidFilter {
            };
            tslib_1.__decorate([
                src_1.FilterableField(() => EnumField),
                tslib_1.__metadata("design:type", String)
            ], TestInvalidFilter.prototype, "fakeType", void 0);
            TestInvalidFilter = tslib_1.__decorate([
                graphql_1.ObjectType('TestBadField')
            ], TestInvalidFilter);
            expect(() => src_1.SubscriptionFilterType(TestInvalidFilter)).toThrow('Unable to create filter comparison for {"ONE":"one"}.');
        });
        it('should convert and filters to filter class', () => {
            const filterObject = {
                and: [{ stringField: { eq: 'foo' } }],
            };
            const filterInstance = class_transformer_1.plainToClass(TestDtoFilter, filterObject);
            expect(filterInstance.and[0]).toBeInstanceOf(TestGraphQLFilter);
        });
        it('should convert or filters to filter class', () => {
            const filterObject = {
                or: [{ stringField: { eq: 'foo' } }],
            };
            const filterInstance = class_transformer_1.plainToClass(TestDtoFilter, filterObject);
            expect(filterInstance.or[0]).toBeInstanceOf(TestGraphQLFilter);
        });
    });
});
//# sourceMappingURL=filter.type.spec.js.map