"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhereBuilder = void 0;
const mongoose_1 = require("mongoose");
const comparison_builder_1 = require("./comparison.builder");
const { ObjectId } = mongoose_1.Types;
/**
 * @internal
 * Builds a WHERE clause from a Filter.
 */
class WhereBuilder {
    constructor(comparisonBuilder = new comparison_builder_1.ComparisonBuilder()) {
        this.comparisonBuilder = comparisonBuilder;
    }
    /**
     * Builds a WHERE clause from a Filter.
     * @param filter - the filter to build the WHERE clause from.
     * @param schema - mongoose schema.
     */
    build(filter, schema) {
        const { and, or } = filter;
        let ands = [];
        let ors = [];
        let filterQuery = {};
        if (and && and.length) {
            ands = and.map((f) => this.build(f, schema));
        }
        if (or && or.length) {
            ors = or.map((f) => this.build(f, schema));
        }
        const filterAnds = this.filterFields(filter, schema);
        if (filterAnds) {
            ands = [...ands, filterAnds];
        }
        if (ands.length) {
            filterQuery = { ...filterQuery, $and: ands };
        }
        if (ors.length) {
            filterQuery = { ...filterQuery, $or: ors };
        }
        return filterQuery;
    }
    /**
     * Creates field comparisons from a filter. This method will ignore and/or properties.
     * @param filter - the filter with fields to create comparisons for.
     */
    filterFields(filter, schema) {
        const ands = Object.keys(filter)
            .filter((f) => f !== 'and' && f !== 'or')
            .map((field) => this.withFilterComparison(field, this.getField(filter, field), schema));
        if (ands.length === 1) {
            return ands[0];
        }
        if (ands.length) {
            return { $and: ands };
        }
        return undefined;
    }
    getField(obj, field) {
        return obj[field];
    }
    convertValueToObjectId(value) {
        if (Array.isArray(value)) {
            return value.map((item) => ObjectId(item));
        }
        return ObjectId(value);
    }
    withFilterComparison(field, cmp, schema) {
        var _a;
        const opts = Object.keys(cmp);
        if (opts.length === 1) {
            const cmpType = opts[0];
            const isObjectId = schema &&
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                ((schema === null || schema === void 0 ? void 0 : schema.path(field)) instanceof mongoose_1.Schema.Types.ObjectId ||
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
                    ((_a = schema === null || schema === void 0 ? void 0 : schema.path(field)) === null || _a === void 0 ? void 0 : _a.caster) instanceof mongoose_1.Schema.Types.ObjectId);
            const value = isObjectId ? this.convertValueToObjectId(cmp[cmpType]) : cmp[cmpType];
            return this.comparisonBuilder.build(field, cmpType, value);
        }
        return {
            $or: opts.map((cmpType) => {
                const value = 
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                schema && (schema === null || schema === void 0 ? void 0 : schema.path(field)) instanceof mongoose_1.Schema.Types.ObjectId
                    ? this.convertValueToObjectId(cmp[cmpType])
                    : cmp[cmpType];
                return this.comparisonBuilder.build(field, cmpType, value);
            }),
        };
    }
}
exports.WhereBuilder = WhereBuilder;
//# sourceMappingURL=where.builder.js.map