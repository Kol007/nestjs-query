"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrCreateFloatFieldComparison = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const validators_1 = require("../../validators");
/** @internal */
let floatFieldComparison;
/** @internal */
function getOrCreateFloatFieldComparison() {
    if (floatFieldComparison) {
        return floatFieldComparison;
    }
    let FloatFieldComparisonBetween = class FloatFieldComparisonBetween {
    };
    tslib_1.__decorate([
        graphql_1.Field(() => graphql_1.Float, { nullable: false }),
        class_validator_1.IsNumber(),
        tslib_1.__metadata("design:type", Number)
    ], FloatFieldComparisonBetween.prototype, "lower", void 0);
    tslib_1.__decorate([
        graphql_1.Field(() => graphql_1.Float, { nullable: false }),
        class_validator_1.IsNumber(),
        tslib_1.__metadata("design:type", Number)
    ], FloatFieldComparisonBetween.prototype, "upper", void 0);
    FloatFieldComparisonBetween = tslib_1.__decorate([
        graphql_1.InputType()
    ], FloatFieldComparisonBetween);
    let FloatFieldComparison = class FloatFieldComparison {
    };
    tslib_1.__decorate([
        graphql_1.Field(() => Boolean, { nullable: true }),
        class_validator_1.IsBoolean(),
        class_validator_1.IsOptional(),
        tslib_1.__metadata("design:type", Object)
    ], FloatFieldComparison.prototype, "is", void 0);
    tslib_1.__decorate([
        graphql_1.Field(() => Boolean, { nullable: true }),
        class_validator_1.IsBoolean(),
        class_validator_1.IsOptional(),
        tslib_1.__metadata("design:type", Object)
    ], FloatFieldComparison.prototype, "isNot", void 0);
    tslib_1.__decorate([
        graphql_1.Field(() => graphql_1.Float, { nullable: true }),
        class_validator_1.IsNumber(),
        validators_1.IsUndefined(),
        tslib_1.__metadata("design:type", Number)
    ], FloatFieldComparison.prototype, "eq", void 0);
    tslib_1.__decorate([
        graphql_1.Field(() => graphql_1.Float, { nullable: true }),
        class_validator_1.IsNumber(),
        validators_1.IsUndefined(),
        tslib_1.__metadata("design:type", Number)
    ], FloatFieldComparison.prototype, "neq", void 0);
    tslib_1.__decorate([
        graphql_1.Field(() => graphql_1.Float, { nullable: true }),
        class_validator_1.IsNumber(),
        validators_1.IsUndefined(),
        tslib_1.__metadata("design:type", Number)
    ], FloatFieldComparison.prototype, "gt", void 0);
    tslib_1.__decorate([
        graphql_1.Field(() => graphql_1.Float, { nullable: true }),
        class_validator_1.IsNumber(),
        validators_1.IsUndefined(),
        tslib_1.__metadata("design:type", Number)
    ], FloatFieldComparison.prototype, "gte", void 0);
    tslib_1.__decorate([
        graphql_1.Field(() => graphql_1.Float, { nullable: true }),
        class_validator_1.IsNumber(),
        validators_1.IsUndefined(),
        tslib_1.__metadata("design:type", Number)
    ], FloatFieldComparison.prototype, "lt", void 0);
    tslib_1.__decorate([
        graphql_1.Field(() => graphql_1.Float, { nullable: true }),
        class_validator_1.IsNumber(),
        validators_1.IsUndefined(),
        tslib_1.__metadata("design:type", Number)
    ], FloatFieldComparison.prototype, "lte", void 0);
    tslib_1.__decorate([
        graphql_1.Field(() => [graphql_1.Float], { nullable: true }),
        class_validator_1.IsNumber({}, { each: true }),
        validators_1.IsUndefined(),
        tslib_1.__metadata("design:type", Array)
    ], FloatFieldComparison.prototype, "in", void 0);
    tslib_1.__decorate([
        graphql_1.Field(() => [graphql_1.Float], { nullable: true }),
        class_validator_1.IsNumber({}, { each: true }),
        validators_1.IsUndefined(),
        tslib_1.__metadata("design:type", Array)
    ], FloatFieldComparison.prototype, "notIn", void 0);
    tslib_1.__decorate([
        graphql_1.Field(() => FloatFieldComparisonBetween, { nullable: true }),
        class_validator_1.ValidateNested(),
        class_transformer_1.Type(() => FloatFieldComparisonBetween),
        tslib_1.__metadata("design:type", FloatFieldComparisonBetween)
    ], FloatFieldComparison.prototype, "between", void 0);
    tslib_1.__decorate([
        graphql_1.Field(() => FloatFieldComparisonBetween, { nullable: true }),
        class_validator_1.ValidateNested(),
        class_transformer_1.Type(() => FloatFieldComparisonBetween),
        tslib_1.__metadata("design:type", FloatFieldComparisonBetween)
    ], FloatFieldComparison.prototype, "notBetween", void 0);
    FloatFieldComparison = tslib_1.__decorate([
        graphql_1.InputType()
    ], FloatFieldComparison);
    floatFieldComparison = FloatFieldComparison;
    return floatFieldComparison;
}
exports.getOrCreateFloatFieldComparison = getOrCreateFloatFieldComparison;
//# sourceMappingURL=float-field-comparison.type.js.map