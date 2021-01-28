"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOneInputType = void 0;
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const graphql_1 = require("@nestjs/graphql");
/**
 * The abstract input type for create one operations.
 *
 * @param fieldName - The name of the field to be exposed in the graphql schema
 * @param InputClass - The InputType to be used.
 */
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentional
function CreateOneInputType(fieldName, InputClass) {
    var _a;
    let CreateOneInput = class CreateOneInput {
        get [_a = fieldName]() {
            return this.input;
        }
        set [fieldName](input) {
            this.input = input;
        }
    };
    tslib_1.__decorate([
        class_transformer_1.Type(() => InputClass),
        class_validator_1.ValidateNested(),
        graphql_1.Field(() => InputClass, { description: 'The record to create', name: fieldName }),
        tslib_1.__metadata("design:type", Object)
    ], CreateOneInput.prototype, "input", void 0);
    tslib_1.__decorate([
        class_transformer_1.Type(() => InputClass),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [])
    ], CreateOneInput.prototype, _a, null);
    CreateOneInput = tslib_1.__decorate([
        graphql_1.InputType({ isAbstract: true })
    ], CreateOneInput);
    return CreateOneInput;
}
exports.CreateOneInputType = CreateOneInputType;
//# sourceMappingURL=create-one-input.type.js.map