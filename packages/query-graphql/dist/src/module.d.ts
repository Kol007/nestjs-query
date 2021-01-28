import { Assembler, Class } from 'nestjs-query/packages/core';
import { DynamicModule, ForwardReference, Provider } from '@nestjs/common';
import { AutoResolverOpts } from './providers';
import { ReadResolverOpts } from './resolvers';
import { GraphQLPubSub } from './subscription';
import { PagingStrategies } from './types/query/paging';
export interface NestjsQueryGraphqlModuleOpts {
    imports: Array<Class<any> | DynamicModule | Promise<DynamicModule> | ForwardReference>;
    services?: Provider[];
    assemblers?: Class<Assembler<any, any, any, any, any, any>>[];
    resolvers: AutoResolverOpts<any, any, unknown, unknown, ReadResolverOpts<any>, PagingStrategies>[];
    pubSub?: Provider<GraphQLPubSub>;
}
export declare class NestjsQueryGraphQLModule {
    static forFeature(opts: NestjsQueryGraphqlModuleOpts): DynamicModule;
    static defaultPubSubProvider(): Provider<GraphQLPubSub>;
}
