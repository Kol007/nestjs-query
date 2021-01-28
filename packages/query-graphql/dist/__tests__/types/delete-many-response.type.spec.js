"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const types_1 = require("../../src/types");
const __fixtures__1 = require("../__fixtures__");
describe('DeleteManyResponseType', () => {
    it('should create a @nestjs/graphql object type', async () => {
        const D = types_1.DeleteManyResponseType();
        let TestDeleteManyResponseResolver = class TestDeleteManyResponseResolver {
            deleteTest() {
                return { deletedCount: 1 };
            }
        };
        tslib_1.__decorate([
            graphql_1.Query(() => D),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", Object)
        ], TestDeleteManyResponseResolver.prototype, "deleteTest", null);
        TestDeleteManyResponseResolver = tslib_1.__decorate([
            graphql_1.Resolver()
        ], TestDeleteManyResponseResolver);
        return __fixtures__1.expectSDL([TestDeleteManyResponseResolver], __fixtures__1.deleteManyResponseTypeSDL);
    });
});
//# sourceMappingURL=delete-many-response.type.spec.js.map