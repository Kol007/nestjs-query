import { ConnectionCursorType } from '../../cursor.scalar';
export interface PageInfoTypeConstructor {
    new (hasNextPage: boolean, hasPreviousPage: boolean, startCursor: ConnectionCursorType | undefined, endCursor: ConnectionCursorType | undefined): PageInfoType;
}
export interface PageInfoType {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: ConnectionCursorType | undefined;
    endCursor?: ConnectionCursorType | undefined;
}
export declare const PageInfoType: () => PageInfoTypeConstructor;
