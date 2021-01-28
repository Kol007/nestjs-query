import { Class } from 'nestjs-query/packages/core';
import { OffsetQueryArgsType, NoPagingQueryArgsType } from '../query/query-args';
import { StaticConnection } from './interfaces';
export declare type StaticArrayConnectionType<DTO> = StaticConnection<DTO, OffsetQueryArgsType<DTO> | NoPagingQueryArgsType<DTO>, ArrayConnectionType<DTO>>;
export declare type ArrayConnectionType<DTO> = DTO[];
export declare function ArrayConnectionType<DTO>(TItemClass: Class<DTO>): StaticArrayConnectionType<DTO>;
