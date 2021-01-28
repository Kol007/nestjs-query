import { Class } from 'nestjs-query/packages/core';
import { QueryArgsTypeOpts, QueryType, StaticQueryType } from './interfaces';
export declare type StaticNoPagingQueryArgsType<DTO> = StaticQueryType<DTO, never>;
export declare type NoPagingQueryArgsType<DTO> = QueryType<DTO, never>;
export declare function NoPagingQueryArgsType<DTO>(DTOClass: Class<DTO>, opts?: QueryArgsTypeOpts<DTO>): StaticNoPagingQueryArgsType<DTO>;
