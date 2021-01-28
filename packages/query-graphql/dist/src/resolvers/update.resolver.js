"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateResolver = exports.Updateable = void 0;
const tslib_1 = require("tslib");
// eslint-disable-next-line max-classes-per-file
const core_1 = require("nestjs-query/packages/core");
const graphql_1 = require("@nestjs/graphql");
const lodash_omit_1 = tslib_1.__importDefault(require("lodash.omit"));
const common_1 = require("../common");
const subscription_1 = require("../subscription");
const types_1 = require("../types");
const resolver_interface_1 = require("./resolver.interface");
const decorators_1 = require("../decorators");
const helpers_1 = require("./helpers");
/** @internal */
const defaultUpdateInput = (dtoNames, DTOClass) => {
    let UpdateType = 
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    class UpdateType extends graphql_1.PartialType(DTOClass, graphql_1.InputType) {
    };
    UpdateType = tslib_1.__decorate([
        graphql_1.InputType(`Update${dtoNames.baseName}`)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
    ], UpdateType);
    return UpdateType;
};
/** @internal */
const defaultUpdateOneInput = (dtoNames, UpdateDTO) => {
    const { baseName } = dtoNames;
    let UM = class UM extends types_1.UpdateOneInputType(UpdateDTO) {
    };
    UM = tslib_1.__decorate([
        graphql_1.InputType(`UpdateOne${baseName}Input`)
    ], UM);
    return UM;
};
/** @internal */
const defaultUpdateManyInput = (dtoNames, DTOClass, UpdateDTO) => {
    const { pluralBaseName } = dtoNames;
    let UM = class UM extends types_1.UpdateManyInputType(DTOClass, UpdateDTO) {
    };
    UM = tslib_1.__decorate([
        graphql_1.InputType(`UpdateMany${pluralBaseName}Input`)
    ], UM);
    return UM;
};
const lookupUpdateOneHook = (DTOClass, UpdateDTOClass) => {
    var _a;
    return (_a = decorators_1.getUpdateOneHook(UpdateDTOClass)) !== null && _a !== void 0 ? _a : decorators_1.getUpdateOneHook(DTOClass);
};
const lookupUpdateManyHook = (DTOClass, UpdateDTOClass) => {
    var _a;
    return ((_a = decorators_1.getUpdateManyHook(UpdateDTOClass)) !== null && _a !== void 0 ? _a : decorators_1.getUpdateManyHook(DTOClass));
};
/**
 * @internal
 * Mixin to add `update` graphql endpoints.
 */
