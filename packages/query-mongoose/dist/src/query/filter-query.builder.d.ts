import { AggregateQuery, Filter, Query, SortField } from 'nestjs-query/packages/core';
import { FilterQuery, Document } from 'mongoose';
import { AggregateBuilder, MongooseAggregate } from './aggregate.builder';
import { WhereBuilder } from './where.builder';
declare type MongooseSort = Record<string, 'asc' | 'desc'>;
declare type MongooseQuery<Entity extends Document> = {
    filterQuery: FilterQuery<Entity>;
    options: {
        limit?: number;
        skip?: number;
        sort?: MongooseSort[];
    };
    sort: string;
};
declare type MongooseAggregateQuery<Entity extends Document> = {
    filterQuery: FilterQuery<Entity>;
    aggregate: MongooseAggregate;
};
/**
 * @internal
 *
 * Class that will convert a Query into a `typeorm` Query Builder.
 */
export declare class FilterQueryBuilder<Entity extends Document> {
    readonly whereBuilder: WhereBuilder<Entity>;
    readonly aggregateBuilder: AggregateBuilder<Entity>;
    constructor(whereBuilder?: WhereBuilder<Entity>, aggregateBuilder?: AggregateBuilder<Entity>);
    buildQuery({ filter, paging, sorting }: Query<Entity>): MongooseQuery<Entity>;
    buildAggregateQuery(aggregate: AggregateQuery<Entity>, filter?: Filter<Entity>): MongooseAggregateQuery<Entity>;
    buildIdAggregateQuery(id: unknown | unknown[], filter: Filter<Entity>, aggregate: AggregateQuery<Entity>): MongooseAggregateQuery<Entity>;
    buildIdFilterQuery(id: unknown | unknown[], filter?: Filter<Entity>): FilterQuery<Entity>;
    /**
     * Applies the filter from a Query to a `typeorm` QueryBuilder.
     *
     * @param filter - the filter.
     */
    buildFilterQuery(filter?: Filter<Entity>, schema?: any): FilterQuery<Entity>;
    /**
     * Applies the ORDER BY clause to a `typeorm` QueryBuilder.
     * @param sorts - an array of SortFields to create the ORDER BY clause.
     */
    buildSorting(sorts?: SortField<Entity>[]): MongooseSort[];
    /**
     * Applies the ORDER BY clause to a `typeorm` QueryBuilder.
     * @param sorts - an array of SortFields to create the ORDER BY clause.
     */
    buildSortingString(sorts?: SortField<Entity>[]): string;
}
export {};
