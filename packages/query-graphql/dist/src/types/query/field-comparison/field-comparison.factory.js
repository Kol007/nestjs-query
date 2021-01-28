"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFilterComparisonType = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const upper_case_first_1 = require("upper-case-first");
const graphql_1 = require("@nestjs/graphql");
const graphql_type_json_1 = require("graphql-type-json");
const class_transformer_1 = require("class-transformer");
const validators_1 = require("../../validators");
const json_field_comparison_type_1 = require("./json-field-comparison.type");
const string_array_field_comparison_type_1 = require("./string-array-field-comparison.type");
const float_field_comparison_type_1 = require("./float-field-comparison.type");
const int_field_comparison_type_1 = require("./int-field-comparison.type");
const string_field_comparison_type_1 = require("./string-field-comparison.type");
const boolean_field_comparison_type_1 = require("./boolean-field-comparison.type");
const number_field_comparison_type_1 = require("./number-field-comparison.type");
const date_field_comparison_type_1 = require("./date-field-comparison.type");
const timestamp_field_comparison_type_1 = require("./timestamp-field-comparison.type");
const decorators_1 = require("../../../decorators");
const common_1 = require("../../../common");
/** @internal */
const filterComparisonMap = new Map();
filterComparisonMap.set('JsonFilterComparison', json_field_comparison_type_1.getOrCreateJsonFieldComparison);
filterComparisonMap.set('StringArrayFilterComparison', string_array_field_comparison_type_1.getOrCreateStringArrayFieldComparison);
filterComparisonMap.set('StringFilterComparison', string_field_comparison_type_1.getOrCreateStringFieldComparison);
filterComparisonMap.set('NumberFilterComparison', number_field_comparison_type_1.getOrCreateNumberFieldComparison);
filterComparisonMap.set('IntFilterComparison', int_field_comparison_type_1.getOrCreateIntFieldComparison);
filterComparisonMap.set('FloatFilterComparison', float_field_comparison_type_1.getOrCreateFloatFieldComparison);
filterComparisonMap.set('BooleanFilterComparison', boolean_field_comparison_type_1.getOrCreateBooleanFieldComparison);
filterComparisonMap.set('DateFilterComparison', date_field_comparison_type_1.getOrCreateDateFieldComparison);
filterComparisonMap.set('DateTimeFilterComparison', date_field_comparison_type_1.getOrCreateDateFieldComparison);
filterComparisonMap.set('TimestampFilterComparison', timestamp_field_comparison_type_1.getOrCreateTimestampFieldComparison);
const knownTypes = new Set([
    graphql_type_json_1.GraphQLJSONObject,
    [String],
    String,
    Number,
    Boolean,
    graphql_1.Int,
    graphql_1.Float,
    graphql_1.ID,
    Date,
    graphql_1.GraphQLISODateTime,
    graphql_1.GraphQLTimestamp,
]);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isNamed = (SomeType) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return 'name' in SomeType && typeof SomeType.name === 'string';
};
/** @internal */
const getTypeName = (SomeType) => {
    // filter array if array of known types
    const someType = Array.isArray(SomeType) ? SomeType === null || SomeType === void 0 ? void 0 : SomeType[0] : SomeType;
    if (knownTypes.has(someType) || isNamed(someType)) {
        const typeName = someType.name;
        return upper_case_first_1.upperCaseFirst(typeName);
    }
    if (typeof SomeType === 'object') {
        const enumType = common_1.getGraphqlEnumMetadata(SomeType);
        if (enumType) {
            return upper_case_first_1.upperCaseFirst(enumType.name);
        }
    }
    throw new Error(`Unable to create filter comparison for ${JSON.stringify(SomeType)}.`);
};
const isCustomFieldComparison = (options) => {
    return !!options.allowedComparisons;
};
const getComparisonTypeName = (fieldType, options) => {
    if (isCustomFieldComparison(options)) {
        return `${upper_case_first_1.upperCaseFirst(options.fieldName)}FilterComparison`;
    }
    return `${getTypeName(fieldType)}FilterComparison`;
};
const isNotAllowedChecker = (options) => {
    const { allowedComparisons } = options;
    return (cmp) => () => {
        return allowedComparisons ? !allowedComparisons.includes(cmp) : false;
    };
};
/** @internal */
function createFilterComparisonType(options) {
    const { FieldType, returnTypeFunc } = options;
    const fieldType = returnTypeFunc ? returnTypeFunc() : FieldType;
    const inputName = getComparisonTypeName(fieldType, options);
    const generator = filterComparisonMap.get(inputName);
    if (generator) {
        return generator();
    }
    const isNotAllowed = isNotAllowedChecker(options);
    let Fc = class Fc {
    };
    tslib_1.__decorate([
        decorators_1.SkipIf(isNotAllowed('is'), graphql_1.Field(() => Boolean, { nullable: true })),
        class_validator_1.IsBoolean(),
        class_validator_1.IsOptional(),
        tslib_1.__metadata("design:type", Object)
    ], Fc.prototype, "is", void 0);
    tslib_1.__decorate([
        decorators_1.SkipIf(isNotAllowed('isNot'), graphql_1.Field(() => Boolean, { nullable: true })),
        class_validator_1.IsBoolean(),
        class_validator_1.IsOptional(),
        tslib_1.__metadata("design:type", Object)
    ], Fc.prototype, "isNot", void 0);
    tslib_1.__decorate([
        decorators_1.SkipIf(isNotAllowed('eq'), graphql_1.Field(() => fieldType, { nullable: true })),
        validators_1.IsUndefined(),
        class_transformer_1.Type(() => FieldType),
        tslib_1.__metadata("design:type", Object)
    ], Fc.prototype, "eq", void 0);
    tslib_1.__decorate([
        decorators_1.SkipIf(isNotAllowed('neq'), graphql_1.Field(() => fieldType, { nullable: true })),
        validators_1.IsUndefined(),
        class_transformer_1.Type(() => FieldType),
        tslib_1.__metadata("design:type", Object)
    ], Fc.prototype, "neq", void 0);
    tslib_1.__decorate([
        decorators_1.SkipIf(isNotAllowed('gt'), graphql_1.Field(() => fieldType, { nullable: true })),
        validators_1.IsUndefined(),
        class_transformer_1.Type(() => FieldType),
        tslib_1.__metadata("design:type", Object)
    ], Fc.prototype, "gt", void 0);
    tslib_1.__decorate([
        decorators_1.SkipIf(isNotAllowed('gte'), graphql_1.Field(() => fieldType, { nullable: true })),
        validators_1.IsUndefined(),
        class_transformer_1.Type(() => FieldType),
        tslib_1.__metadata("design:type", Object)
    ], Fc.prototype, "gte", void 0);
    tslib_1.__decorate([
        decorators_1.SkipIf(isNotAllowed('lt'), graphql_1.Field(() => fieldType, { nullable: true })),
        validators_1.IsUndefined(),
        class_transformer_1.Type(() => FieldType),
        tslib_1.__metadata("design:type", Object)
    ], Fc.prototype, "lt", void 0);
    tslib_1.__decorate([
        decorators_1.SkipIf(isNotAllowed('lte'), graphql_1.Field(() => fieldType, { nullable: true })),
        validators_1.IsUndefined(),
        class_transformer_1.Type(() => FieldType),
        tslib_1.__metadata("design:type", Object)
    ], Fc.prototype, "lte", void 0);
    tslib_1.__decorate([
        decorators_1.SkipIf(isNotAllowed('like'), graphql_1.Field(() => fieldType, { nullable: true })),
        validators_1.IsUndefined(),
        class_transformer_1.Type(() => FieldType),
        tslib_1.__metadata("design:type", Object)
    ], Fc.prototype, "like", void 0);
    tslib_1.__decorate([
        decorators_1.SkipIf(isNotAllowed('notLike'), graphql_1.Field(() => fieldType, { nullable: true })),
        validators_1.IsUndefined(),
        class_transformer_1.Type(() => FieldType),
        tslib_1.__metadata("design:type", Object)
    ], Fc.prototype, "notLike", void 0);
    tslib_1.__decorate([
        decorators_1.SkipIf(isNotAllowed('iLike'), graphql_1.Field(() => fieldType, { nullable: true })),
        validators_1.IsUndefined(),
        class_transformer_1.Type(() => FieldType),
        tslib_1.__metadata("design:type", Object)
    ], Fc.prototype, "iLike", void 0);
    tslib_1.__decorate([
        decorators_1.SkipIf(isNotAllowed('notILike'), graphql_1.Field(() => fieldType, { nullable: true })),
        validators_1.IsUndefined(),
        class_transformer_1.Type(() => FieldType),
        tslib_1.__metadata("design:type", Object)
    ], Fc.prototype, "notILike", void 0);
    tslib_1.__decorate([
        decorators_1.SkipIf(isNotAllowed('all'), graphql_1.Field(() => [fieldType], { nullable: true })),
        validators_1.IsUndefined(),
        class_transformer_1.Type(() => FieldType),
        tslib_1.__metadata("design:type", Array)
    ], Fc.prototype, "all", void 0);
    tslib_1.__decorate([
        decorators_1.SkipIf(isNotAllowed('in'), graphql_1.Field(() => [fieldType], { nullable: true })),
        validators_1.IsUndefined(),
        class_transformer_1.Type(() => FieldType),
        tslib_1.__metadata("design:type", Array)
    ], Fc.prototype, "in", void 0);
    tslib_1.__decorate([
        decorators_1.SkipIf(isNotAllowed('notIn'), graphql_1.Field(() => [fieldType], { nullable: true })),
        validators_1.IsUndefined(),
        class_transformer_1.Type(() => FieldType),
        tslib_1.__metadata("design:type", Array)
    ], Fc.prototype, "notIn", void 0);
    Fc = tslib_1.__decorate([
        graphql_1.InputType(inputName)
    ], Fc);
    filterComparisonMap.set(inputName, () => Fc);
    return Fc;
}
exports.createFilterComparisonType = createFilterComparisonType;
//# sourceMappingURL=field-comparison.factory.js.map