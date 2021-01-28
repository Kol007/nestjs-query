"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregateFilterType = exports.SubscriptionFilterType = exports.UpdateFilterType = exports.DeleteFilterType = exports.FilterType = void 0;
const tslib_1 = require("tslib");
const core_1 = require("nestjs-query/packages/core");
const graphql_1 = require("@nestjs/graphql");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const upper_case_first_1 = require("upper-case-first");
const field_comparison_1 = require("./field-comparison");
const common_1 = require("../../common");
const decorators_1 = require("../../decorators");
const reflector = new core_1.MapReflector('nestjs-query:filter-type');
function getObjectTypeName(DTOClass) {
    return common_1.getGraphqlObjectName(DTOClass, 'No fields found to create FilterType.');
}
function getOrCreateFilterType(TClass, name, filterableRelations = {}) {
    return reflector.memoize(TClass, name, () => {
        var GraphQLFilter_1;
        const fields = decorators_1.getFilterableFields(TClass);
        if (!fields.length) {
            throw new Error(`No fields found to create GraphQLFilter for ${TClass.name}`);
        }
        const hasRequiredFilters = fields.some((f) => { var _a; return ((_a = f.advancedOptions) === null || _a === void 0 ? void 0 : _a.filterRequired) === true; });
        let GraphQLFilter = GraphQLFilter_1 = class GraphQLFilter {
        };
        GraphQLFilter.hasRequiredFilters = hasRequiredFilters;
        tslib_1.__decorate([
            class_validator_1.ValidateNested(),
            graphql_1.Field(() => [GraphQLFilter_1], { nullable: true }),
            class_transformer_1.Type(() => GraphQLFilter_1),
            tslib_1.__metadata("design:type", Array)
        ], GraphQLFilter.prototype, "and", void 0);
        tslib_1.__decorate([
            class_validator_1.ValidateNested(),
            graphql_1.Field(() => [GraphQLFilter_1], { nullable: true }),
            class_transformer_1.Type(() => GraphQLFilter_1),
            tslib_1.__metadata("design:type", Array)
        ], GraphQLFilter.prototype, "or", void 0);
        GraphQLFilter = GraphQLFilter_1 = tslib_1.__decorate([
            graphql_1.InputType(name)
        ], GraphQLFilter);
        const { baseName } = common_1.getDTONames(TClass);
        fields.forEach(({ propertyName, target, advancedOptions, returnTypeFunc }) => {
            const FC = field_comparison_1.createFilterComparisonType({
                FieldType: target,
                fieldName: `${baseName}${upper_case_first_1.upperCaseFirst(propertyName)}`,
                allowedComparisons: advancedOptions === null || advancedOptions === void 0 ? void 0 : advancedOptions.allowedComparisons,
                returnTypeFunc,
            });
            const nullable = (advancedOptions === null || advancedOptions === void 0 ? void 0 : advancedOptions.filterRequired) !== true;
            class_validator_1.ValidateNested()(GraphQLFilter.prototype, propertyName);
            graphql_1.Field(() => FC, { nullable })(GraphQLFilter.prototype, propertyName);
            class_transformer_1.Type(() => FC)(GraphQLFilter.prototype, propertyName);
        });
        Object.keys(filterableRelations).forEach((field) => {
            const FieldType = filterableRelations[field];
            if (FieldType) {
                const FC = getOrCreateFilterType(FieldType, `${name}${getObjectTypeName(FieldType)}Filter`);
                class_validator_1.ValidateNested()(GraphQLFilter.prototype, field);
                graphql_1.Field(() => FC, { nullable: true })(GraphQLFilter.prototype, field);
                class_transformer_1.Type(() => FC)(GraphQLFilter.prototype, field);
            }
        });
        return GraphQLFilter;
    });
}
function getFilterableRelations(relations) {
    const filterableRelations = {};
    Object.keys(relations).forEach((r) => {
        const opts = relations[r];
        if (opts && opts.allowFiltering) {
            filterableRelations[r] = opts.DTO;
        }
    });
    return filterableRelations;
}
function FilterType(TClass) {
    const { one = {}, many = {} } = decorators_1.getRelations(TClass);
    const filterableRelations = { ...getFilterableRelations(one), ...getFilterableRelations(many) };
    return getOrCreateFilterType(TClass, `${getObjectTypeName(TClass)}Filter`, filterableRelations);
}
exports.FilterType = FilterType;
function DeleteFilterType(TClass) {
    return getOrCreateFilterType(TClass, `${getObjectTypeName(TClass)}DeleteFilter`);
}
exports.DeleteFilterType = DeleteFilterType;
function UpdateFilterType(TClass) {
    return getOrCreateFilterType(TClass, `${getObjectTypeName(TClass)}UpdateFilter`);
}
exports.UpdateFilterType = UpdateFilterType;
function SubscriptionFilterType(TClass) {
    return getOrCreateFilterType(TClass, `${getObjectTypeName(TClass)}SubscriptionFilter`);
}
exports.SubscriptionFilterType = SubscriptionFilterType;
function AggregateFilterType(TClass) {
    return getOrCreateFilterType(TClass, `${getObjectTypeName(TClass)}AggregateFilter`);
}
exports.AggregateFilterType = AggregateFilterType;
//# sourceMappingURL=filter.type.js.map