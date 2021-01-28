import { Class, QueryService } from 'nestjs-query/packages/core';
import { ServiceResolver } from '../resolver.interface';
import { ReferencesOpts, ResolverRelationReference } from './relations.interface';
export declare const ReferencesRelationMixin: <DTO>(DTOClass: Class<DTO>, references: Record<string, ResolverRelationReference<DTO, any>>) => <B extends Class<ServiceResolver<DTO, QueryService<DTO, unknown, unknown>>>>(Base: B) => B;
export declare const ReferencesRelationsResolver: <DTO, QS extends QueryService<DTO, unknown, unknown> = QueryService<DTO, unknown, unknown>>(DTOClass: Class<DTO>, references: Record<string, ResolverRelationReference<DTO, any>>) => Class<ServiceResolver<DTO, QS>>;
