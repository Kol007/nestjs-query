"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuthorizerProviders = void 0;
const auth_1 = require("../auth");
const decorators_1 = require("../decorators");
function createServiceProvider(DTOClass) {
    const token = auth_1.getAuthorizerToken(DTOClass);
    const authorizer = decorators_1.getAuthorizer(DTOClass);
    if (!authorizer) {
        // create default authorizer in case any relations have an authorizers
        return { provide: token, useClass: auth_1.createDefaultAuthorizer(DTOClass, { authorize: () => ({}) }) };
    }
    return { provide: token, useClass: authorizer };
}
const createAuthorizerProviders = (DTOClasses) => {
    return DTOClasses.map((DTOClass) => createServiceProvider(DTOClass));
};
exports.createAuthorizerProviders = createAuthorizerProviders;
//# sourceMappingURL=authorizer.provider.js.map