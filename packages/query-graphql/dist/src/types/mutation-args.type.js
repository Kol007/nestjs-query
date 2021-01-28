"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MutationArgsType = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentional
function MutationArgsType(InputClass) {
    let MutationArgs = class MutationArgs {
    };
    tslib_1.__decorate([
        class_transformer_1.Type(() => InputClass),
        class_validator_1.ValidateNested(),
        graphql_1.Field(() => InputClass),
        tslib_1.__metadata("design:type", Object)
    ], MutationArgs.prototype, "input", void 0);
    MutationArgs = tslib_1.__decorate([
        graphql_1.ArgsType()
    ], MutationArgs);
    return MutationArgs;
}
exports.MutationArgsType = MutationArgsType;
//# sourceMappingURL=mutation-args.type.js.map