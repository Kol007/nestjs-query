import { Filter } from 'nestjs-query/packages/core';
export interface Authorizer<DTO> {
    authorize(context: any): Promise<Filter<DTO>>;
    authorizeRelation(relationName: string, context: any): Promise<Filter<unknown>>;
}
