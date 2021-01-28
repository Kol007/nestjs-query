"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OffsetPagingType = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const graphql_1 = require("@nestjs/graphql");
const validators_1 = require("../../validators");
const constants_1 = require("./constants");
let graphQLPaging = null;
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentional
const OffsetPagingType = () => {
    if (graphQLPaging) {
        return graphQLPaging;
    }
    let GraphQLPagingImpl = class GraphQLPagingImpl {
    };
    GraphQLPagingImpl.strategy = constants_1.PagingStrategies.OFFSET;
    tslib_1.__decorate([
        graphql_1.Field(() => graphql_1.Int, {
            nullable: true,
            description: 'Limit the number of records returned',
        }),
        validators_1.IsUndefined(),
        class_validator_1.IsInt(),
        tslib_1.__metadata("design:type", Number)
    ], GraphQLPagingImpl.prototype, "limit", void 0);
    tslib_1.__decorate([
        graphql_1.Field(() => graphql_1.Int, {
            nullable: true,
            description: 'Offset to start returning records from',
        }),
        validators_1.IsUndefined(),
        class_validator_1.IsInt(),
        tslib_1.__metadata("design:type", Number)
    ], GraphQLPagingImpl.prototype, "offset", void 0);
    GraphQLPagingImpl = tslib_1.__decorate([
        graphql_1.InputType('OffsetPaging')
    ], GraphQLPagingImpl);
    graphQLPaging = GraphQLPagingImpl;
    return graphQLPaging;
};
exports.OffsetPagingType = OffsetPagingType;
//# sourceMappingURL=offset-paging.type.js.map