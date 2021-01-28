"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("nestjs-query/packages/core");
const test_resolver_dto_1 = require("./test-resolver.dto");
let TestService = class TestService extends core_1.NoOpQueryService {
};
TestService = tslib_1.__decorate([
    core_1.QueryService(test_resolver_dto_1.TestResolverDTO)
], TestService);
exports.TestService = TestService;
//# sourceMappingURL=test-resolver.service.js.map