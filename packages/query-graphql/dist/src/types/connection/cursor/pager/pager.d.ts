import { Query } from 'nestjs-query/packages/core';
import { PagerStrategy, PagingOpts } from './strategies';
import { Count, QueryMany } from '../../interfaces';
import { CursorQueryArgsType } from '../../../query';
import { Pager, PagerResult, PagingMeta, QueryResults } from './interfaces';
export declare class CursorPager<DTO> implements Pager<DTO> {
    readonly strategy: PagerStrategy<DTO>;
    constructor(strategy: PagerStrategy<DTO>);
    page(queryMany: QueryMany<DTO>, query: CursorQueryArgsType<DTO>, count: Count<DTO>): Promise<PagerResult<DTO>>;
    private isValidPaging;
    runQuery(queryMany: QueryMany<DTO>, query: Query<DTO>, pagingMeta: PagingMeta<DTO, PagingOpts<DTO>>): Promise<QueryResults<DTO>>;
    getPageMeta(query: CursorQueryArgsType<DTO>): PagingMeta<DTO, PagingOpts<DTO>>;
    createPagingResult(results: QueryResults<DTO>, pagingMeta: PagingMeta<DTO, PagingOpts<DTO>>, totalCount: () => Promise<number>): PagerResult<DTO>;
    private hasPreviousPage;
    isEmptyPage(results: QueryResults<DTO>, pagingMeta: PagingMeta<DTO, PagingOpts<DTO>>): boolean;
}
