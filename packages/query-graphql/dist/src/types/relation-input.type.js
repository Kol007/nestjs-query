"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelationInputType = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
/** @internal */
let relationInputType = null;
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentional
function RelationInputType() {
    if (relationInputType) {
        return relationInputType;
    }
    let RelationInput = class RelationInput {
    };
    tslib_1.__decorate([
        graphql_1.Field(() => graphql_1.ID, { description: 'The id of the record.' }),
        class_validator_1.IsNotEmpty(),
        tslib_1.__metadata("design:type", Object)
    ], RelationInput.prototype, "id", void 0);
    tslib_1.__decorate([
        graphql_1.Field(() => graphql_1.ID, { description: 'The id of relation.' }),
        class_validator_1.IsNotEmpty(),
        tslib_1.__metadata("design:type", Object)
    ], RelationInput.prototype, "relationId", void 0);
    RelationInput = tslib_1.__decorate([
        graphql_1.InputType()
    ], RelationInput);
    relationInputType = RelationInput;
    return relationInputType;
}
exports.RelationInputType = RelationInputType;
//# sourceMappingURL=relation-input.type.js.map