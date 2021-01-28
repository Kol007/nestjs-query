"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthorizer = exports.Authorize = void 0;
const core_1 = require("nestjs-query/packages/core");
const auth_1 = require("../auth");
const constants_1 = require("./constants");
const reflector = new core_1.ValueReflector(constants_1.AUTHORIZER_KEY);
function Authorize(optsOrAuthorizerOrClass) {
    return (DTOClass) => {
        if ('authorize' in optsOrAuthorizerOrClass) {
            if ('authorizeRelation' in optsOrAuthorizerOrClass) {
                return reflector.set(DTOClass, optsOrAuthorizerOrClass);
            }
            return reflector.set(DTOClass, auth_1.createDefaultAuthorizer(DTOClass, optsOrAuthorizerOrClass));
        }
        return reflector.set(DTOClass, optsOrAuthorizerOrClass);
    };
}
exports.Authorize = Authorize;
const getAuthorizer = (DTOClass) => {
    return reflector.get(DTOClass);
};
exports.getAuthorizer = getAuthorizer;
//# sourceMappingURL=authorizer.decorator.js.map