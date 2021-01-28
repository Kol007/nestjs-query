import { Query } from 'nestjs-query/packages/core';
import { CursorPagingType } from '../../../../query';
import { OffsetPagingOpts, PagerStrategy } from './pager-strategy';
export declare class LimitOffsetPagerStrategy<DTO> implements PagerStrategy<DTO> {
    toCursor(dto: DTO, index: number, pagingOpts: OffsetPagingOpts): string;
    fromCursorArgs(cursor: CursorPagingType): OffsetPagingOpts;
    isEmptyCursor(opts: OffsetPagingOpts): boolean;
    createQuery(query: Query<DTO>, opts: OffsetPagingOpts, includeExtraNode: boolean): Query<DTO>;
    checkForExtraNode(nodes: DTO[], opts: OffsetPagingOpts): DTO[];
    private getLimit;
    private getOffset;
}
