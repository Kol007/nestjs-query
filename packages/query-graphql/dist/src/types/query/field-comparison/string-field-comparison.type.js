"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrCreateStringFieldComparison = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const validators_1 = require("../../validators");
/** @internal */
let stringFieldComparison;
/** @internal */
function getOrCreateStringFieldComparison() {
    if (stringFieldComparison) {
        return stringFieldComparison;
    }
    let StringFieldComparison = class StringFieldComparison {
    };
    tslib_1.__decorate([
        graphql_1.Field(() => Boolean, { nullable: true }),
        class_validator_1.IsBoolean(),
        class_validator_1.IsOptional(),
        tslib_1.__metadata("design:type", Object)
    ], StringFieldComparison.prototype, "is", void 0);
    tslib_1.__decorate([
        graphql_1.Field(() => Boolean, { nullable: true }),
        class_validator_1.IsBoolean(),
        class_validator_1.IsOptional(),
        tslib_1.__metadata("design:type", Object)
    ], StringFieldComparison.prototype, "isNot", void 0);
    tslib_1.__decorate([
        graphql_1.Field({ nullable: true }),
        class_validator_1.IsString(),
        validators_1.IsUndefined(),
        tslib_1.__metadata("design:type", String)
    ], StringFieldComparison.prototype, "eq", void 0);
    tslib_1.__decorate([
        graphql_1.Field({ nullable: true }),
        class_validator_1.IsString(),
        validators_1.IsUndefined(),
        tslib_1.__metadata("design:type", String)
    ], StringFieldComparison.prototype, "neq", void 0);
    tslib_1.__decorate([
        graphql_1.Field({ nullable: true }),
        class_validator_1.IsString(),
        validators_1.IsUndefined(),
        tslib_1.__metadata("design:type", String)
    ], StringFieldComparison.prototype, "gt", void 0);
    tslib_1.__decorate([
        graphql_1.Field({ nullable: true }),
        class_validator_1.IsString(),
        validators_1.IsUndefined(),
        tslib_1.__metadata("design:type", String)
    ], StringFieldComparison.prototype, "gte", void 0);
    tslib_1.__decorate([
        graphql_1.Field({ nullable: true }),
        class_validator_1.IsString(),
        validators_1.IsUndefined(),
        tslib_1.__metadata("design:type", String)
    ], StringFieldComparison.prototype, "lt", void 0);
    tslib_1.__decorate([
        graphql_1.Field({ nullable: true }),
        class_validator_1.IsString(),
        validators_1.IsUndefined(),
        tslib_1.__metadata("design:type", String)
    ], StringFieldComparison.prototype, "lte", void 0);
    tslib_1.__decorate([
        graphql_1.Field({ nullable: true }),
        class_validator_1.IsString(),
        validators_1.IsUndefined(),
        tslib_1.__metadata("design:type", String)
    ], StringFieldComparison.prototype, "like", void 0);
    tslib_1.__decorate([
        graphql_1.Field({ nullable: true }),
        class_validator_1.IsString(),
        validators_1.IsUndefined(),
        tslib_1.__metadata("design:type", String)
    ], StringFieldComparison.prototype, "notLike", void 0);
    tslib_1.__decorate([
        graphql_1.Field({ nullable: true }),
        class_validator_1.IsString(),
        validators_1.IsUndefined(),
        tslib_1.__metadata("design:type", String)
    ], StringFieldComparison.prototype, "iLike", void 0);
    tslib_1.__decorate([
        graphql_1.Field({ nullable: true }),
        class_validator_1.IsString(),
        validators_1.IsUndefined(),
        tslib_1.__metadata("design:type", String)
    ], StringFieldComparison.prototype, "notILike", void 0);
    tslib_1.__decorate([
        graphql_1.Field(() => [String], { nullable: true }),
        validators_1.IsUndefined(),
        class_validator_1.IsString({ each: true }),
        tslib_1.__metadata("design:type", Array)
    ], StringFieldComparison.prototype, "in", void 0);
    tslib_1.__decorate([
        graphql_1.Field(() => [String], { nullable: true }),
        validators_1.IsUndefined(),
        class_validator_1.IsString({ each: true }),
        tslib_1.__metadata("design:type", Array)
    ], StringFieldComparison.prototype, "all", void 0);
    tslib_1.__decorate([
        graphql_1.Field(() => [String], { nullable: true }),
        validators_1.IsUndefined(),
        class_validator_1.IsString({ each: true }),
        tslib_1.__metadata("design:type", Array)
    ], StringFieldComparison.prototype, "notIn", void 0);
    StringFieldComparison = tslib_1.__decorate([
        graphql_1.InputType()
    ], StringFieldComparison);
    stringFieldComparison = StringFieldComparison;
    return stringFieldComparison;
}
exports.getOrCreateStringFieldComparison = getOrCreateStringFieldComparison;
//# sourceMappingURL=string-field-comparison.type.js.map