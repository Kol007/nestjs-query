import { Class, MetaValue } from 'nestjs-query/packages/core';
import { MutationArgsType } from '../types';
import { HookFunc } from './hook.decorator';
export declare const MutationArgs: <HookType>(HookArgsClass: Class<MutationArgsType<HookType>>, hook: MetaValue<HookFunc<HookType, any>>) => ParameterDecorator;