const Updateable = (DTOClass, opts) => (BaseClass) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    const dtoNames = common_1.getDTONames(DTOClass, opts);
    const { baseName, pluralBaseName } = dtoNames;
    const UMR = types_1.UpdateManyResponseType();
    const enableSubscriptions = opts.enableSubscriptions === true;
    const enableOneSubscriptions = (_b = (_a = opts.one) === null || _a === void 0 ? void 0 : _a.enableSubscriptions) !== null && _b !== void 0 ? _b : enableSubscriptions;
    const enableManySubscriptions = (_d = (_c = opts.many) === null || _c === void 0 ? void 0 : _c.enableSubscriptions) !== null && _d !== void 0 ? _d : enableSubscriptions;
    const updateOneEvent = subscription_1.getDTOEventName(subscription_1.EventType.UPDATED_ONE, DTOClass);
    const updateManyEvent = subscription_1.getDTOEventName(subscription_1.EventType.UPDATED_MANY, DTOClass);
    const { UpdateDTOClass = defaultUpdateInput(dtoNames, DTOClass), UpdateOneInput = defaultUpdateOneInput(dtoNames, UpdateDTOClass), UpdateManyInput = defaultUpdateManyInput(dtoNames, DTOClass, UpdateDTOClass), } = opts;
    const updateOneHook = lookupUpdateOneHook(DTOClass, UpdateDTOClass);
    const updateManyHook = lookupUpdateManyHook(DTOClass, UpdateDTOClass);
    const updateOneMutationName = (_f = (_e = opts.one) === null || _e === void 0 ? void 0 : _e.name) !== null && _f !== void 0 ? _f : `updateOne${baseName}`;
    const updateManyMutationName = (_h = (_g = opts.many) === null || _g === void 0 ? void 0 : _g.name) !== null && _h !== void 0 ? _h : `updateMany${pluralBaseName}`;
    const commonResolverOpts = lodash_omit_1.default(opts, 'dtoName', 'one', 'many', 'UpdateDTOClass', 'UpdateOneInput', 'UpdateManyInput');
    let UO = class UO extends types_1.MutationArgsType(UpdateOneInput) {
    };
    UO = tslib_1.__decorate([
        graphql_1.ArgsType()
    ], UO);
    let UM = class UM extends types_1.MutationArgsType(UpdateManyInput) {
    };
    UM = tslib_1.__decorate([
        graphql_1.ArgsType()
    ], UM);
    let SI = class SI extends types_1.SubscriptionFilterInputType(DTOClass) {
    };
    SI = tslib_1.__decorate([
        graphql_1.InputType(`UpdateOne${baseName}SubscriptionFilterInput`)
    ], SI);
    let UOSA = class UOSA extends types_1.SubscriptionArgsType(SI) {
    };
    UOSA = tslib_1.__decorate([
        graphql_1.ArgsType()
    ], UOSA);
    const updateOneSubscriptionFilter = helpers_1.createSubscriptionFilter(SI, updateOneEvent);
    let UpdateResolverBase = class UpdateResolverBase extends BaseClass {
        async updateOne(input, context) {
            const updateOne = await helpers_1.transformAndValidate(UO, input);
            const authorizeFilter = await helpers_1.getAuthFilter(this.authorizer, context);
            const { id, update } = updateOne.input;
            const updateResult = await this.service.updateOne(id, update, { filter: authorizeFilter });
            if (enableOneSubscriptions) {
                await this.publishUpdatedOneEvent(updateResult);
            }
            return updateResult;
        }
        async updateMany(input, context) {
            const updateMany = await helpers_1.transformAndValidate(UM, input);
            const authorizeFilter = await helpers_1.getAuthFilter(this.authorizer, context);
            const { update, filter } = updateMany.input;
            const updateManyResponse = await this.service.updateMany(update, core_1.mergeFilter(filter, authorizeFilter !== null && authorizeFilter !== void 0 ? authorizeFilter : {}));
            if (enableManySubscriptions) {
                await this.publishUpdatedManyEvent(updateManyResponse);
            }
            return updateManyResponse;
        }
        async publishUpdatedOneEvent(dto) {
            if (this.pubSub) {
                await this.pubSub.publish(updateOneEvent, { [updateOneEvent]: dto });
            }
        }
        async publishUpdatedManyEvent(umr) {
            if (this.pubSub) {
                await this.pubSub.publish(updateManyEvent, { [updateManyEvent]: umr });
            }
        }
        // input required so graphql subscription filtering will work.
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        updatedOneSubscription(input) {
            if (!enableOneSubscriptions || !this.pubSub) {
                throw new Error(`Unable to subscribe to ${updateOneEvent}`);
            }
            return this.pubSub.asyncIterator(updateOneEvent);
        }
        updatedManySubscription() {
            if (!enableManySubscriptions || !this.pubSub) {
                throw new Error(`Unable to subscribe to ${updateManyEvent}`);
            }
            return this.pubSub.asyncIterator(updateManyEvent);
        }
    };
    tslib_1.__decorate([
        decorators_1.ResolverMutation(() => DTOClass, { name: updateOneMutationName }, commonResolverOpts, (_j = opts.one) !== null && _j !== void 0 ? _j : {}),
        tslib_1.__param(0, decorators_1.MutationArgs(UO, updateOneHook)), tslib_1.__param(1, graphql_1.Context()),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [UO, Object]),
        tslib_1.__metadata("design:returntype", Promise)
    ], UpdateResolverBase.prototype, "updateOne", null);
    tslib_1.__decorate([
        decorators_1.ResolverMutation(() => UMR, { name: updateManyMutationName }, commonResolverOpts, (_k = opts.many) !== null && _k !== void 0 ? _k : {}),
        tslib_1.__param(0, decorators_1.MutationArgs(UM, updateManyHook)),
        tslib_1.__param(1, graphql_1.Context()),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [UM, Object]),
        tslib_1.__metadata("design:returntype", Promise)
    ], UpdateResolverBase.prototype, "updateMany", null);
    tslib_1.__decorate([
        decorators_1.ResolverSubscription(() => DTOClass, { name: updateOneEvent, filter: updateOneSubscriptionFilter }, commonResolverOpts, {
            enableSubscriptions: enableOneSubscriptions,
        }),
        tslib_1.__param(0, graphql_1.Args()),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [UOSA]),
        tslib_1.__metadata("design:returntype", Object)
    ], UpdateResolverBase.prototype, "updatedOneSubscription", null);
    tslib_1.__decorate([
        decorators_1.ResolverSubscription(() => UMR, { name: updateManyEvent }, commonResolverOpts, {
            enableSubscriptions: enableManySubscriptions,
        }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", Object)
    ], UpdateResolverBase.prototype, "updatedManySubscription", null);
    UpdateResolverBase = tslib_1.__decorate([
        graphql_1.Resolver(() => DTOClass, { isAbstract: true })
    ], UpdateResolverBase);
    return UpdateResolverBase;
};
exports.Updateable = Updateable;
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentional
const UpdateResolver = (DTOClass, opts = {}) => exports.Updateable(DTOClass, opts)(resolver_interface_1.BaseServiceResolver);
exports.UpdateResolver = UpdateResolver;
//# sourceMappingURL=update.resolver.js.map