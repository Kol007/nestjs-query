import { Class } from 'nestjs-query/packages/core';
import { ConnectionCursorType } from '../../cursor.scalar';
export interface EdgeTypeConstructor<DTO> {
    new (node: DTO, cursor: ConnectionCursorType): EdgeType<DTO>;
}
export interface EdgeType<DTO> {
    node: DTO;
    cursor: ConnectionCursorType;
}
export declare function EdgeType<DTO>(DTOClass: Class<DTO>): EdgeTypeConstructor<DTO>;
