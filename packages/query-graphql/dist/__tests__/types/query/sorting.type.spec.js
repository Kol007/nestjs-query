"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// eslint-disable-next-line max-classes-per-file
const graphql_1 = require("@nestjs/graphql");
const src_1 = require("../../../src");
const __fixtures__1 = require("../../__fixtures__");
describe('SortingType', () => {
    let BaseType = class BaseType {
    };
    tslib_1.__decorate([
        src_1.FilterableField(),
        tslib_1.__metadata("design:type", Number)
    ], BaseType.prototype, "id", void 0);
    BaseType = tslib_1.__decorate([
        graphql_1.ObjectType({ isAbstract: true })
    ], BaseType);
    let TestSort = class TestSort extends BaseType {
    };
    tslib_1.__decorate([
        src_1.FilterableField(),
        tslib_1.__metadata("design:type", String)
    ], TestSort.prototype, "stringField", void 0);
    tslib_1.__decorate([
        src_1.FilterableField(),
        tslib_1.__metadata("design:type", Number)
    ], TestSort.prototype, "numberField", void 0);
    tslib_1.__decorate([
        src_1.FilterableField(),
        tslib_1.__metadata("design:type", Boolean)
    ], TestSort.prototype, "boolField", void 0);
    TestSort = tslib_1.__decorate([
        graphql_1.ObjectType()
    ], TestSort);
    it('should create the correct graphql schema for sorting type', () => {
        let Sorting = class Sorting extends src_1.SortType(TestSort) {
        };
        Sorting = tslib_1.__decorate([
            graphql_1.InputType()
        ], Sorting);
        let SortingTypeSpec = class SortingTypeSpec {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            test(input) {
                return 1;
            }
        };
        tslib_1.__decorate([
            graphql_1.Query(() => graphql_1.Int),
            tslib_1.__param(0, graphql_1.Args('input')),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", [Sorting]),
            tslib_1.__metadata("design:returntype", Number)
        ], SortingTypeSpec.prototype, "test", null);
        SortingTypeSpec = tslib_1.__decorate([
            graphql_1.Resolver()
        ], SortingTypeSpec);
        return __fixtures__1.expectSDL([SortingTypeSpec], __fixtures__1.sortingInputTypeSDL);
    });
    it('should throw an error if the class is not annotated with @ObjectType', () => {
        class BadTestSort {
        }
        expect(() => src_1.SortType(BadTestSort)).toThrow('Unable to make SortType. Ensure BadTestSort is annotated with @nestjs/graphql @ObjectType');
    });
    it('should throw an error if no fields are found', () => {
        let BadTestSort = class BadTestSort {
        };
        BadTestSort = tslib_1.__decorate([
            graphql_1.ObjectType()
        ], BadTestSort);
        expect(() => src_1.SortType(BadTestSort)).toThrow('No fields found to create SortType for BadTestSort. Ensure fields are annotated with @FilterableField');
    });
});
//# sourceMappingURL=sorting.type.spec.js.map