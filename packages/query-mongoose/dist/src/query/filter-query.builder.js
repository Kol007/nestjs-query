"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterQueryBuilder = void 0;
// import { AggregateQuery, Filter, Query, SortDirection, SortField } from 'nestjs-query/packages/core';
const core_1 = require("nestjs-query/packages/core");
const aggregate_builder_1 = require("./aggregate.builder");
const helpers_1 = require("./helpers");
const where_builder_1 = require("./where.builder");
/**
 * @internal
 *
 * Class that will convert a Query into a `typeorm` Query Builder.
 */
class FilterQueryBuilder {
    constructor(whereBuilder = new where_builder_1.WhereBuilder(), aggregateBuilder = new aggregate_builder_1.AggregateBuilder()) {
        this.whereBuilder = whereBuilder;
        this.aggregateBuilder = aggregateBuilder;
    }
    buildQuery({ filter, paging, sorting }) {
        return {
            filterQuery: this.buildFilterQuery(filter),
            options: { limit: paging === null || paging === void 0 ? void 0 : paging.limit, skip: paging === null || paging === void 0 ? void 0 : paging.offset },
            sort: this.buildSortingString(sorting),
        };
    }
    buildAggregateQuery(aggregate, filter) {
        return {
            filterQuery: this.buildFilterQuery(filter),
            aggregate: this.aggregateBuilder.build(aggregate),
        };
    }
    buildIdAggregateQuery(id, filter, aggregate) {
        return {
            filterQuery: this.buildIdFilterQuery(id, filter),
            aggregate: this.aggregateBuilder.build(aggregate),
        };
    }
    buildIdFilterQuery(id, filter) {
        return {
            ...this.buildFilterQuery(filter),
            _id: Array.isArray(id) ? { $in: id } : id,
        };
    }
    /**
     * Applies the filter from a Query to a `typeorm` QueryBuilder.
     *
     * @param filter - the filter.
     */
    buildFilterQuery(filter) {
        if (!filter) {
            return {};
        }
        return this.whereBuilder.build(filter);
    }
    /**
     * Applies the ORDER BY clause to a `typeorm` QueryBuilder.
     * @param sorts - an array of SortFields to create the ORDER BY clause.
     */
    buildSorting(sorts) {
        return (sorts || []).map((sort) => ({
            [helpers_1.getSchemaKey(sort.field.toString())]: sort.direction === core_1.SortDirection.ASC ? 'asc' : 'desc',
        }));
    }
    /**
     * Applies the ORDER BY clause to a `typeorm` QueryBuilder.
     * @param sorts - an array of SortFields to create the ORDER BY clause.
     */
    buildSortingString(sorts) {
        return (sorts || [])
            .map((sort) => {
            return `${sort.direction === core_1.SortDirection.ASC ? '' : '-'}${helpers_1.getSchemaKey(sort.field.toString())}`;
        })
            .join(' ');
    }
}
exports.FilterQueryBuilder = FilterQueryBuilder;
//# sourceMappingURL=filter-query.builder.js.map