"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.federationRelationSDL = exports.federationRelationEmptySDL = exports.TestRelationDTO = void 0;
const path_1 = require("path");
const __fixtures__1 = require("../../../__fixtures__");
var test_relation_dto_1 = require("./test-relation.dto");
Object.defineProperty(exports, "TestRelationDTO", { enumerable: true, get: function () { return test_relation_dto_1.TestRelationDTO; } });
exports.federationRelationEmptySDL = __fixtures__1.readGraphql(path_1.resolve(__dirname, 'federation', 'federation-relation-empty.resolver.graphql'));
exports.federationRelationSDL = __fixtures__1.readGraphql(path_1.resolve(__dirname, 'federation', 'federation-relation.resolver.graphql'));
//# sourceMappingURL=index.js.map