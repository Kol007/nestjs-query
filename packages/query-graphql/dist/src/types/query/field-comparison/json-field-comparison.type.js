"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrCreateJsonFieldComparison = void 0;
const tslib_1 = require("tslib");
// import {  InputType } from '@nestjs/graphql';
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const validators_1 = require("../../validators");
/** @internal */
let jsonFieldComparison;
/** @internal */
function getOrCreateJsonFieldComparison() {
    if (jsonFieldComparison) {
        return jsonFieldComparison;
    }
    let JsonFieldComparisonType = class JsonFieldComparisonType {
    };
    tslib_1.__decorate([
        graphql_1.Field({ nullable: true }),
        class_validator_1.IsString(),
        validators_1.IsUndefined(),
        tslib_1.__metadata("design:type", Object)
    ], JsonFieldComparisonType.prototype, "nest", void 0);
    tslib_1.__decorate([
        graphql_1.Field({ nullable: true }),
        class_validator_1.IsString(),
        validators_1.IsUndefined(),
        tslib_1.__metadata("design:type", String)
    ], JsonFieldComparisonType.prototype, "eq", void 0);
    tslib_1.__decorate([
        graphql_1.Field({ nullable: true }),
        class_validator_1.IsString(),
        validators_1.IsUndefined(),
        tslib_1.__metadata("design:type", String)
    ], JsonFieldComparisonType.prototype, "neq", void 0);
    tslib_1.__decorate([
        graphql_1.Field({ nullable: true }),
        class_validator_1.IsString(),
        validators_1.IsUndefined(),
        tslib_1.__metadata("design:type", String)
    ], JsonFieldComparisonType.prototype, "like", void 0);
    tslib_1.__decorate([
        graphql_1.Field({ nullable: true }),
        class_validator_1.IsString(),
        validators_1.IsUndefined(),
        tslib_1.__metadata("design:type", String)
    ], JsonFieldComparisonType.prototype, "notLike", void 0);
    tslib_1.__decorate([
        graphql_1.Field({ nullable: true }),
        class_validator_1.IsString(),
        validators_1.IsUndefined(),
        tslib_1.__metadata("design:type", String)
    ], JsonFieldComparisonType.prototype, "iLike", void 0);
    tslib_1.__decorate([
        graphql_1.Field({ nullable: true }),
        class_validator_1.IsString(),
        validators_1.IsUndefined(),
        tslib_1.__metadata("design:type", String)
    ], JsonFieldComparisonType.prototype, "notILike", void 0);
    tslib_1.__decorate([
        graphql_1.Field(() => [String], { nullable: true }),
        validators_1.IsUndefined(),
        class_validator_1.IsString({ each: true }),
        tslib_1.__metadata("design:type", Array)
    ], JsonFieldComparisonType.prototype, "in", void 0);
    tslib_1.__decorate([
        graphql_1.Field(() => [String], { nullable: true }),
        validators_1.IsUndefined(),
        class_validator_1.IsString({ each: true }),
        tslib_1.__metadata("design:type", Array)
    ], JsonFieldComparisonType.prototype, "all", void 0);
    tslib_1.__decorate([
        graphql_1.Field(() => [String], { nullable: true }),
        validators_1.IsUndefined(),
        class_validator_1.IsString({ each: true }),
        tslib_1.__metadata("design:type", Array)
    ], JsonFieldComparisonType.prototype, "notIn", void 0);
    JsonFieldComparisonType = tslib_1.__decorate([
        graphql_1.InputType()
    ], JsonFieldComparisonType);
    jsonFieldComparison = JsonFieldComparisonType;
    return jsonFieldComparison;
}
exports.getOrCreateJsonFieldComparison = getOrCreateJsonFieldComparison;
//# sourceMappingURL=json-field-comparison.type.js.map