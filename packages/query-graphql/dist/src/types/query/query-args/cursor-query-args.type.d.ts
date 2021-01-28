import { Class } from 'nestjs-query/packages/core';
import { QueryArgsTypeOpts, QueryType, StaticQueryType } from './interfaces';
import { StaticCursorPagingType, CursorPagingType } from '../paging';
export declare type StaticCursorQueryArgsType<DTO> = StaticQueryType<DTO, StaticCursorPagingType>;
export declare type CursorQueryArgsType<DTO> = QueryType<DTO, CursorPagingType>;
export declare function CursorQueryArgsType<DTO>(DTOClass: Class<DTO>, opts?: QueryArgsTypeOpts<DTO>): StaticCursorQueryArgsType<DTO>;
