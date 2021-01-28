"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestRelationDTO = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const src_1 = require("../../../../src");
let TestRelationDTO = class TestRelationDTO {
};
tslib_1.__decorate([
    src_1.FilterableField(() => graphql_1.ID),
    tslib_1.__metadata("design:type", String)
], TestRelationDTO.prototype, "id", void 0);
tslib_1.__decorate([
    src_1.FilterableField(),
    tslib_1.__metadata("design:type", String)
], TestRelationDTO.prototype, "testResolverId", void 0);
TestRelationDTO = tslib_1.__decorate([
    graphql_1.ObjectType()
], TestRelationDTO);
exports.TestRelationDTO = TestRelationDTO;
//# sourceMappingURL=test-relation.dto.js.map