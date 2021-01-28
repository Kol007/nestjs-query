import { Class } from 'nestjs-query/packages/core';
export interface FindOneArgsType {
    id: string | number;
}
/**
 * The input type for delete one endpoints.
 */
export declare function FindOneArgsType(): Class<FindOneArgsType>;
