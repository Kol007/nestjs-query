import { Class } from 'nestjs-query/packages/core';
export interface RelationsInputType {
    id: string | number;
    relationIds: (string | number)[];
}
export declare function RelationsInputType(): Class<RelationsInputType>;
