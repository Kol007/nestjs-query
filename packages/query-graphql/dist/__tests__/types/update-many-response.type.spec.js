"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const src_1 = require("../../src");
const __fixtures__1 = require("../__fixtures__");
describe('UpdateManyResponseType', () => {
    const URT = src_1.UpdateManyResponseType();
    it('should create a @nestjs/graphql object type', async () => {
        let UpdateManyResponseTypeResolver = class UpdateManyResponseTypeResolver {
            updateTest() {
                return { updatedCount: 1 };
            }
        };
        tslib_1.__decorate([
            graphql_1.Query(() => URT),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", Object)
        ], UpdateManyResponseTypeResolver.prototype, "updateTest", null);
        UpdateManyResponseTypeResolver = tslib_1.__decorate([
            graphql_1.Resolver()
        ], UpdateManyResponseTypeResolver);
        return __fixtures__1.expectSDL([UpdateManyResponseTypeResolver], __fixtures__1.updateManyResponseTypeSDL);
    });
});
//# sourceMappingURL=update-many-response.type.spec.js.map