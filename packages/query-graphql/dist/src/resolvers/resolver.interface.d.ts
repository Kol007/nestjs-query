import { QueryService } from 'nestjs-query/packages/core';
import { DTONamesOpts } from '../common';
import { ResolverMethodOpts, SubscriptionResolverMethodOpts } from '../decorators';
import { GraphQLPubSub } from '../subscription';
import { ArrayConnectionType } from '../types/connection';
import { CursorConnectionType } from '../types/connection/cursor';
import { PagingStrategies } from '../types/query/paging';
import { CursorQueryArgsType, NoPagingQueryArgsType, OffsetQueryArgsType, QueryArgsTypeOpts } from '../types/query/query-args';
import { Authorizer } from '../auth';
declare type NameedEndpoint = {
    /** Specify to override the name of the graphql query or mutation * */
    name?: string;
};
export interface ResolverOpts extends ResolverMethodOpts, DTONamesOpts {
    /**
     * Options for single record graphql endpoints
     */
    one?: ResolverMethodOpts & NameedEndpoint;
    /**
     * Options for multiple record graphql endpoints
     */
    many?: ResolverMethodOpts & NameedEndpoint;
}
export interface SubscriptionResolverOpts extends SubscriptionResolverMethodOpts, DTONamesOpts {
    one?: SubscriptionResolverMethodOpts & NameedEndpoint;
    many?: SubscriptionResolverMethodOpts & NameedEndpoint;
}
/** @internal */
export interface ServiceResolver<DTO, QS extends QueryService<DTO, unknown, unknown>> {
    service: QS;
    readonly pubSub?: GraphQLPubSub;
    readonly authorizer?: Authorizer<DTO>;
}
/** @internal */
export interface ResolverClass<DTO, QS extends QueryService<DTO, unknown, unknown>, Resolver extends ServiceResolver<DTO, QS>> {
    new (service: QS): Resolver;
}
/**
 * @internal
 * Base Resolver that takes in a service as a constructor argument.
 */
export declare class BaseServiceResolver<DTO, QS extends QueryService<DTO, unknown, unknown>> {
    readonly service: QS;
    constructor(service: QS);
}
export declare type ExtractPagingStrategy<DTO, Opts extends QueryArgsTypeOpts<DTO>> = Opts['pagingStrategy'] extends PagingStrategies ? Opts['pagingStrategy'] : PagingStrategies.CURSOR;
export declare type QueryArgsFromStrategy<DTO, S extends PagingStrategies> = S extends PagingStrategies.OFFSET ? OffsetQueryArgsType<DTO> : S extends PagingStrategies.NONE ? NoPagingQueryArgsType<DTO> : S extends PagingStrategies.CURSOR ? CursorQueryArgsType<DTO> : never;
export declare type QueryArgsFromOpts<DTO, Opts extends QueryArgsTypeOpts<DTO>> = QueryArgsFromStrategy<DTO, ExtractPagingStrategy<DTO, Opts>>;
export declare type ConnectionTypeFromStrategy<DTO, S extends PagingStrategies> = S extends PagingStrategies.OFFSET | PagingStrategies.NONE ? ArrayConnectionType<DTO> : S extends PagingStrategies.CURSOR ? CursorConnectionType<DTO> : never;
export declare type ConnectionTypeFromOpts<DTO, Opts extends QueryArgsTypeOpts<DTO>> = ConnectionTypeFromStrategy<DTO, ExtractPagingStrategy<DTO, Opts>>;
export declare type MergePagingStrategyOpts<DTO, Opts extends QueryArgsTypeOpts<DTO>, S extends PagingStrategies> = Opts['pagingStrategy'] extends PagingStrategies ? Opts : S extends PagingStrategies ? Omit<Opts, 'pagingStrategy'> & {
    pagingStrategy: S;
} : Opts;
export {};
