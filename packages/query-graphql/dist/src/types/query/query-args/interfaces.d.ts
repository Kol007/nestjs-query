import { Class, Filter, Query, SortField } from 'nestjs-query/packages/core';
import { PagingStrategies, PagingTypes, StaticPagingTypes } from '../paging';
export declare type BaseQueryArgsTypeOpts<DTO> = {
    /**
     * The default number of results to return.
     * [Default=10]
     */
    defaultResultSize?: number;
    /**
     * The maximum number of results that can be returned from a query.
     * [Default=50]
     */
    maxResultsSize?: number;
    /**
     * The default sort for queries.
     * [Default=[]]
     */
    defaultSort?: SortField<DTO>[];
    /**
     * Default filter.
     * [Default=\{\}]
     */
    defaultFilter?: Filter<DTO>;
};
export interface CursorQueryArgsTypeOpts<DTO> extends BaseQueryArgsTypeOpts<DTO> {
    pagingStrategy?: PagingStrategies.CURSOR;
}
export interface OffsetQueryArgsTypeOpts<DTO> extends BaseQueryArgsTypeOpts<DTO> {
    pagingStrategy: PagingStrategies.OFFSET;
}
export interface NoPagingQueryArgsTypeOpts<DTO> extends BaseQueryArgsTypeOpts<DTO> {
    pagingStrategy: PagingStrategies.NONE;
}
export declare type QueryArgsTypeOpts<DTO> = CursorQueryArgsTypeOpts<DTO> | OffsetQueryArgsTypeOpts<DTO> | NoPagingQueryArgsTypeOpts<DTO>;
export interface StaticQueryType<DTO, PagingType extends StaticPagingTypes> {
    SortType: Class<SortField<DTO>>;
    PageType?: PagingType;
    FilterType: Class<Filter<DTO>>;
    new (): QueryType<DTO, InstanceType<PagingType>>;
}
export interface QueryType<DTO, PagingType extends PagingTypes> extends Query<DTO> {
    paging?: PagingType;
}
