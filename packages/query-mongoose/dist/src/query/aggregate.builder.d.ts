import { AggregateQuery, AggregateResponse } from 'nestjs-query/packages/core';
import { Document } from 'mongoose';
export declare type MongooseAggregate = {
    [k: string]: {
        [o: string]: unknown;
    };
};
/**
 * @internal
 * Builds a WHERE clause from a Filter.
 */
export declare class AggregateBuilder<Entity extends Document> {
    static convertToAggregateResponse<Entity>({ _id, ...response }: Record<string, unknown>): AggregateResponse<Entity>;
    /**
     * Builds a aggregate SELECT clause from a aggregate.
     * @param aggregate - the aggregates to select.
     */
    build(aggregate: AggregateQuery<Entity>): MongooseAggregate;
    private createAggSelect;
}
