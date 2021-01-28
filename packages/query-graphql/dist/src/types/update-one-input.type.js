"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOneInputType = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
/**
 * The abstract input type for update one endpoints.
 * @param UpdateType - The InputType to use for the update field.
 */
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentional
function UpdateOneInputType(UpdateType) {
    let UpdateOneInput = class UpdateOneInput {
    };
    tslib_1.__decorate([
        class_validator_1.IsNotEmpty(),
        graphql_1.Field(() => graphql_1.ID, { description: 'The id of the record to update' }),
        tslib_1.__metadata("design:type", Object)
    ], UpdateOneInput.prototype, "id", void 0);
    tslib_1.__decorate([
        class_transformer_1.Type(() => UpdateType),
        class_validator_1.ValidateNested(),
        graphql_1.Field(() => UpdateType, { description: 'The update to apply.' }),
        tslib_1.__metadata("design:type", Object)
    ], UpdateOneInput.prototype, "update", void 0);
    UpdateOneInput = tslib_1.__decorate([
        graphql_1.InputType({ isAbstract: true })
    ], UpdateOneInput);
    return UpdateOneInput;
}
exports.UpdateOneInputType = UpdateOneInputType;
//# sourceMappingURL=update-one-input.type.js.map