"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateManyInputType = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const query_1 = require("./query");
/**
 * Input abstract type for all update many endpoints.
 * @param DTOClass - The DTO used to create a FilterType for the update.
 * @param UpdateType - The InputType to use for the update field.
 */
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentional
function UpdateManyInputType(DTOClass, UpdateType) {
    const F = query_1.UpdateFilterType(DTOClass);
    let UpdateManyInput = class UpdateManyInput {
    };
    tslib_1.__decorate([
        class_validator_1.IsNotEmptyObject(),
        class_validator_1.ValidateNested(),
        class_transformer_1.Type(() => F),
        graphql_1.Field(() => F, { description: 'Filter used to find fields to update' }),
        tslib_1.__metadata("design:type", Object)
    ], UpdateManyInput.prototype, "filter", void 0);
    tslib_1.__decorate([
        class_transformer_1.Type(() => UpdateType),
        class_validator_1.ValidateNested(),
        graphql_1.Field(() => UpdateType, { description: 'The update to apply to all records found using the filter' }),
        tslib_1.__metadata("design:type", Object)
    ], UpdateManyInput.prototype, "update", void 0);
    UpdateManyInput = tslib_1.__decorate([
        graphql_1.InputType({ isAbstract: true })
    ], UpdateManyInput);
    return UpdateManyInput;
}
exports.UpdateManyInputType = UpdateManyInputType;
//# sourceMappingURL=update-many-input.type.js.map