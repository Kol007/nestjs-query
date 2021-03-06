import { Filter } from 'nestjs-query/packages/core';

export interface Authorizer<DTO> {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/no-explicit-any
  authorize(context: any): Promise<Filter<DTO>>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  authorizeRelation(relationName: string, context: any): Promise<Filter<unknown>>;
}
