"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrCreateTimestampFieldComparison = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const validators_1 = require("../../validators");
/** @internal */
let timestampFieldComparison;
/** @internal */
function getOrCreateTimestampFieldComparison() {
    if (timestampFieldComparison) {
        return timestampFieldComparison;
    }
    let TimestampFieldComparisonBetween = class TimestampFieldComparisonBetween {
    };
    tslib_1.__decorate([
        graphql_1.Field(() => graphql_1.GraphQLTimestamp, { nullable: false }),
        class_validator_1.IsDate(),
        tslib_1.__metadata("design:type", Date)
    ], TimestampFieldComparisonBetween.prototype, "lower", void 0);
    tslib_1.__decorate([
        graphql_1.Field(() => graphql_1.GraphQLTimestamp, { nullable: false }),
        class_validator_1.IsDate(),
        tslib_1.__metadata("design:type", Date)
    ], TimestampFieldComparisonBetween.prototype, "upper", void 0);
    TimestampFieldComparisonBetween = tslib_1.__decorate([
        graphql_1.InputType()
    ], TimestampFieldComparisonBetween);
    let TimestampFieldComparison = class TimestampFieldComparison {
    };
    tslib_1.__decorate([
        graphql_1.Field(() => Boolean, { nullable: true }),
        class_validator_1.IsBoolean(),
        class_validator_1.IsOptional(),
        tslib_1.__metadata("design:type", Object)
    ], TimestampFieldComparison.prototype, "is", void 0);
    tslib_1.__decorate([
        graphql_1.Field(() => Boolean, { nullable: true }),
        class_validator_1.IsBoolean(),
        class_validator_1.IsOptional(),
        tslib_1.__metadata("design:type", Object)
    ], TimestampFieldComparison.prototype, "isNot", void 0);
    tslib_1.__decorate([
        graphql_1.Field(() => graphql_1.GraphQLTimestamp, { nullable: true }),
        validators_1.IsUndefined(),
        class_validator_1.IsDate(),
        tslib_1.__metadata("design:type", Date)
    ], TimestampFieldComparison.prototype, "eq", void 0);
    tslib_1.__decorate([
        graphql_1.Field(() => graphql_1.GraphQLTimestamp, { nullable: true }),
        validators_1.IsUndefined(),
        class_validator_1.IsDate(),
        tslib_1.__metadata("design:type", Date)
    ], TimestampFieldComparison.prototype, "neq", void 0);
    tslib_1.__decorate([
        graphql_1.Field(() => graphql_1.GraphQLTimestamp, { nullable: true }),
        validators_1.IsUndefined(),
        class_validator_1.IsDate(),
        tslib_1.__metadata("design:type", Date)
    ], TimestampFieldComparison.prototype, "gt", void 0);
    tslib_1.__decorate([
        graphql_1.Field(() => graphql_1.GraphQLTimestamp, { nullable: true }),
        validators_1.IsUndefined(),
        class_validator_1.IsDate(),
        tslib_1.__metadata("design:type", Date)
    ], TimestampFieldComparison.prototype, "gte", void 0);
    tslib_1.__decorate([
        graphql_1.Field(() => graphql_1.GraphQLTimestamp, { nullable: true }),
        validators_1.IsUndefined(),
        class_validator_1.IsDate(),
        tslib_1.__metadata("design:type", Date)
    ], TimestampFieldComparison.prototype, "lt", void 0);
    tslib_1.__decorate([
        graphql_1.Field(() => graphql_1.GraphQLTimestamp, { nullable: true }),
        validators_1.IsUndefined(),
        class_validator_1.IsDate(),
        tslib_1.__metadata("design:type", Date)
    ], TimestampFieldComparison.prototype, "lte", void 0);
    tslib_1.__decorate([
        graphql_1.Field(() => [graphql_1.GraphQLTimestamp], { nullable: true }),
        validators_1.IsUndefined(),
        class_validator_1.IsDate({ each: true }),
        tslib_1.__metadata("design:type", Array)
    ], TimestampFieldComparison.prototype, "in", void 0);
    tslib_1.__decorate([
        graphql_1.Field(() => [graphql_1.GraphQLTimestamp], { nullable: true }),
        validators_1.IsUndefined(),
        class_validator_1.IsDate({ each: true }),
        tslib_1.__metadata("design:type", Array)
    ], TimestampFieldComparison.prototype, "notIn", void 0);
    tslib_1.__decorate([
        graphql_1.Field(() => TimestampFieldComparisonBetween, { nullable: true }),
        class_validator_1.ValidateNested(),
        class_transformer_1.Type(() => TimestampFieldComparisonBetween),
        tslib_1.__metadata("design:type", TimestampFieldComparisonBetween)
    ], TimestampFieldComparison.prototype, "between", void 0);
    tslib_1.__decorate([
        graphql_1.Field(() => TimestampFieldComparisonBetween, { nullable: true }),
        class_validator_1.ValidateNested(),
        class_transformer_1.Type(() => TimestampFieldComparisonBetween),
        tslib_1.__metadata("design:type", TimestampFieldComparisonBetween)
    ], TimestampFieldComparison.prototype, "notBetween", void 0);
    TimestampFieldComparison = tslib_1.__decorate([
        graphql_1.InputType()
    ], TimestampFieldComparison);
    timestampFieldComparison = TimestampFieldComparison;
    return timestampFieldComparison;
}
exports.getOrCreateTimestampFieldComparison = getOrCreateTimestampFieldComparison;
//# sourceMappingURL=timestamp-field-comparison.type.js.map