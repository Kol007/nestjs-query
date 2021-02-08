import { Class, MetaValue, Query } from 'nestjs-query/packages/core';
import { CreateManyInputType, CreateOneInputType, DeleteManyInputType, DeleteOneInputType, FindOneArgsType, UpdateManyInputType, UpdateOneInputType } from '../types';
export declare type HookFunc<T, Context = any> = (instance: T, context: Context) => T | Promise<T>;
export declare type CreateOneHook<DTO> = HookFunc<CreateOneInputType<DTO>>;
export declare const BeforeCreateOne: (data: HookFunc<CreateOneInputType<any>, any>) => ClassDecorator;
export declare function getCreateOneHook<DTO>(DTOClass: Class<DTO>): MetaValue<CreateOneHook<DTO>>;
export declare type CreateManyHook<DTO> = HookFunc<CreateManyInputType<DTO>>;
export declare const BeforeCreateMany: (data: HookFunc<CreateManyInputType<any>, any>) => ClassDecorator;
export declare function getCreateManyHook<DTO>(DTOClass: Class<DTO>): MetaValue<CreateManyHook<DTO>>;
export declare type UpdateOneHook<DTO> = HookFunc<UpdateOneInputType<DTO>>;
export declare const BeforeUpdateOne: (data: HookFunc<UpdateOneInputType<any>, any>) => ClassDecorator;
export declare function getUpdateOneHook<DTO, U>(DTOClass: Class<DTO>): MetaValue<UpdateOneHook<U>>;
export declare type UpdateManyHook<DTO, U> = HookFunc<UpdateManyInputType<DTO, U>>;
export declare const BeforeUpdateMany: (data: HookFunc<UpdateManyInputType<any, any>, any>) => ClassDecorator;
export declare function getUpdateManyHook<DTO, U>(DTOClass: Class<DTO>): MetaValue<UpdateManyHook<DTO, U>>;
export declare type DeleteOneHook = HookFunc<DeleteOneInputType>;
export declare const BeforeDeleteOne: (data: HookFunc<DeleteOneInputType, any>) => ClassDecorator;
export declare function getDeleteOneHook<DTO>(DTOClass: Class<DTO>): MetaValue<DeleteOneHook>;
export declare type DeleteManyHook<DTO> = HookFunc<DeleteManyInputType<DTO>>;
export declare const BeforeDeleteMany: (data: HookFunc<DeleteManyInputType<any>, any>) => ClassDecorator;
export declare function getDeleteManyHook<DTO>(DTOClass: Class<DTO>): MetaValue<DeleteManyHook<DTO>>;
export declare type BeforeQueryManyHook<DTO> = HookFunc<Query<DTO>>;
export declare const BeforeQueryMany: (data: HookFunc<Query<any>, any>) => ClassDecorator;
export declare function getQueryManyHook<DTO>(DTOClass: Class<DTO>): MetaValue<BeforeQueryManyHook<DTO>>;
export declare type BeforeFindOneHook = HookFunc<FindOneArgsType>;
export declare const BeforeFindOne: (data: HookFunc<FindOneArgsType, any>) => ClassDecorator;
export declare function getFindOneHook<DTO>(DTOClass: Class<DTO>): MetaValue<BeforeFindOneHook>;