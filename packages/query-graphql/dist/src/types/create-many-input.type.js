"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateManyInputType = void 0;
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const graphql_1 = require("@nestjs/graphql");
/**
 * The abstract input type for create many input types.
 * @param fieldName - the name of field to be exposed in the graphql schema
 * @param InputClass - the InputType to be used.
 */
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentional
function CreateManyInputType(fieldName, InputClass) {
    var _a;
    let CreateManyInput = class CreateManyInput {
        get [_a = fieldName]() {
            return this.input;
        }
        set [fieldName](input) {
            this.input = input;
        }
    };
    tslib_1.__decorate([
        class_transformer_1.Type(() => InputClass),
        class_validator_1.ArrayNotEmpty(),
        class_validator_1.ValidateNested({ each: true }),
        graphql_1.Field(() => [InputClass], { description: 'Array of records to create', name: fieldName }),
        tslib_1.__metadata("design:type", Array)
    ], CreateManyInput.prototype, "input", void 0);
    tslib_1.__decorate([
        class_transformer_1.Type(() => InputClass),
        tslib_1.__metadata("design:type", Array),
        tslib_1.__metadata("design:paramtypes", [])
    ], CreateManyInput.prototype, _a, null);
    CreateManyInput = tslib_1.__decorate([
        graphql_1.InputType({ isAbstract: true })
    ], CreateManyInput);
    return CreateManyInput;
}
exports.CreateManyInputType = CreateManyInputType;
//# sourceMappingURL=create-many-input.type.js.map