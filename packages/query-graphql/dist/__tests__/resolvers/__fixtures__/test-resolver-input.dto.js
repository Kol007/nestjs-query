"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestResolverInputDTO = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
let TestResolverInputDTO = class TestResolverInputDTO {
};
tslib_1.__decorate([
    graphql_1.Field(() => graphql_1.ID),
    tslib_1.__metadata("design:type", String)
], TestResolverInputDTO.prototype, "id", void 0);
tslib_1.__decorate([
    graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], TestResolverInputDTO.prototype, "stringField", void 0);
TestResolverInputDTO = tslib_1.__decorate([
    graphql_1.InputType()
], TestResolverInputDTO);
exports.TestResolverInputDTO = TestResolverInputDTO;
//# sourceMappingURL=test-resolver-input.dto.js.map