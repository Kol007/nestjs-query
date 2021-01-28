"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRelationsResolver = exports.UpdateRelationsMixin = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("../../common");
const decorators_1 = require("../../decorators");
const types_1 = require("../../types");
const helpers_1 = require("../helpers");
const resolver_interface_1 = require("../resolver.interface");
const helpers_2 = require("./helpers");
const UpdateOneRelationMixin = (DTOClass, relation) => (Base) => {
    var _a;
    var _b;
    if (relation.disableUpdate) {
        return Base;
    }
    const commonResolverOpts = helpers_2.removeRelationOpts(relation);
    const relationDTO = relation.DTO;
    const dtoNames = common_1.getDTONames(DTOClass);
    const { baseNameLower, baseName } = common_1.getDTONames(relationDTO, { dtoName: relation.dtoName });
    const relationName = (_a = relation.relationName) !== null && _a !== void 0 ? _a : baseNameLower;
    let SetArgs = class SetArgs extends types_1.MutationArgsType(types_1.RelationInputType()) {
    };
    SetArgs = tslib_1.__decorate([
        graphql_1.ArgsType()
    ], SetArgs);
    let UpdateOneMixin = class UpdateOneMixin extends Base {
        async [_b = `set${baseName}On${dtoNames.baseName}`](setArgs, context) {
            const { input } = await helpers_1.transformAndValidate(SetArgs, setArgs);
            const opts = await helpers_2.getModifyRelationOptions(baseNameLower, this.authorizer, context);
            return this.service.setRelation(relationName, input.id, input.relationId, opts);
        }
    };
    tslib_1.__decorate([
        decorators_1.ResolverMutation(() => DTOClass, {}, commonResolverOpts),
        tslib_1.__param(0, graphql_1.Args()),
        tslib_1.__param(1, graphql_1.Context()),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [SetArgs, Object]),
        tslib_1.__metadata("design:returntype", Promise)
    ], UpdateOneMixin.prototype, _b, null);
    UpdateOneMixin = tslib_1.__decorate([
        graphql_1.Resolver(() => DTOClass, { isAbstract: true })
    ], UpdateOneMixin);
    return UpdateOneMixin;
};
const UpdateManyRelationMixin = (DTOClass, relation) => (Base) => {
    var _a;
    var _b;
    if (relation.disableUpdate) {
        return Base;
    }
    const commonResolverOpts = helpers_2.removeRelationOpts(relation);
    const relationDTO = relation.DTO;
    const dtoNames = common_1.getDTONames(DTOClass);
    const { pluralBaseNameLower, pluralBaseName } = common_1.getDTONames(relationDTO, { dtoName: relation.dtoName });
    const relationName = (_a = relation.relationName) !== null && _a !== void 0 ? _a : pluralBaseNameLower;
    let AddArgs = class AddArgs extends types_1.MutationArgsType(types_1.RelationsInputType()) {
    };
    AddArgs = tslib_1.__decorate([
        graphql_1.ArgsType()
    ], AddArgs);
    let UpdateManyMixin = class UpdateManyMixin extends Base {
        async [_b = `add${pluralBaseName}To${dtoNames.baseName}`](addArgs, context) {
            const { input } = await helpers_1.transformAndValidate(AddArgs, addArgs);
            const opts = await helpers_2.getModifyRelationOptions(pluralBaseNameLower, this.authorizer, context);
            return this.service.addRelations(relationName, input.id, input.relationIds, opts);
        }
    };
    tslib_1.__decorate([
        decorators_1.ResolverMutation(() => DTOClass, {}, commonResolverOpts),
        tslib_1.__param(0, graphql_1.Args()),
        tslib_1.__param(1, graphql_1.Context()),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [AddArgs, Object]),
        tslib_1.__metadata("design:returntype", Promise)
    ], UpdateManyMixin.prototype, _b, null);
    UpdateManyMixin = tslib_1.__decorate([
        graphql_1.Resolver(() => DTOClass, { isAbstract: true })
    ], UpdateManyMixin);
    return UpdateManyMixin;
};
const UpdateRelationsMixin = (DTOClass, relations) => (Base) => {
    var _a, _b;
    const manyRelations = helpers_2.flattenRelations((_a = relations.many) !== null && _a !== void 0 ? _a : {});
    const oneRelations = helpers_2.flattenRelations((_b = relations.one) !== null && _b !== void 0 ? _b : {});
    const WithMany = manyRelations.reduce((RB, a) => UpdateManyRelationMixin(DTOClass, a)(RB), Base);
    return oneRelations.reduce((RB, a) => UpdateOneRelationMixin(DTOClass, a)(RB), WithMany);
};
exports.UpdateRelationsMixin = UpdateRelationsMixin;
const UpdateRelationsResolver = (DTOClass, relations) => {
    return exports.UpdateRelationsMixin(DTOClass, relations)(resolver_interface_1.BaseServiceResolver);
};
exports.UpdateRelationsResolver = UpdateRelationsResolver;
//# sourceMappingURL=update-relations.resolver.js.map