"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadResolver = exports.Readable = void 0;
const tslib_1 = require("tslib");
const core_1 = require("nestjs-query/packages/core");
const graphql_1 = require("@nestjs/graphql");
const lodash_omit_1 = tslib_1.__importDefault(require("lodash.omit"));
const common_1 = require("../common");
const decorators_1 = require("../decorators");
const types_1 = require("../types");
const resolver_interface_1 = require("./resolver.interface");
const helpers_1 = require("./helpers");
/**
 * @internal
 * Mixin to add `read` graphql endpoints.
 */
const Readable = (DTOClass, opts) => (BaseClass) => {
    var _a, _b, _c, _d, _e, _f;
    const { baseNameLower, pluralBaseNameLower, baseName } = common_1.getDTONames(DTOClass, opts);
    const readOneQueryName = (_b = (_a = opts.one) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : baseNameLower;
    const readManyQueryName = (_d = (_c = opts.many) === null || _c === void 0 ? void 0 : _c.name) !== null && _d !== void 0 ? _d : pluralBaseNameLower;
    const { QueryArgs = types_1.QueryArgsType(DTOClass, opts) } = opts;
    const { Connection = types_1.ConnectionType(DTOClass, QueryArgs, { ...opts, connectionName: `${baseName}Connection` }), } = opts;
    const commonResolverOpts = lodash_omit_1.default(opts, 'dtoName', 'one', 'many', 'QueryArgs', 'Connection');
    let QA = class QA extends QueryArgs {
    };
    QA = tslib_1.__decorate([
        graphql_1.ArgsType()
    ], QA);
    let FO = class FO extends types_1.FindOneArgsType() {
    };
    FO = tslib_1.__decorate([
        graphql_1.ArgsType()
    ], FO);
    const queryManyHook = decorators_1.getQueryManyHook(DTOClass);
    const findOneHook = decorators_1.getFindOneHook(DTOClass);
    let ReadResolverBase = class ReadResolverBase extends BaseClass {
        async findById(input, context) {
            const authorizeFilter = await helpers_1.getAuthFilter(this.authorizer, context);
            return this.service.findById(input.id, { filter: authorizeFilter });
        }
        async queryMany(query, context) {
            const authorizeFilter = await helpers_1.getAuthFilter(this.authorizer, context);
            const qa = await helpers_1.transformAndValidate(QA, core_1.mergeQuery(query, { filter: authorizeFilter }));
            return Connection.createFromPromise((q) => this.service.query(q), qa, (filter) => this.service.count(filter));
        }
    };
    tslib_1.__decorate([
        decorators_1.ResolverQuery(() => DTOClass, { nullable: true, name: readOneQueryName }, commonResolverOpts, (_e = opts.one) !== null && _e !== void 0 ? _e : {}),
        tslib_1.__param(0, decorators_1.HookArgs(FO, findOneHook)), tslib_1.__param(1, graphql_1.Context()),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [FO, Object]),
        tslib_1.__metadata("design:returntype", Promise)
    ], ReadResolverBase.prototype, "findById", null);
    tslib_1.__decorate([
        decorators_1.ResolverQuery(() => Connection.resolveType, { name: readManyQueryName }, commonResolverOpts, (_f = opts.many) !== null && _f !== void 0 ? _f : {}),
        tslib_1.__param(0, decorators_1.HookArgs(QA, queryManyHook)),
        tslib_1.__param(1, graphql_1.Context()),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [QA, Object]),
        tslib_1.__metadata("design:returntype", Promise)
    ], ReadResolverBase.prototype, "queryMany", null);
    ReadResolverBase = tslib_1.__decorate([
        graphql_1.Resolver(() => DTOClass, { isAbstract: true })
    ], ReadResolverBase);
    return ReadResolverBase;
};
exports.Readable = Readable;
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentional
const ReadResolver = (DTOClass, opts = {}) => exports.Readable(DTOClass, opts)(resolver_interface_1.BaseServiceResolver);
exports.ReadResolver = ReadResolver;
//# sourceMappingURL=read.resolver.js.map