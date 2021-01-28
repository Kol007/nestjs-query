"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OffsetQueryArgsType = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const property_max_validator_1 = require("../../validators/property-max.validator");
const constants_1 = require("./constants");
const paging_1 = require("../paging");
const filter_type_1 = require("../filter.type");
const sorting_type_1 = require("../sorting.type");
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentional
function OffsetQueryArgsType(DTOClass, opts = { ...constants_1.DEFAULT_QUERY_OPTS, pagingStrategy: paging_1.PagingStrategies.OFFSET }) {
    var _a, _b, _c, _d;
    const F = filter_type_1.FilterType(DTOClass);
    const S = sorting_type_1.SortType(DTOClass);
    const P = paging_1.OffsetPagingType();
    let QueryArgs = class QueryArgs {
    };
    QueryArgs.SortType = S;
    QueryArgs.FilterType = F;
    QueryArgs.PageType = P;
    tslib_1.__decorate([
        graphql_1.Field(() => P, {
            defaultValue: { limit: (_a = opts.defaultResultSize) !== null && _a !== void 0 ? _a : constants_1.DEFAULT_QUERY_OPTS.defaultResultSize },
            description: 'Limit or page results.',
        }),
        class_validator_1.ValidateNested(),
        class_validator_1.Validate(property_max_validator_1.PropertyMax, ['limit', (_b = opts.maxResultsSize) !== null && _b !== void 0 ? _b : constants_1.DEFAULT_QUERY_OPTS.maxResultsSize]),
        class_transformer_1.Type(() => P),
        tslib_1.__metadata("design:type", Object)
    ], QueryArgs.prototype, "paging", void 0);
    tslib_1.__decorate([
        graphql_1.Field(() => F, {
            defaultValue: !F.hasRequiredFilters ? (_c = opts.defaultFilter) !== null && _c !== void 0 ? _c : constants_1.DEFAULT_QUERY_OPTS.defaultFilter : undefined,
            description: 'Specify to filter the records returned.',
            nullable: false,
        }),
        class_validator_1.ValidateNested(),
        class_transformer_1.Type(() => F),
        tslib_1.__metadata("design:type", Object)
    ], QueryArgs.prototype, "filter", void 0);
    tslib_1.__decorate([
        graphql_1.Field(() => [S], {
            defaultValue: (_d = opts.defaultSort) !== null && _d !== void 0 ? _d : constants_1.DEFAULT_QUERY_OPTS.defaultSort,
            description: 'Specify to sort results.',
        }),
        class_validator_1.ValidateNested(),
        class_transformer_1.Type(() => S),
        tslib_1.__metadata("design:type", Array)
    ], QueryArgs.prototype, "sorting", void 0);
    QueryArgs = tslib_1.__decorate([
        graphql_1.ArgsType()
    ], QueryArgs);
    return QueryArgs;
}
exports.OffsetQueryArgsType = OffsetQueryArgsType;
//# sourceMappingURL=offset-query-args.type.js.map