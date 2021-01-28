import { Class, MetaValue } from 'nestjs-query/packages/core';
import { AuthorizerOptions, Authorizer } from '../auth';
export declare function Authorize<DTO>(optsOrAuthorizerOrClass: Class<Authorizer<DTO>> | Authorizer<DTO> | AuthorizerOptions<DTO>): (DTOClass: Class<DTO>) => void;
export declare const getAuthorizer: <DTO>(DTOClass: Class<DTO>) => MetaValue<Class<Authorizer<DTO>>>;
