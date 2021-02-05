import { Filter } from 'nestjs-query/packages/core';
import { FilterQuery, Document } from 'mongoose';
import { ComparisonBuilder } from './comparison.builder';
/**
 * @internal
 * Builds a WHERE clause from a Filter.
 */
export declare class WhereBuilder<Entity extends Document> {
    readonly comparisonBuilder: ComparisonBuilder<Entity>;
    constructor(comparisonBuilder?: ComparisonBuilder<Entity>);
    /**
     * Builds a WHERE clause from a Filter.
     * @param filter - the filter to build the WHERE clause from.
     */
    build(filter: Filter<Entity>, schema?: any): FilterQuery<Entity>;
    /**
     * Creates field comparisons from a filter. This method will ignore and/or properties.
     * @param filter - the filter with fields to create comparisons for.
     */
    private filterFields;
    private getField;
    private withFilterComparison;
}
