"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoPagingQueryArgsType = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const paging_1 = require("../paging");
const constants_1 = require("./constants");
const filter_type_1 = require("../filter.type");
const sorting_type_1 = require("../sorting.type");
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentional
function NoPagingQueryArgsType(DTOClass, opts = { ...constants_1.DEFAULT_QUERY_OPTS, pagingStrategy: paging_1.PagingStrategies.NONE }) {
    var _a, _b;
    const F = filter_type_1.FilterType(DTOClass);
    const S = sorting_type_1.SortType(DTOClass);
    let QueryArgs = class QueryArgs {
    };
    QueryArgs.SortType = S;
    QueryArgs.FilterType = F;
    tslib_1.__decorate([
        graphql_1.Field(() => F, {
            defaultValue: !F.hasRequiredFilters ? (_a = opts.defaultFilter) !== null && _a !== void 0 ? _a : constants_1.DEFAULT_QUERY_OPTS.defaultFilter : undefined,
            description: 'Specify to filter the records returned.',
            nullable: false,
        }),
        class_validator_1.ValidateNested(),
        class_transformer_1.Type(() => F),
        tslib_1.__metadata("design:type", Object)
    ], QueryArgs.prototype, "filter", void 0);
    tslib_1.__decorate([
        graphql_1.Field(() => [S], {
            defaultValue: (_b = opts.defaultSort) !== null && _b !== void 0 ? _b : constants_1.DEFAULT_QUERY_OPTS.defaultSort,
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
exports.NoPagingQueryArgsType = NoPagingQueryArgsType;
//# sourceMappingURL=no-paging-query-args.type.js.map