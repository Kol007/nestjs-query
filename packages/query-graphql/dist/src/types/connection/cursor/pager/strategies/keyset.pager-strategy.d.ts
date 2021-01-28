import { Class, Query } from 'nestjs-query/packages/core';
import { KeySetPagingOpts, PagerStrategy } from './pager-strategy';
import { CursorPagingType } from '../../../../query';
export declare class KeysetPagerStrategy<DTO> implements PagerStrategy<DTO> {
    readonly DTOClass: Class<DTO>;
    readonly pageFields: (keyof DTO)[];
    constructor(DTOClass: Class<DTO>, pageFields: (keyof DTO)[]);
    fromCursorArgs(cursor: CursorPagingType): KeySetPagingOpts<DTO>;
    toCursor(dto: DTO, index: number, opts: KeySetPagingOpts<DTO>, query: Query<DTO>): string;
    isEmptyCursor(opts: KeySetPagingOpts<DTO>): boolean;
    createQuery(query: Query<DTO>, opts: KeySetPagingOpts<DTO>, includeExtraNode: boolean): Query<DTO>;
    checkForExtraNode(nodes: DTO[], opts: KeySetPagingOpts<DTO>): DTO[];
    private get defaultSort();
    private encodeCursor;
    private decodeCursor;
    private createFieldsFilter;
    private getSortFields;
    private createKeySetPayload;
}
