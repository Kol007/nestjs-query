"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregateRelationsResolver = exports.AggregateRelationsMixin = void 0;
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
const AggregateRelationMixin = (DTOClass, relation) => (Base) => {
    var _a;
    var _b;
    if (!relation.enableAggregate) {
        return Base;
    }
    const commonResolverOpts = helpers_2.removeRelationOpts(relation);
    const relationDTO = relation.DTO;
    const dtoName = common_1.getDTONames(DTOClass).baseName;
    const { baseNameLower, pluralBaseNameLower, pluralBaseName } = common_1.getDTONames(relationDTO, {
        dtoName: relation.dtoName,
    });
    const relationName = (_a = relation.relationName) !== null && _a !== void 0 ? _a : pluralBaseNameLower;
    const aggregateRelationLoaderName = `aggregate${pluralBaseName}For${dtoName}`;
    const aggregateLoader = new loader_1.AggregateRelationsLoader(relationDTO, relationName);
    let RelationQA = class RelationQA extends types_1.AggregateArgsType(relationDTO) {
    };
    RelationQA = tslib_1.__decorate([
        graphql_1.ArgsType()
    ], RelationQA);
    const AR = types_1.AggregateResponseType(relationDTO, { prefix: `${dtoName}${pluralBaseName}` });
    let AggregateMixin = class AggregateMixin extends Base {
        async [_b = `aggregate${pluralBaseName}`](dto, q, aggregateQuery, context) {
            var _a;
            const qa = await helpers_1.transformAndValidate(RelationQA, q);
            const loader = loader_1.DataLoaderFactory.getOrCreateLoader(context, aggregateRelationLoaderName, aggregateLoader.createLoader(this.service));
            const relationFilter = await helpers_1.getRelationAuthFilter(baseNameLower, this.authorizer, context);
            return loader.load({
                dto,
                filter: core_1.mergeFilter((_a = qa.filter) !== null && _a !== void 0 ? _a : {}, relationFilter !== null && relationFilter !== void 0 ? relationFilter : {}),
                aggregate: aggregateQuery,
            });
        }
    };
    tslib_1.__decorate([
        decorators_1.ResolverField(`${pluralBaseNameLower}Aggregate`, () => AR, {}, commonResolverOpts),
        tslib_1.__param(0, graphql_1.Parent()),
        tslib_1.__param(1, graphql_1.Args()),
        tslib_1.__param(2, decorators_1.AggregateQueryParam()),
        tslib_1.__param(3, graphql_1.Context()),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, RelationQA, Object, Object]),
        tslib_1.__metadata("design:returntype", Promise)
    ], AggregateMixin.prototype, _b, null);
    AggregateMixin = tslib_1.__decorate([
        graphql_1.Resolver(() => DTOClass, { isAbstract: true })
    ], AggregateMixin);
    return AggregateMixin;
};
const AggregateRelationsMixin = (DTOClass, relations) => (Base) => {
    const { many, enableAggregate } = relations;
    const manyRelations = helpers_2.flattenRelations(many !== null && many !== void 0 ? many : {});
    return manyRelations.reduce((RB, a) => AggregateRelationMixin(DTOClass, { enableAggregate, ...a })(RB), Base);
};
exports.AggregateRelationsMixin = AggregateRelationsMixin;
const AggregateRelationsResolver = (DTOClass, relations) => {
    return exports.AggregateRelationsMixin(DTOClass, relations)(resolver_interface_1.BaseServiceResolver);
};
exports.AggregateRelationsResolver = AggregateRelationsResolver;
//# sourceMappingURL=aggregate-relations.resolver.js.map