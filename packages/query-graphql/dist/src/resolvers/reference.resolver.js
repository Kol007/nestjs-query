"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferenceResolver = exports.Referenceable = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const common_2 = require("../common");
const resolver_interface_1 = require("./resolver.interface");
/**
 * @internal
 * Mixin to expose `resolveReference` for a DTO on the resolver.
 */
const Referenceable = (DTOClass, opts) => (BaseClass) => {
    if (!('key' in opts) || opts.key === undefined) {
        return BaseClass;
    }
    const { key } = opts;
    let ResolveReferenceResolverBase = class ResolveReferenceResolverBase extends BaseClass {
        async resolveReference(representation) {
            const id = representation[key];
            if (id === undefined) {
                throw new common_1.BadRequestException(`Unable to resolve reference, missing required key ${key} for ${common_2.getDTONames(DTOClass).baseName}`);
            }
            return this.service.getById(representation[key]);
        }
    };
    tslib_1.__decorate([
        graphql_1.ResolveReference(),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", Promise)
    ], ResolveReferenceResolverBase.prototype, "resolveReference", null);
    ResolveReferenceResolverBase = tslib_1.__decorate([
        graphql_1.Resolver(() => DTOClass, { isAbstract: true })
    ], ResolveReferenceResolverBase);
    return ResolveReferenceResolverBase;
};
exports.Referenceable = Referenceable;
const ReferenceResolver = (DTOClass, opts = {}) => exports.Referenceable(DTOClass, opts)(resolver_interface_1.BaseServiceResolver);
exports.ReferenceResolver = ReferenceResolver;
//# sourceMappingURL=reference.resolver.js.map