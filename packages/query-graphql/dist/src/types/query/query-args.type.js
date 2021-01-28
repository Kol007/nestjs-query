"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryArgsType = exports.isStaticQueryArgsType = void 0;
const paging_1 = require("./paging");
const query_args_1 = require("./query-args");
// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
const isStaticQueryArgsType = (obj) => {
    return typeof obj === 'function' && ('PageType' in obj || 'SortType' in obj || 'FilterType' in obj);
};
exports.isStaticQueryArgsType = isStaticQueryArgsType;
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentional
function QueryArgsType(DTOClass, opts = { ...query_args_1.DEFAULT_QUERY_OPTS, pagingStrategy: paging_1.PagingStrategies.CURSOR }) {
    if (opts.pagingStrategy === paging_1.PagingStrategies.OFFSET) {
        return query_args_1.OffsetQueryArgsType(DTOClass, opts);
    }
    if (opts.pagingStrategy === paging_1.PagingStrategies.NONE) {
        return query_args_1.NoPagingQueryArgsType(DTOClass, opts);
    }
    return query_args_1.CursorQueryArgsType(DTOClass, opts);
}
exports.QueryArgsType = QueryArgsType;
//# sourceMappingURL=query-args.type.js.map