"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const types_1 = require("../../src/types");
const __fixtures__1 = require("../__fixtures__");
describe('MutationArgsType', () => {
    let FakeType = class FakeType {
    };
    tslib_1.__decorate([
        graphql_1.Field(),
        tslib_1.__metadata("design:type", String)
    ], FakeType.prototype, "foo", void 0);
    FakeType = tslib_1.__decorate([
        graphql_1.InputType()
    ], FakeType);
    let MutationArgs = class MutationArgs extends types_1.MutationArgsType(FakeType) {
    };
    MutationArgs = tslib_1.__decorate([
        graphql_1.ArgsType()
    ], MutationArgs);
    beforeEach(() => jest.clearAllMocks());
    it('should create an args type with an array field', () => {
        let MutationArgsTypeSpec = class MutationArgsTypeSpec {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            test(input) {
                return 1;
            }
        };
        tslib_1.__decorate([
            graphql_1.Query(() => graphql_1.Int),
            tslib_1.__param(0, graphql_1.Args()),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", [MutationArgs]),
            tslib_1.__metadata("design:returntype", Number)
        ], MutationArgsTypeSpec.prototype, "test", null);
        MutationArgsTypeSpec = tslib_1.__decorate([
            graphql_1.Resolver()
        ], MutationArgsTypeSpec);
        return __fixtures__1.expectSDL([MutationArgsTypeSpec], __fixtures__1.mutationArgsTypeSDL);
    });
});
//# sourceMappingURL=mutation-args.type.spec.js.map