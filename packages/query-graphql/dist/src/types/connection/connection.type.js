"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionType = void 0;
const query_1 = require("../query");
const array_connection_type_1 = require("./array-connection.type");
const cursor_1 = require("./cursor");
const query_args_type_1 = require("../query/query-args.type");
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentional
function ConnectionType(DTOClass, QueryArgsType, opts) {
    if (query_args_type_1.isStaticQueryArgsType(QueryArgsType)) {
        const { PageType } = QueryArgsType;
        if (!PageType || PageType.strategy === query_1.PagingStrategies.OFFSET) {
            return array_connection_type_1.ArrayConnectionType(DTOClass);
        }
    }
    let cursorOpts = opts;
    if (!cursorOpts && !query_args_type_1.isStaticQueryArgsType(QueryArgsType)) {
        cursorOpts = QueryArgsType;
    }
    return cursor_1.CursorConnectionType(DTOClass, cursorOpts);
}
exports.ConnectionType = ConnectionType;
//# sourceMappingURL=connection.type.js.map