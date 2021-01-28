import { Class } from 'nestjs-query/packages/core';
export interface UpdateOneInputType<U> {
    id: string | number;
    update: U;
}
/**
 * The abstract input type for update one endpoints.
 * @param UpdateType - The InputType to use for the update field.
 */
export declare function UpdateOneInputType<U>(UpdateType: Class<U>): Class<UpdateOneInputType<U>>;
