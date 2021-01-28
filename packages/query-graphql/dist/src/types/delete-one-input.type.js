"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteOneInputType = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
/** @internal */
let deleteOneInputType = null;
/**
 * The input type for delete one endpoints.
 */
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentional
function DeleteOneInputType() {
    if (deleteOneInputType) {
        return deleteOneInputType;
    }
    let DeleteOneInput = class DeleteOneInput {
    };
    tslib_1.__decorate([
        class_validator_1.IsNotEmpty(),
        graphql_1.Field(() => graphql_1.ID, { description: 'The id of the record to delete.' }),
        tslib_1.__metadata("design:type", Object)
    ], DeleteOneInput.prototype, "id", void 0);
    DeleteOneInput = tslib_1.__decorate([
        graphql_1.InputType()
    ], DeleteOneInput);
    deleteOneInputType = DeleteOneInput;
    return deleteOneInputType;
}
exports.DeleteOneInputType = DeleteOneInputType;
//# sourceMappingURL=delete-one-input.type.js.map