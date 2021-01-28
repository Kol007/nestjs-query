"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrCreateStringArrayFieldComparison = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const validators_1 = require("../../validators");
/** @internal */
let stringArrayFieldComparison;
/** @internal */
function getOrCreateStringArrayFieldComparison() {
    if (stringArrayFieldComparison) {
        return stringArrayFieldComparison;
    }
    let StringArrayFieldComparisonType = class StringArrayFieldComparisonType {
    };
    tslib_1.__decorate([
        graphql_1.Field({ nullable: true }),
        class_validator_1.IsString(),
        validators_1.IsUndefined(),
        tslib_1.__metadata("design:type", String)
    ], StringArrayFieldComparisonType.prototype, "eq", void 0);
    tslib_1.__decorate([
        graphql_1.Field({ nullable: true }),
        class_validator_1.IsString(),
        validators_1.IsUndefined(),
        tslib_1.__metadata("design:type", String)
    ], StringArrayFieldComparisonType.prototype, "neq", void 0);
    tslib_1.__decorate([
        graphql_1.Field({ nullable: true }),
        class_validator_1.IsString(),
        validators_1.IsUndefined(),
        tslib_1.__metadata("design:type", String)
    ], StringArrayFieldComparisonType.prototype, "like", void 0);
    tslib_1.__decorate([
        graphql_1.Field({ nullable: true }),
        class_validator_1.IsString(),
        validators_1.IsUndefined(),
        tslib_1.__metadata("design:type", String)
    ], StringArrayFieldComparisonType.prototype, "notLike", void 0);
    tslib_1.__decorate([
        graphql_1.Field({ nullable: true }),
        class_validator_1.IsString(),
        validators_1.IsUndefined(),
        tslib_1.__metadata("design:type", String)
    ], StringArrayFieldComparisonType.prototype, "iLike", void 0);
    tslib_1.__decorate([
        graphql_1.Field({ nullable: true }),
        class_validator_1.IsString(),
        validators_1.IsUndefined(),
        tslib_1.__metadata("design:type", String)
    ], StringArrayFieldComparisonType.prototype, "notILike", void 0);
    tslib_1.__decorate([
        graphql_1.Field(() => [String], { nullable: true }),
        validators_1.IsUndefined(),
        class_validator_1.IsString({ each: true }),
        tslib_1.__metadata("design:type", Array)
    ], StringArrayFieldComparisonType.prototype, "in", void 0);
    tslib_1.__decorate([
        graphql_1.Field(() => [String], { nullable: true }),
        validators_1.IsUndefined(),
        class_validator_1.IsString({ each: true }),
        tslib_1.__metadata("design:type", Array)
    ], StringArrayFieldComparisonType.prototype, "all", void 0);
    tslib_1.__decorate([
        graphql_1.Field(() => [String], { nullable: true }),
        validators_1.IsUndefined(),
        class_validator_1.IsString({ each: true }),
        tslib_1.__metadata("design:type", Array)
    ], StringArrayFieldComparisonType.prototype, "notIn", void 0);
    StringArrayFieldComparisonType = tslib_1.__decorate([
        graphql_1.InputType()
    ], StringArrayFieldComparisonType);
    stringArrayFieldComparison = StringArrayFieldComparisonType;
    return stringArrayFieldComparison;
}
exports.getOrCreateStringArrayFieldComparison = getOrCreateStringArrayFieldComparison;
//# sourceMappingURL=string-array-field-comparison.type.js.map