"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadRelationsResolver = exports.ReadRelationsMixin = void 0;
const tslib_1 = require("tslib");
const core_1 = require("nestjs-query/packages/core");
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("../../common");
const decorators_1 = require("../../decorators");
const loader_1 = require("../../loader");
const types_1 = require("../../types");
const helpers_1 = require("../helpers");
const resolver_interface_1 = require("../resolver.interface");
const helpers_2 = require("./helpers");
const ReadOneRelationMixin = (DTOClass, relation) => (Base) => {
    var _a;
    var _b;
    if (relation.disableRead) {
        return Base;
    }
    const commonResolverOpts = helpers_2.removeRelationOpts(relation);
    const relationDTO = relation.DTO;
    const { baseNameLower, baseName } = common_1.getDTONames(relationDTO, { dtoName: relation.dtoName });
    const relationName = (_a = relation.relationName) !== null && _a !== void 0 ? _a : baseNameLower;
    const loaderName = `load${baseName}For${DTOClass.name}`;
    const findLoader = new loader_1.FindRelationsLoader(relationDTO, relationName);
    let ReadOneMixin = class ReadOneMixin extends Base {
        async [_b = `find${baseName}`](dto, context) {
            const relationFilter = await helpers_1.getRelationAuthFilter(baseNameLower, this.authorizer, context);
            return loader_1.DataLoaderFactory.getOrCreateLoader(context, loaderName, findLoader.createLoader(this.service)).load({
                dto,
                filter: relationFilter,
            });
        }
    };
    tslib_1.__decorate([
        decorators_1.ResolverField(baseNameLower, () => relationDTO, { nullable: relation.nullable, complexity: relation.complexity }, commonResolverOpts),
        tslib_1.__param(0, graphql_1.Parent()), tslib_1.__param(1, graphql_1.Context()),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Object]),
        tslib_1.__metadata("design:returntype", Promise)
    ], ReadOneMixin.prototype, _b, null);
    ReadOneMixin = tslib_1.__decorate([
        graphql_1.Resolver(() => DTOClass, { isAbstract: true })
    ], ReadOneMixin);
    return ReadOneMixin;
};
const ReadManyRelationMixin = (DTOClass, relation) => (Base) => {
    var _a;
    var _b;
    if (relation.disableRead) {
        return Base;
    }
    const commonResolverOpts = helpers_2.removeRelationOpts(relation);
    const relationDTO = relation.DTO;
    const dtoName = common_1.getDTONames(DTOClass).baseName;
    const { pluralBaseNameLower, pluralBaseName } = common_1.getDTONames(relationDTO, { dtoName: relation.dtoName });
    const relationName = (_a = relation.relationName) !== null && _a !== void 0 ? _a : pluralBaseNameLower;
    const relationLoaderName = `load${pluralBaseName}For${DTOClass.name}`;
    const countRelationLoaderName = `count${pluralBaseName}For${DTOClass.name}`;
    const queryLoader = new loader_1.QueryRelationsLoader(relationDTO, relationName);
    const countLoader = new loader_1.CountRelationsLoader(relationDTO, relationName);
    const connectionName = `${dtoName}${pluralBaseName}Connection`;
    let RelationQA = class RelationQA extends types_1.QueryArgsType(relationDTO, relation) {
    };
    RelationQA = tslib_1.__decorate([
        graphql_1.ArgsType()
    ], RelationQA);
    // disable keyset pagination for relations otherwise recursive paging will not work
    const CT = types_1.ConnectionType(relationDTO, RelationQA, { ...relation, connectionName, disableKeySetPagination: true });
    let ReadManyMixin = class ReadManyMixin extends Base {
        async [_b = `query${pluralBaseName}`](dto, q, context) {
            const qa = await helpers_1.transformAndValidate(RelationQA, q);
            const relationLoader = loader_1.DataLoaderFactory.getOrCreateLoader(context, relationLoaderName, queryLoader.createLoader(this.service));
            const relationCountLoader = loader_1.DataLoaderFactory.getOrCreateLoader(context, countRelationLoaderName, countLoader.createLoader(this.service));
            const relationFilter = await helpers_1.getRelationAuthFilter(pluralBaseNameLower, this.authorizer, context);
            return CT.createFromPromise((query) => relationLoader.load({ dto, query }), core_1.mergeQuery(qa, { filter: relationFilter }), (filter) => relationCountLoader.load({ dto, filter }));
        }
    };
    tslib_1.__decorate([
        decorators_1.ResolverField(pluralBaseNameLower, () => CT.resolveType, { nullable: relation.nullable, complexity: relation.complexity }, commonResolverOpts),
        tslib_1.__param(0, graphql_1.Parent()),
        tslib_1.__param(1, graphql_1.Args()),
        tslib_1.__param(2, graphql_1.Context()),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, RelationQA, Object]),
        tslib_1.__metadata("design:returntype", Promise)
    ], ReadManyMixin.prototype, _b, null);
    ReadManyMixin = tslib_1.__decorate([
        graphql_1.Resolver(() => DTOClass, { isAbstract: true })
    ], ReadManyMixin);
    return ReadManyMixin;
};
const ReadRelationsMixin = (DTOClass, relations) => (Base) => {
    const { many, one, enableTotalCount } = relations;
    const manyRelations = helpers_2.flattenRelations(many !== null && many !== void 0 ? many : {});
    const oneRelations = helpers_2.flattenRelations(one !== null && one !== void 0 ? one : {});
    const WithMany = manyRelations.reduce((RB, a) => ReadManyRelationMixin(DTOClass, { enableTotalCount, ...a })(RB), Base);
    return oneRelations.reduce((RB, a) => ReadOneRelationMixin(DTOClass, a)(RB), WithMany);
};
exports.ReadRelationsMixin = ReadRelationsMixin;
const ReadRelationsResolver = (DTOClass, relations) => {
    return exports.ReadRelationsMixin(DTOClass, relations)(resolver_interface_1.BaseServiceResolver);
};
exports.ReadRelationsResolver = ReadRelationsResolver;
//# sourceMappingURL=read-relations.resolver.js.map