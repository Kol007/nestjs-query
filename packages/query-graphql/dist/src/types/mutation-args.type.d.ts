import { Class } from 'nestjs-query/packages/core';
export interface MutationArgsType<Input> {
    input: Input;
}
export declare function MutationArgsType<Input>(InputClass: Class<Input>): Class<MutationArgsType<Input>>;
