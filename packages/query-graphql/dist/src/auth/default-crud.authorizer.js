"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDefaultAuthorizer = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const decorators_1 = require("../decorators");
const tokens_1 = require("./tokens");
const createRelationAuthorizer = (opts) => {
    return {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async authorize(context) {
            var _a;
            return (_a = opts.authorize(context)) !== null && _a !== void 0 ? _a : {};
        },
        authorizeRelation() {
            return Promise.reject(new Error('Not implemented'));
        },
    };
};
function createDefaultAuthorizer(DTOClass, opts) {
    let DefaultAuthorizer = class DefaultAuthorizer {
        constructor(moduleRef) {
            this.authOptions = opts;
            this.relationsAuthorizers = new Map();
            this.relations.forEach((value, key) => {
                if (value.auth) {
                    this.relationsAuthorizers.set(key, createRelationAuthorizer(value.auth));
                }
                else if (decorators_1.getAuthorizer(value.DTO)) {
                    this.relationsAuthorizers.set(key, moduleRef.get(tokens_1.getAuthorizerToken(value.DTO), { strict: false }));
                }
            });
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async authorize(context) {
            var _a, _b;
            return (_b = (_a = this.authOptions) === null || _a === void 0 ? void 0 : _a.authorize(context)) !== null && _b !== void 0 ? _b : {};
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async authorizeRelation(relationName, context) {
            var _a, _b;
            return (_b = (_a = this.relationsAuthorizers.get(relationName)) === null || _a === void 0 ? void 0 : _a.authorize(context)) !== null && _b !== void 0 ? _b : {};
        }
        get relations() {
            const { many = {}, one = {} } = decorators_1.getRelations(DTOClass);
            const relationsMap = new Map();
            Object.keys(many).forEach((relation) => relationsMap.set(relation, many[relation]));
            Object.keys(one).forEach((relation) => relationsMap.set(relation, one[relation]));
            return relationsMap;
        }
    };
    DefaultAuthorizer = tslib_1.__decorate([
        common_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [core_1.ModuleRef])
    ], DefaultAuthorizer);
    return DefaultAuthorizer;
}
exports.createDefaultAuthorizer = createDefaultAuthorizer;
//# sourceMappingURL=default-crud.authorizer.js.map