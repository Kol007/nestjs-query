"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrCreateBooleanFieldComparison = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const graphql_1 = require("@nestjs/graphql");
/** @internal */
let booleanFieldComparison;
/** @internal */
function getOrCreateBooleanFieldComparison() {
    if (booleanFieldComparison) {
        return booleanFieldComparison;
    }
    let BooleanFieldComparison = class BooleanFieldComparison {
    };
    tslib_1.__decorate([
        graphql_1.Field(() => Boolean, { nullable: true }),
        class_validator_1.IsBoolean(),
        class_validator_1.IsOptional(),
        tslib_1.__metadata("design:type", Object)
    ], BooleanFieldComparison.prototype, "is", void 0);
    tslib_1.__decorate([
        graphql_1.Field(() => Boolean, { nullable: true }),
        class_validator_1.IsBoolean(),
        class_validator_1.IsOptional(),
        tslib_1.__metadata("design:type", Object)
    ], BooleanFieldComparison.prototype, "isNot", void 0);
    BooleanFieldComparison = tslib_1.__decorate([
        graphql_1.InputType()
    ], BooleanFieldComparison);
    booleanFieldComparison = BooleanFieldComparison;
    return BooleanFieldComparison;
}
exports.getOrCreateBooleanFieldComparison = getOrCreateBooleanFieldComparison;
//# sourceMappingURL=boolean-field-comparison.type.js.map