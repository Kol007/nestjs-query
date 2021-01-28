"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestResolverDTO = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const decorators_1 = require("../../../src/decorators");
const test_resolver_authorizer_1 = require("./test-resolver.authorizer");
let TestResolverDTO = class TestResolverDTO {
};
tslib_1.__decorate([
    decorators_1.FilterableField(() => graphql_1.ID),
    tslib_1.__metadata("design:type", String)
], TestResolverDTO.prototype, "id", void 0);
tslib_1.__decorate([
    decorators_1.FilterableField(),
    tslib_1.__metadata("design:type", String)
], TestResolverDTO.prototype, "stringField", void 0);
TestResolverDTO = tslib_1.__decorate([
    graphql_1.ObjectType(),
    decorators_1.Authorize(test_resolver_authorizer_1.TestResolverAuthorizer)
], TestResolverDTO);
exports.TestResolverDTO = TestResolverDTO;
//# sourceMappingURL=test-resolver.dto.js.map