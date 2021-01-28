"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindOneArgsType = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
/** @internal */
let findOneType = null;
/**
 * The input type for delete one endpoints.
 */
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentional
function FindOneArgsType() {
    if (findOneType) {
        return findOneType;
    }
    let FindOneArgs = class FindOneArgs {
    };
    tslib_1.__decorate([
        class_validator_1.IsNotEmpty(),
        graphql_1.Field(() => graphql_1.ID, { description: 'The id of the record to find.' }),
        tslib_1.__metadata("design:type", Object)
    ], FindOneArgs.prototype, "id", void 0);
    FindOneArgs = tslib_1.__decorate([
        graphql_1.ArgsType()
    ], FindOneArgs);
    findOneType = FindOneArgs;
    return findOneType;
}
exports.FindOneArgsType = FindOneArgsType;
//# sourceMappingURL=find-one-args.type.js.map