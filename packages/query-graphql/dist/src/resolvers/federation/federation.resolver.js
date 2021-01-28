"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FederationResolver = void 0;
const relations_1 = require("../relations");
const decorators_1 = require("../../decorators");
const FederationResolver = (DTOClass, opts = {}) => {
    return relations_1.ReadRelationsResolver(DTOClass, decorators_1.getRelations(DTOClass, opts));
};
exports.FederationResolver = FederationResolver;
//# sourceMappingURL=federation.resolver.js.map