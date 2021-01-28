import { Paging } from 'nestjs-query/packages/core';
import { PagingStrategies } from './constants';
export interface StaticOffsetPagingType {
    strategy: PagingStrategies.OFFSET;
    new (): OffsetPagingType;
}
export declare type OffsetPagingType = Paging;
export declare const OffsetPagingType: () => StaticOffsetPagingType;
