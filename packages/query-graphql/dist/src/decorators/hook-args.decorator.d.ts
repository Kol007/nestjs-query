import { Class, MetaValue } from 'nestjs-query/packages/core';
import { HookFunc } from './hook.decorator';
export declare const HookArgs: <HookType>(HookArgsClass: Class<HookType>, ...hooks: MetaValue<HookFunc<HookType, any>>[]) => ParameterDecorator;
