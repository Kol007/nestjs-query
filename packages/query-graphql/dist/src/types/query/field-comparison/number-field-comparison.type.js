"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrCreateNumberFieldComparison = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const validators_1 = require("../../validators");
/** @internal */
let numberFieldComparison;
/** @internal */
function getOrCreateNumberFieldComparison() {
    if (numberFieldComparison) {
        return numberFieldComparison;
    }
    let NumberFieldComparisonBetween = class NumberFieldComparisonBetween {
    };
    tslib_1.__decorate([
        graphql_1.Field({ nullable: false }),
        class_validator_1.IsNumber(),
        tslib_1.__metadata("design:type", Number)
    ], NumberFieldComparisonBetween.prototype, "lower", void 0);
    tslib_1.__decorate([
        graphql_1.Field({ nullable: false }),
        class_validator_1.IsNumber(),
        tslib_1.__metadata("design:type", Number)
    ], NumberFieldComparisonBetween.prototype, "upper", void 0);
    NumberFieldComparisonBetween = tslib_1.__decorate([
        graphql_1.InputType()
    ], NumberFieldComparisonBetween);
    let NumberFieldComparison = class NumberFieldComparison {
    };
    tslib_1.__decorate([
        graphql_1.Field(() => Boolean, { nullable: true }),
        class_validator_1.IsBoolean(),
        class_validator_1.IsOptional(),
        tslib_1.__metadata("design:type", Object)
    ], NumberFieldComparison.prototype, "is", void 0);
    tslib_1.__decorate([
        graphql_1.Field(() => Boolean, { nullable: true }),
        class_validator_1.IsBoolean(),
        class_validator_1.IsOptional(),
        tslib_1.__metadata("design:type", Object)
    ], NumberFieldComparison.prototype, "isNot", void 0);
    tslib_1.__decorate([
        graphql_1.Field({ nullable: true }),
        class_validator_1.IsNumber(),
        validators_1.IsUndefined(),
        tslib_1.__metadata("design:type", Number)
    ], NumberFieldComparison.prototype, "eq", void 0);
    tslib_1.__decorate([
        graphql_1.Field({ nullable: true }),
        class_validator_1.IsNumber(),
        validators_1.IsUndefined(),
        tslib_1.__metadata("design:type", Number)
    ], NumberFieldComparison.prototype, "neq", void 0);
    tslib_1.__decorate([
        graphql_1.Field({ nullable: true }),
        class_validator_1.IsNumber(),
        validators_1.IsUndefined(),
        tslib_1.__metadata("design:type", Number)
    ], NumberFieldComparison.prototype, "gt", void 0);
    tslib_1.__decorate([
        graphql_1.Field({ nullable: true }),
        class_validator_1.IsNumber(),
        validators_1.IsUndefined(),
        tslib_1.__metadata("design:type", Number)
    ], NumberFieldComparison.prototype, "gte", void 0);
    tslib_1.__decorate([
        graphql_1.Field({ nullable: true }),
        class_validator_1.IsNumber(),
        validators_1.IsUndefined(),
        tslib_1.__metadata("design:type", Number)
    ], NumberFieldComparison.prototype, "lt", void 0);
    tslib_1.__decorate([
        graphql_1.Field({ nullable: true }),
        class_validator_1.IsNumber(),
        validators_1.IsUndefined(),
        tslib_1.__metadata("design:type", Number)
    ], NumberFieldComparison.prototype, "lte", void 0);
    tslib_1.__decorate([
        graphql_1.Field(() => [Number], { nullable: true }),
        class_validator_1.IsNumber({}, { each: true }),
        validators_1.IsUndefined(),
        tslib_1.__metadata("design:type", Array)
    ], NumberFieldComparison.prototype, "in", void 0);
    tslib_1.__decorate([
        graphql_1.Field(() => [Number], { nullable: true }),
        class_validator_1.IsNumber({}, { each: true }),
        validators_1.IsUndefined(),
        tslib_1.__metadata("design:type", Array)
    ], NumberFieldComparison.prototype, "notIn", void 0);
    tslib_1.__decorate([
        graphql_1.Field(() => NumberFieldComparisonBetween, { nullable: true }),
        class_validator_1.ValidateNested(),
        class_transformer_1.Type(() => NumberFieldComparisonBetween),
        tslib_1.__metadata("design:type", NumberFieldComparisonBetween)
    ], NumberFieldComparison.prototype, "between", void 0);
    tslib_1.__decorate([
        graphql_1.Field(() => NumberFieldComparisonBetween, { nullable: true }),
        class_validator_1.ValidateNested(),
        class_transformer_1.Type(() => NumberFieldComparisonBetween),
        tslib_1.__metadata("design:type", NumberFieldComparisonBetween)
    ], NumberFieldComparison.prototype, "notBetween", void 0);
    NumberFieldComparison = tslib_1.__decorate([
        graphql_1.InputType()
    ], NumberFieldComparison);
    numberFieldComparison = NumberFieldComparison;
    return numberFieldComparison;
}
exports.getOrCreateNumberFieldComparison = getOrCreateNumberFieldComparison;
//# sourceMappingURL=number-field-comparison.type.js.map