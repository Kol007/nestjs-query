import { Paging } from 'nestjs-query/packages/core';
import { ConnectionCursorType } from '../../cursor.scalar';
import { PagingStrategies } from './constants';
export interface StaticCursorPagingType {
    strategy: PagingStrategies.CURSOR;
    new (): CursorPagingType;
}
export interface CursorPagingType extends Paging {
    before?: ConnectionCursorType;
    after?: ConnectionCursorType;
    first?: number;
    last?: number;
}
export declare const CursorPagingType: () => StaticCursorPagingType;
