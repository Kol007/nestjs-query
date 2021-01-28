"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayConnectionType = void 0;
const core_1 = require("nestjs-query/packages/core");
const reflector = new core_1.ValueReflector('nestjs-query:array-connection-type');
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentional
function ArrayConnectionType(TItemClass) {
    return reflector.memoize(TItemClass, () => {
        class AbstractConnection extends Array {
            static async createFromPromise(queryMany, query) {
                return queryMany(query);
            }
        }
        AbstractConnection.resolveType = [TItemClass];
        return AbstractConnection;
    });
}
exports.ArrayConnectionType = ArrayConnectionType;
//# sourceMappingURL=array-connection.type.js.map