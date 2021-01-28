"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregateResolver = exports.Aggregateable = void 0;
const tslib_1 = require("tslib");
const core_1 = require("nestjs-query/packages/core");
const graphql_1 = require("@nestjs/graphql");
const lodash_omit_1 = tslib_1.__importDefault(require("lodash.omit"));
const common_1 = require("../common");
const decorators_1 = require("../decorators");
const types_1 = require("../types");
const helpers_1 = require("./helpers");
const resolver_interface_1 = require("./resolver.interface");
/**
 * @internal
 * Mixin to add `read` graphql endpoints.
 */
const Aggregateable = (DTOClass, opts) => (BaseClass) => {
    const { baseNameLower } = common_1.getDTONames(DTOClass);
    const commonResolverOpts = lodash_omit_1.default(opts, 'dtoName', 'one', 'many', 'QueryArgs', 'Connection');
    const queryName = `${baseNameLower}Aggregate`;
    const AR = types_1.AggregateResponseType(DTOClass);
    let AA = class AA extends types_1.AggregateArgsType(DTOClass) {
    };
    AA = tslib_1.__decorate([
        graphql_1.ArgsType()
    ], AA);
    let AggregateResolverBase = class AggregateResolverBase extends BaseClass {
        async aggregate(args, query, context) {
            const qa = await helpers_1.transformAndValidate(AA, args);
            const authorizeFilter = await helpers_1.getAuthFilter(this.authorizer, context);
            return this.service.aggregate(core_1.mergeFilter(qa.filter || {}, authorizeFilter !== null && authorizeFilter !== void 0 ? authorizeFilter : {}), query);
        }
    };
    tslib_1.__decorate([
        decorators_1.SkipIf(() => !opts || !opts.enabled, decorators_1.ResolverQuery(() => AR, { name: queryName }, commonResolverOpts, opts !== null && opts !== void 0 ? opts : {})),
        tslib_1.__param(0, graphql_1.Args()),
        tslib_1.__param(1, decorators_1.AggregateQueryParam()),
        tslib_1.__param(2, graphql_1.Context()),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [AA, Object, Object]),
        tslib_1.__metadata("design:returntype", Promise)
    ], AggregateResolverBase.prototype, "aggregate", null);
    AggregateResolverBase = tslib_1.__decorate([
        graphql_1.Resolver(() => AR, { isAbstract: true })
    ], AggregateResolverBase);
    return AggregateResolverBase;
};
exports.Aggregateable = Aggregateable;
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentional
const AggregateResolver = (DTOClass, opts) => exports.Aggregateable(DTOClass, opts)(resolver_interface_1.BaseServiceResolver);
exports.AggregateResolver = AggregateResolver;
//# sourceMappingURL=aggregate.resolver.js.map