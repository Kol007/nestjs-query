"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelationsInputType = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
/** @internal */
let relationsInputType = null;
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentional
function RelationsInputType() {
    if (relationsInputType) {
        return relationsInputType;
    }
    let RelationsInput = class RelationsInput {
    };
    tslib_1.__decorate([
        graphql_1.Field(() => graphql_1.ID, { description: 'The id of the record.' }),
        class_validator_1.IsNotEmpty(),
        tslib_1.__metadata("design:type", Object)
    ], RelationsInput.prototype, "id", void 0);
    tslib_1.__decorate([
        graphql_1.Field(() => [graphql_1.ID], { description: 'The ids of the relations.' }),
        class_validator_1.ArrayNotEmpty(),
        class_validator_1.ArrayUnique(),
        class_validator_1.IsNotEmpty({ each: true }),
        tslib_1.__metadata("design:type", Array)
    ], RelationsInput.prototype, "relationIds", void 0);
    RelationsInput = tslib_1.__decorate([
        graphql_1.InputType()
    ], RelationsInput);
    relationsInputType = RelationsInput;
    return relationsInputType;
}
exports.RelationsInputType = RelationsInputType;
//# sourceMappingURL=relations-input.type.js.map