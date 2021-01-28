import { Class } from 'nestjs-query/packages/core';
import { Pager } from './interfaces';
export { Pager, PagerResult, CountFn } from './interfaces';
export declare type PagerOpts = {
    disableKeySetPagination?: boolean;
};
export declare const createPager: <DTO>(DTOClass: Class<DTO>, opts: PagerOpts) => Pager<DTO>;
