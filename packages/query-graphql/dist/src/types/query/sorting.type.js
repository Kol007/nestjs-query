"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SortType = void 0;
const tslib_1 = require("tslib");
const core_1 = require("nestjs-query/packages/core");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const validators_1 = require("../validators");
const decorators_1 = require("../../decorators");
const common_1 = require("../../common");
graphql_1.registerEnumType(core_1.SortDirection, {
    name: 'SortDirection',
    description: 'Sort Directions',
});
graphql_1.registerEnumType(core_1.SortNulls, {
    name: 'SortNulls',
    description: 'Sort Nulls Options',
});
const reflector = new core_1.ValueReflector('nestjs-query:sort-type');
function SortType(TClass) {
    return reflector.memoize(TClass, () => {
        const prefix = common_1.getGraphqlObjectName(TClass, 'Unable to make SortType.');
        const fields = decorators_1.getFilterableFields(TClass);
        if (!fields.length) {
            throw new Error(`No fields found to create SortType for ${TClass.name}. Ensure fields are annotated with @FilterableField`);
        }
        const fieldNames = fields.map((f) => f.propertyName);
        const fieldNameMap = fieldNames.reduce((acc, f) => ({ ...acc, [f]: f }), {});
        graphql_1.registerEnumType(fieldNameMap, { name: `${prefix}SortFields` });
        let Sort = class Sort {
        };
        tslib_1.__decorate([
            graphql_1.Field(() => fieldNameMap),
            class_validator_1.IsIn(fieldNames),
            tslib_1.__metadata("design:type", Object)
        ], Sort.prototype, "field", void 0);
        tslib_1.__decorate([
            graphql_1.Field(() => core_1.SortDirection),
            class_validator_1.IsEnum(core_1.SortDirection),
            tslib_1.__metadata("design:type", String)
        ], Sort.prototype, "direction", void 0);
        tslib_1.__decorate([
            graphql_1.Field(() => core_1.SortNulls, { nullable: true }),
            validators_1.IsUndefined(),
            class_validator_1.IsEnum(core_1.SortNulls),
            tslib_1.__metadata("design:type", String)
        ], Sort.prototype, "nulls", void 0);
        Sort = tslib_1.__decorate([
            graphql_1.InputType(`${prefix}Sort`)
        ], Sort);
        return Sort;
    });
}
exports.SortType = SortType;
//# sourceMappingURL=sorting.type.js.map