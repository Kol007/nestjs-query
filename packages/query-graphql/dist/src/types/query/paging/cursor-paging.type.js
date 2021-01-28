"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursorPagingType = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const graphql_1 = require("@nestjs/graphql");
const cursor_scalar_1 = require("../../cursor.scalar");
const validators_1 = require("../../validators");
const constants_1 = require("./constants");
/** @internal */
let graphQLCursorPaging = null;
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentional
const CursorPagingType = () => {
    if (graphQLCursorPaging) {
        return graphQLCursorPaging;
    }
    // based on https://github.com/MichalLytek/type-graphql/issues/142#issuecomment-433120114
    let GraphQLCursorPagingImpl = class GraphQLCursorPagingImpl {
    };
    GraphQLCursorPagingImpl.strategy = constants_1.PagingStrategies.CURSOR;
    tslib_1.__decorate([
        graphql_1.Field(() => cursor_scalar_1.ConnectionCursorScalar, {
            nullable: true,
            description: 'Paginate before opaque cursor',
        }),
        validators_1.IsUndefined(),
        class_validator_1.Validate(validators_1.CannotUseWithout, ['last']),
        class_validator_1.Validate(validators_1.CannotUseWith, ['after', 'first']),
        tslib_1.__metadata("design:type", String)
    ], GraphQLCursorPagingImpl.prototype, "before", void 0);
    tslib_1.__decorate([
        graphql_1.Field(() => cursor_scalar_1.ConnectionCursorScalar, {
            nullable: true,
            description: 'Paginate after opaque cursor',
        }),
        validators_1.IsUndefined(),
        class_validator_1.Validate(validators_1.CannotUseWithout, ['first']),
        class_validator_1.Validate(validators_1.CannotUseWith, ['before', 'last']),
        tslib_1.__metadata("design:type", String)
    ], GraphQLCursorPagingImpl.prototype, "after", void 0);
    tslib_1.__decorate([
        graphql_1.Field(() => graphql_1.Int, { nullable: true, description: 'Paginate first' }),
        validators_1.IsUndefined(),
        class_validator_1.IsPositive(),
        class_validator_1.Min(1),
        class_validator_1.Validate(validators_1.CannotUseWith, ['before', 'last']),
        tslib_1.__metadata("design:type", Number)
    ], GraphQLCursorPagingImpl.prototype, "first", void 0);
    tslib_1.__decorate([
        graphql_1.Field(() => graphql_1.Int, { nullable: true, description: 'Paginate last' }),
        validators_1.IsUndefined()
        // Required `before`. This is a weird corner case.
        // We'd have to invert the ordering of query to get the last few items then re-invert it when emitting the results.
        // We'll just ignore it for now.
        ,
        class_validator_1.Validate(validators_1.CannotUseWithout, ['before']),
        class_validator_1.Validate(validators_1.CannotUseWith, ['after', 'first']),
        class_validator_1.Min(1),
        class_validator_1.IsPositive(),
        tslib_1.__metadata("design:type", Number)
    ], GraphQLCursorPagingImpl.prototype, "last", void 0);
    GraphQLCursorPagingImpl = tslib_1.__decorate([
        graphql_1.InputType('CursorPaging')
    ], GraphQLCursorPagingImpl);
    graphQLCursorPaging = GraphQLCursorPagingImpl;
    return graphQLCursorPaging;
};
exports.CursorPagingType = CursorPagingType;
//# sourceMappingURL=cursor-paging.type.js.map