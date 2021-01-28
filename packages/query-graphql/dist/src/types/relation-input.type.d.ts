import { Class } from 'nestjs-query/packages/core';
export interface RelationInputType {
    id: string | number;
    relationId: string | number;
}
export declare function RelationInputType(): Class<RelationInputType>;
