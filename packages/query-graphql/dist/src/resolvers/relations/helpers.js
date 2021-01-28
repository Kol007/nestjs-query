"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getModifyRelationOptions = exports.removeRelationOpts = exports.flattenRelations = void 0;
const tslib_1 = require("tslib");
const lodash_omit_1 = tslib_1.__importDefault(require("lodash.omit"));
const helpers_1 = require("../helpers");
const flattenRelations = (relationOptions) => {
    return Object.keys(relationOptions).map((name) => ({ dtoName: name, ...relationOptions[name] }));
};
exports.flattenRelations = flattenRelations;
const removeRelationOpts = (opts) => {
    return lodash_omit_1.default(opts, 'DTO', 'keys', 'nullable', 'dtoName', 'relationName', 'disableRead', 'disableUpdate', 'disableRemove');
};
exports.removeRelationOpts = removeRelationOpts;
const getModifyRelationOptions = async (relationName, authorizer, context) => {
    if (!authorizer) {
        return undefined;
    }
    return {
        filter: await helpers_1.getAuthFilter(authorizer, context),
        relationFilter: await helpers_1.getRelationAuthFilter(relationName, authorizer, context),
    };
};
exports.getModifyRelationOptions = getModifyRelationOptions;
//# sourceMappingURL=helpers.js.map