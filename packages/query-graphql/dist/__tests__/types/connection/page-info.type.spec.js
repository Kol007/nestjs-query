"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const connection_1 = require("../../../src/types/connection");
const __fixtures__1 = require("../../__fixtures__");
describe('PageInfoType', () => {
    it('should create an edge type for the dto', () => {
        const PageInfo = connection_1.PageInfoType();
        let TestPageInfoResolver = class TestPageInfoResolver {
            test() {
                return undefined;
            }
        };
        tslib_1.__decorate([
            graphql_1.Query(() => PageInfo),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", Object)
        ], TestPageInfoResolver.prototype, "test", null);
        TestPageInfoResolver = tslib_1.__decorate([
            graphql_1.Resolver()
        ], TestPageInfoResolver);
        return __fixtures__1.expectSDL([TestPageInfoResolver], __fixtures__1.pageInfoObjectTypeSDL);
    });
    it('should cache page info type', () => {
        expect(connection_1.PageInfoType()).toBe(connection_1.PageInfoType());
    });
});
//# sourceMappingURL=page-info.type.spec.js.map