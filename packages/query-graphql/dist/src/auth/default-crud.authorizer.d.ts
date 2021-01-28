import { Class, Filter } from 'nestjs-query/packages/core';
import { Authorizer } from './authorizer';
export interface AuthorizerOptions<DTO> {
    authorize: (context: any) => Filter<DTO> | Promise<Filter<DTO>>;
}
export declare function createDefaultAuthorizer<DTO>(DTOClass: Class<DTO>, opts: AuthorizerOptions<DTO>): Class<Authorizer<DTO>>;
