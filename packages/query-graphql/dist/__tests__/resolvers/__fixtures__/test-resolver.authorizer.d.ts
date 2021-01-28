import { Filter } from 'nestjs-query/packages/core';
import { Authorizer } from '../../../src';
import { TestResolverDTO } from './test-resolver.dto';
export declare class TestResolverAuthorizer implements Authorizer<TestResolverDTO> {
    authorize(): Promise<Filter<TestResolverDTO>>;
    authorizeRelation<Relation>(): Promise<Filter<Relation>>;
}
