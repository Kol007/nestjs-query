"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteResolver = exports.Deletable = void 0;
const tslib_1 = require("tslib");
// eslint-disable-next-line max-classes-per-file
const core_1 = require("nestjs-query/packages/core");
const lodash_omit_1 = tslib_1.__importDefault(require("lodash.omit"));
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("../common");
const subscription_1 = require("../subscription");
const resolver_interface_1 = require("./resolver.interface");
const types_1 = require("../types");
const decorators_1 = require("../decorators");
const helpers_1 = require("./helpers");
/** @internal */
const defaultDeleteManyInput = (dtoNames, DTOClass) => {
    const { pluralBaseName } = dtoNames;
    let DM = class DM extends types_1.DeleteManyInputType(DTOClass) {
    };
    DM = tslib_1.__decorate([
        graphql_1.InputType(`DeleteMany${pluralBaseName}Input`)
    ], DM);
    return DM;
};
/**
 * @internal
 * Mixin to add `delete` graphql endpoints.
 */
const Deletable = (DTOClass, opts) => (BaseClass) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    const dtoNames = common_1.getDTONames(DTOClass, opts);
    const { baseName, pluralBaseName } = dtoNames;
    const enableSubscriptions = opts.enableSubscriptions === true;
    const enableOneSubscriptions = (_b = (_a = opts.one) === null || _a === void 0 ? void 0 : _a.enableSubscriptions) !== null && _b !== void 0 ? _b : enableSubscriptions;
    const enableManySubscriptions = (_d = (_c = opts.many) === null || _c === void 0 ? void 0 : _c.enableSubscriptions) !== null && _d !== void 0 ? _d : enableSubscriptions;
    const deletedOneEvent = subscription_1.getDTOEventName(subscription_1.EventType.DELETED_ONE, DTOClass);
    const deletedManyEvent = subscription_1.getDTOEventName(subscription_1.EventType.DELETED_MANY, DTOClass);
    const { DeleteOneInput = types_1.DeleteOneInputType(), DeleteManyInput = defaultDeleteManyInput(dtoNames, DTOClass) } = opts;
    const deleteOneHook = decorators_1.getDeleteOneHook(DTOClass);
    const deleteManyHook = decorators_1.getDeleteManyHook(DTOClass);
    const deleteOneMutationName = (_f = (_e = opts.one) === null || _e === void 0 ? void 0 : _e.name) !== null && _f !== void 0 ? _f : `deleteOne${baseName}`;
    const deleteManyMutationName = (_h = (_g = opts.many) === null || _g === void 0 ? void 0 : _g.name) !== null && _h !== void 0 ? _h : `deleteMany${pluralBaseName}`;
    const DMR = types_1.DeleteManyResponseType();
    const commonResolverOpts = lodash_omit_1.default(opts, 'dtoName', 'one', 'many', 'DeleteOneInput', 'DeleteManyInput');
    let DeleteOneResponse = 
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    class DeleteOneResponse extends graphql_1.PartialType(DTOClass, graphql_1.ObjectType) {
    };
    DeleteOneResponse = tslib_1.__decorate([
        graphql_1.ObjectType(`${baseName}DeleteResponse`)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
    ], DeleteOneResponse);
    let DO = class DO extends types_1.MutationArgsType(DeleteOneInput) {
    };
    DO = tslib_1.__decorate([
        graphql_1.ArgsType()
    ], DO);
    let DM = class DM extends types_1.MutationArgsType(DeleteManyInput) {
    };
    DM = tslib_1.__decorate([
        graphql_1.ArgsType()
    ], DM);
    let SI = class SI extends types_1.SubscriptionFilterInputType(DTOClass) {
    };
    SI = tslib_1.__decorate([
        graphql_1.InputType(`DeleteOne${baseName}SubscriptionFilterInput`)
    ], SI);
    let DOSA = class DOSA extends types_1.SubscriptionArgsType(SI) {
    };
    DOSA = tslib_1.__decorate([
        graphql_1.ArgsType()
    ], DOSA);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const deleteOneSubscriptionFilter = helpers_1.createSubscriptionFilter(SI, deletedOneEvent);
    let DeleteResolverBase = class DeleteResolverBase extends BaseClass {
        async deleteOne(input, context) {
            const deleteOne = await helpers_1.transformAndValidate(DO, input);
            const authorizeFilter = await helpers_1.getAuthFilter(this.authorizer, context);
            const deletedResponse = await this.service.deleteOne(deleteOne.input.id, { filter: authorizeFilter });
            if (enableOneSubscriptions) {
                await this.publishDeletedOneEvent(deletedResponse);
            }
            return deletedResponse;
        }
        async deleteMany(input, context) {
            const deleteMany = await helpers_1.transformAndValidate(DM, input);
            const authorizeFilter = await helpers_1.getAuthFilter(this.authorizer, context);
            const deleteManyResponse = await this.service.deleteMany(core_1.mergeFilter(deleteMany.input.filter, authorizeFilter !== null && authorizeFilter !== void 0 ? authorizeFilter : {}));
            if (enableManySubscriptions) {
                await this.publishDeletedManyEvent(deleteManyResponse);
            }
            return deleteManyResponse;
        }
        async publishDeletedOneEvent(dto) {
            if (this.pubSub) {
                await this.pubSub.publish(deletedOneEvent, { [deletedOneEvent]: dto });
            }
        }
        async publishDeletedManyEvent(dmr) {
            if (this.pubSub) {
                await this.pubSub.publish(deletedManyEvent, { [deletedManyEvent]: dmr });
            }
        }
        // input required so graphql subscription filtering will work.
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        deletedOneSubscription(input) {
            if (!enableOneSubscriptions || !this.pubSub) {
                throw new Error(`Unable to subscribe to ${deletedOneEvent}`);
            }
            return this.pubSub.asyncIterator(deletedOneEvent);
        }
        deletedManySubscription() {
            if (!enableManySubscriptions || !this.pubSub) {
                throw new Error(`Unable to subscribe to ${deletedManyEvent}`);
            }
            return this.pubSub.asyncIterator(deletedManyEvent);
        }
    };
    tslib_1.__decorate([
        decorators_1.ResolverMutation(() => DeleteOneResponse, { name: deleteOneMutationName }, commonResolverOpts, (_j = opts.one) !== null && _j !== void 0 ? _j : {}),
        tslib_1.__param(0, decorators_1.MutationArgs(DO, deleteOneHook)), tslib_1.__param(1, graphql_1.Context()),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [DO, Object]),
        tslib_1.__metadata("design:returntype", Promise)
    ], DeleteResolverBase.prototype, "deleteOne", null);
    tslib_1.__decorate([
        decorators_1.ResolverMutation(() => DMR, { name: deleteManyMutationName }, commonResolverOpts, (_k = opts.many) !== null && _k !== void 0 ? _k : {}),
        tslib_1.__param(0, decorators_1.MutationArgs(DM, deleteManyHook)),
        tslib_1.__param(1, graphql_1.Context()),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [DM, Object]),
        tslib_1.__metadata("design:returntype", Promise)
    ], DeleteResolverBase.prototype, "deleteMany", null);
    tslib_1.__decorate([
        decorators_1.ResolverSubscription(() => DeleteOneResponse, { name: deletedOneEvent, filter: deleteOneSubscriptionFilter }, commonResolverOpts, {
            enableSubscriptions: enableOneSubscriptions,
        }),
        tslib_1.__param(0, graphql_1.Args()),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [DOSA]),
        tslib_1.__metadata("design:returntype", Object)
    ], DeleteResolverBase.prototype, "deletedOneSubscription", null);
    tslib_1.__decorate([
        decorators_1.ResolverSubscription(() => DMR, { name: deletedManyEvent }, commonResolverOpts, {
            enableSubscriptions: enableManySubscriptions,
        }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", Object)
    ], DeleteResolverBase.prototype, "deletedManySubscription", null);
    DeleteResolverBase = tslib_1.__decorate([
        graphql_1.Resolver(() => DTOClass, { isAbstract: true })
    ], DeleteResolverBase);
    return DeleteResolverBase;
};
exports.Deletable = Deletable;
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentional
const DeleteResolver = (DTOClass, opts = {}) => exports.Deletable(DTOClass, opts)(resolver_interface_1.BaseServiceResolver);
exports.DeleteResolver = DeleteResolver;
//# sourceMappingURL=delete.resolver.js.map