import { Class, QueryService } from 'nestjs-query/packages/core';
import { ConnectionType, FindOneArgsType, QueryArgsType, QueryArgsTypeOpts, StaticConnectionType, StaticQueryArgsType } from '../types';
import { CursorConnectionOptions } from '../types/connection/cursor';
import { CursorQueryArgsTypeOpts } from '../types/query/query-args';
import { ConnectionTypeFromOpts, QueryArgsFromOpts, ResolverClass, ResolverOpts, ServiceResolver } from './resolver.interface';
export declare type ReadResolverFromOpts<DTO, Opts extends ReadResolverOpts<DTO>, QS extends QueryService<DTO, unknown, unknown>> = ReadResolver<DTO, QueryArgsFromOpts<DTO, Opts>, ConnectionTypeFromOpts<DTO, Opts>, QS>;
export declare type ReadResolverOpts<DTO> = {
    QueryArgs?: StaticQueryArgsType<DTO>;
    Connection?: StaticConnectionType<DTO>;
} & ResolverOpts & QueryArgsTypeOpts<DTO> & Pick<CursorConnectionOptions, 'enableTotalCount'>;
export interface ReadResolver<DTO, QT extends QueryArgsType<DTO>, CT extends ConnectionType<DTO>, QS extends QueryService<DTO, unknown, unknown>> extends ServiceResolver<DTO, QS> {
    queryMany(query: QT, context?: unknown): Promise<CT>;
    findById(id: FindOneArgsType, context?: unknown): Promise<DTO | undefined>;
}
/**
 * @internal
 * Mixin to add `read` graphql endpoints.
 */
export declare const Readable: <DTO, ReadOpts extends ReadResolverOpts<DTO>, QS extends QueryService<DTO, unknown, unknown>>(DTOClass: Class<DTO>, opts: ReadOpts) => <B extends Class<ServiceResolver<DTO, QS>>>(BaseClass: B) => Class<ReadResolverFromOpts<DTO, ReadOpts, QS>> & B;
export declare const ReadResolver: <DTO, ReadOpts extends ReadResolverOpts<DTO> = CursorQueryArgsTypeOpts<DTO>, QS extends QueryService<DTO, unknown, unknown> = QueryService<DTO, unknown, unknown>>(DTOClass: Class<DTO>, opts?: ReadOpts) => ResolverClass<DTO, QS, ReadResolverFromOpts<DTO, ReadOpts, QS>>;
