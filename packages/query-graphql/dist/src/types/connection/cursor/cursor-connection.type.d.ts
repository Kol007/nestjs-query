import { Class } from 'nestjs-query/packages/core';
import { CursorQueryArgsType } from '../../query';
import { StaticConnection } from '../interfaces';
import { EdgeType } from './edge.type';
import { PageInfoType } from './page-info.type';
export declare type CursorConnectionOptions = {
    enableTotalCount?: boolean;
    connectionName?: string;
    disableKeySetPagination?: boolean;
};
export declare type StaticCursorConnectionType<DTO> = StaticConnection<DTO, CursorQueryArgsType<DTO>, CursorConnectionType<DTO>>;
export declare type CursorConnectionType<DTO> = {
    pageInfo: PageInfoType;
    edges: EdgeType<DTO>[];
    totalCount?: Promise<number>;
};
export declare function CursorConnectionType<DTO>(TItemClass: Class<DTO>, opts?: CursorConnectionOptions): StaticCursorConnectionType<DTO>;
