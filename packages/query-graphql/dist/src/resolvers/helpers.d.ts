import { Class, Filter } from 'nestjs-query/packages/core';
import { SubscriptionArgsType, SubscriptionFilterInputType } from '../types';
import { Authorizer } from '../auth';
/** @internal */
export declare const transformAndValidate: <T>(TClass: Class<T>, partial: T) => Promise<T>;
export declare const createSubscriptionFilter: <DTO, Input extends SubscriptionFilterInputType<DTO>>(InputClass: Class<Input>, payloadKey: string) => (payload: any, variables: SubscriptionArgsType<Input>, context: any) => boolean | Promise<boolean>;
export declare const getAuthFilter: <DTO>(authorizer?: Authorizer<DTO> | undefined, context?: unknown) => Promise<Filter<DTO> | undefined>;
export declare const getRelationAuthFilter: <DTO, Relation>(relationName: string, authorizer?: Authorizer<DTO> | undefined, context?: unknown) => Promise<Filter<Relation> | undefined>;
