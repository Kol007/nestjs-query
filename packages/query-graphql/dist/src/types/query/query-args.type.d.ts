import { Class } from 'nestjs-query/packages/core';
import { CursorQueryArgsType, NoPagingQueryArgsType, OffsetQueryArgsType, StaticCursorQueryArgsType, StaticNoPagingQueryArgsType, StaticOffsetQueryArgsType, OffsetQueryArgsTypeOpts, NoPagingQueryArgsTypeOpts, QueryArgsTypeOpts } from './query-args';
export declare type StaticQueryArgsType<DTO> = StaticNoPagingQueryArgsType<DTO> | StaticCursorQueryArgsType<DTO> | StaticOffsetQueryArgsType<DTO>;
export declare const isStaticQueryArgsType: <DTO>(obj: any) => obj is StaticQueryArgsType<DTO>;
export declare type QueryArgsType<DTO> = NoPagingQueryArgsType<DTO> | CursorQueryArgsType<DTO> | OffsetQueryArgsType<DTO>;
export declare function QueryArgsType<DTO>(DTOClass: Class<DTO>, opts: OffsetQueryArgsTypeOpts<DTO>): StaticOffsetQueryArgsType<DTO>;
export declare function QueryArgsType<DTO>(DTOClass: Class<DTO>, opts: NoPagingQueryArgsTypeOpts<DTO>): StaticNoPagingQueryArgsType<DTO>;
export declare function QueryArgsType<DTO>(DTOClass: Class<DTO>, opts?: QueryArgsTypeOpts<DTO>): StaticCursorQueryArgsType<DTO>;
