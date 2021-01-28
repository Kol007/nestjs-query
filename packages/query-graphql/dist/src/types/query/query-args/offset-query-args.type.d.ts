import { Class } from 'nestjs-query/packages/core';
import { QueryArgsTypeOpts, QueryType, StaticQueryType } from './interfaces';
import { OffsetPagingType, StaticOffsetPagingType } from '../paging';
export declare type StaticOffsetQueryArgsType<DTO> = StaticQueryType<DTO, StaticOffsetPagingType>;
export declare type OffsetQueryArgsType<DTO> = QueryType<DTO, OffsetPagingType>;
export declare function OffsetQueryArgsType<DTO>(DTOClass: Class<DTO>, opts?: QueryArgsTypeOpts<DTO>): StaticOffsetQueryArgsType<DTO>;
