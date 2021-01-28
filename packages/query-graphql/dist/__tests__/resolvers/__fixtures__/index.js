"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCustomOneMutationResolverSDL = exports.updateManySubscriptionResolverSDL = exports.updateOneSubscriptionResolverSDL = exports.updateSubscriptionResolverSDL = exports.updateCustomManyInputResolverSDL = exports.updateCustomOneInputResolverSDL = exports.updateCustomDTOResolverSDL = exports.updateCustomNameResolverSDL = exports.updateManyDisabledResolverSDL = exports.updateOneDisabledResolverSDL = exports.updateDisabledResolverSDL = exports.updateBasicResolverSDL = exports.readCustomManyQueryResolverSDL = exports.readCustomOneQueryResolverSDL = exports.readConnectionWithTotalCountSDL = exports.readOffsetQueryResolverSDL = exports.readCustomQueryResolverSDL = exports.readCustomConnectionResolverSDL = exports.readCustomNameResolverSDL = exports.readManyDisabledResolverSDL = exports.readOneDisabledResolverSDL = exports.readDisabledResolverSDL = exports.readBasicResolverSDL = exports.createCustomManyMutationResolverSDL = exports.createCustomOneMutationResolverSDL = exports.createSubscriptionResolverSDL = exports.createCustomManyInputResolverSDL = exports.createCustomOneInputResolverSDL = exports.createCustomDTOResolverSDL = exports.createCustomNameResolverSDL = exports.createManyDisabledResolverSDL = exports.createOneDisabledResolverSDL = exports.createDisabledResolverSDL = exports.createBasicResolverSDL = exports.deleteCustomManyMutationResolverSDL = exports.deleteCustomOneMutationResolverSDL = exports.deleteManySubscriptionResolverSDL = exports.deleteOneSubscriptionResolverSDL = exports.deleteSubscriptionResolverSDL = exports.deleteCustomManyInputResolverSDL = exports.deleteCustomOneInputResolverSDL = exports.deleteCustomNameResolverSDL = exports.deleteManyDisabledResolverSDL = exports.deleteOneDisabledResolverSDL = exports.deleteDisabledResolverSDL = exports.deleteBasicResolverSDL = exports.createResolverFromNest = exports.TestService = exports.TestResolverInputDTO = exports.TestResolverDTO = void 0;
exports.aggregateDisabledResolverSDL = exports.aggregateResolverSDL = exports.referenceBasicResolverSDL = exports.updateCustomManyMutationResolverSDL = void 0;
const path_1 = require("path");
const ts_mockito_1 = require("ts-mockito");
const testing_1 = require("@nestjs/testing");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const src_1 = require("../../../src");
const __fixtures__1 = require("../../__fixtures__");
const test_resolver_service_1 = require("./test-resolver.service");
const test_resolver_dto_1 = require("./test-resolver.dto");
const test_resolver_authorizer_1 = require("./test-resolver.authorizer");
const auth_1 = require("../../../src/auth");
var test_resolver_dto_2 = require("./test-resolver.dto");
Object.defineProperty(exports, "TestResolverDTO", { enumerable: true, get: function () { return test_resolver_dto_2.TestResolverDTO; } });
var test_resolver_input_dto_1 = require("./test-resolver-input.dto");
Object.defineProperty(exports, "TestResolverInputDTO", { enumerable: true, get: function () { return test_resolver_input_dto_1.TestResolverInputDTO; } });
var test_resolver_service_2 = require("./test-resolver.service");
Object.defineProperty(exports, "TestService", { enumerable: true, get: function () { return test_resolver_service_2.TestService; } });
const createResolverFromNest = async (ResolverClass) => {
    const mockService = ts_mockito_1.mock(test_resolver_service_1.TestService);
    const mockPubSub = ts_mockito_1.mock(graphql_subscriptions_1.PubSub);
    const mockAuthorizer = ts_mockito_1.mock(test_resolver_authorizer_1.TestResolverAuthorizer);
    const moduleRef = await testing_1.Test.createTestingModule({
        providers: [
            ResolverClass,
            test_resolver_service_1.TestService,
            { provide: auth_1.getAuthorizerToken(test_resolver_dto_1.TestResolverDTO), useClass: test_resolver_authorizer_1.TestResolverAuthorizer },
            { provide: src_1.pubSubToken(), useValue: ts_mockito_1.instance(mockPubSub) },
        ],
    })
        .overrideProvider(test_resolver_service_1.TestService)
        .useValue(ts_mockito_1.instance(mockService))
        .overrideProvider(auth_1.getAuthorizerToken(test_resolver_dto_1.TestResolverDTO))
        .useValue(ts_mockito_1.instance(mockAuthorizer))
        .compile();
    return { resolver: moduleRef.get(ResolverClass), mockService, mockPubSub, mockAuthorizer };
};
exports.createResolverFromNest = createResolverFromNest;
exports.deleteBasicResolverSDL = __fixtures__1.readGraphql(path_1.resolve(__dirname, 'delete', 'delete-basic.resolver.graphql'));
exports.deleteDisabledResolverSDL = __fixtures__1.readGraphql(path_1.resolve(__dirname, 'delete', 'delete-disabled.resolver.graphql'));
exports.deleteOneDisabledResolverSDL = __fixtures__1.readGraphql(path_1.resolve(__dirname, 'delete', 'delete-one-disabled.resolver.graphql'));
exports.deleteManyDisabledResolverSDL = __fixtures__1.readGraphql(path_1.resolve(__dirname, 'delete', 'delete-many-disabled.resolver.graphql'));
exports.deleteCustomNameResolverSDL = __fixtures__1.readGraphql(path_1.resolve(__dirname, 'delete', 'delete-custom-name.resolver.graphql'));
exports.deleteCustomOneInputResolverSDL = __fixtures__1.readGraphql(path_1.resolve(__dirname, 'delete', 'delete-custom-one-input.resolver.graphql'));
exports.deleteCustomManyInputResolverSDL = __fixtures__1.readGraphql(path_1.resolve(__dirname, 'delete', 'delete-custom-many-input.resolver.graphql'));
exports.deleteSubscriptionResolverSDL = __fixtures__1.readGraphql(path_1.resolve(__dirname, 'delete', 'delete-subscription.resolver.graphql'));
exports.deleteOneSubscriptionResolverSDL = __fixtures__1.readGraphql(path_1.resolve(__dirname, 'delete', 'delete-one-subscription.resolver.graphql'));
exports.deleteManySubscriptionResolverSDL = __fixtures__1.readGraphql(path_1.resolve(__dirname, 'delete', 'delete-many-subscription.resolver.graphql'));
exports.deleteCustomOneMutationResolverSDL = __fixtures__1.readGraphql(path_1.resolve(__dirname, 'delete', 'delete-custom-one-mutation.resolver.graphql'));
exports.deleteCustomManyMutationResolverSDL = __fixtures__1.readGraphql(path_1.resolve(__dirname, 'delete', 'delete-custom-many-mutation.resolver.graphql'));
exports.createBasicResolverSDL = __fixtures__1.readGraphql(path_1.resolve(__dirname, 'create', 'create-basic.resolver.graphql'));
exports.createDisabledResolverSDL = __fixtures__1.readGraphql(path_1.resolve(__dirname, 'create', 'create-disabled.resolver.graphql'));
exports.createOneDisabledResolverSDL = __fixtures__1.readGraphql(path_1.resolve(__dirname, 'create', 'create-one-disabled.resolver.graphql'));
exports.createManyDisabledResolverSDL = __fixtures__1.readGraphql(path_1.resolve(__dirname, 'create', 'create-many-disabled.resolver.graphql'));
exports.createCustomNameResolverSDL = __fixtures__1.readGraphql(path_1.resolve(__dirname, 'create', 'create-custom-name.resolver.graphql'));
exports.createCustomDTOResolverSDL = __fixtures__1.readGraphql(path_1.resolve(__dirname, 'create', 'create-custom-dto.resolver.graphql'));
exports.createCustomOneInputResolverSDL = __fixtures__1.readGraphql(path_1.resolve(__dirname, 'create', 'create-custom-one-input.resolver.graphql'));
exports.createCustomManyInputResolverSDL = __fixtures__1.readGraphql(path_1.resolve(__dirname, 'create', 'create-custom-many-input.resolver.graphql'));
exports.createSubscriptionResolverSDL = __fixtures__1.readGraphql(path_1.resolve(__dirname, 'create', 'create-subscription.resolver.graphql'));
exports.createCustomOneMutationResolverSDL = __fixtures__1.readGraphql(path_1.resolve(__dirname, 'create', 'create-custom-one-mutation.resolver.graphql'));
exports.createCustomManyMutationResolverSDL = __fixtures__1.readGraphql(path_1.resolve(__dirname, 'create', 'create-custom-many-mutation.resolver.graphql'));
exports.readBasicResolverSDL = __fixtures__1.readGraphql(path_1.resolve(__dirname, 'read', 'read-basic.resolver.graphql'));
exports.readDisabledResolverSDL = __fixtures__1.readGraphql(path_1.resolve(__dirname, 'read', 'read-disabled.resolver.graphql'));
exports.readOneDisabledResolverSDL = __fixtures__1.readGraphql(path_1.resolve(__dirname, 'read', 'read-one-disabled.resolver.graphql'));
exports.readManyDisabledResolverSDL = __fixtures__1.readGraphql(path_1.resolve(__dirname, 'read', 'read-many-disabled.resolver.graphql'));
exports.readCustomNameResolverSDL = __fixtures__1.readGraphql(path_1.resolve(__dirname, 'read', 'read-custom-name.resolver.graphql'));
exports.readCustomConnectionResolverSDL = __fixtures__1.readGraphql(path_1.resolve(__dirname, 'read', 'read-custom-connection.resolver.graphql'));
exports.readCustomQueryResolverSDL = __fixtures__1.readGraphql(path_1.resolve(__dirname, 'read', 'read-custom-query.resolver.graphql'));
exports.readOffsetQueryResolverSDL = __fixtures__1.readGraphql(path_1.resolve(__dirname, 'read', 'read-offset-query.resolver.graphql'));
exports.readConnectionWithTotalCountSDL = __fixtures__1.readGraphql(path_1.resolve(__dirname, 'read', 'read-connection-with-total-count.resolver.graphql'));
exports.readCustomOneQueryResolverSDL = __fixtures__1.readGraphql(path_1.resolve(__dirname, 'read', 'read-custom-one-query.resolver.graphql'));
exports.readCustomManyQueryResolverSDL = __fixtures__1.readGraphql(path_1.resolve(__dirname, 'read', 'read-custom-many-query.resolver.graphql'));
exports.updateBasicResolverSDL = __fixtures__1.readGraphql(path_1.resolve(__dirname, 'update', 'update-basic.resolver.graphql'));
exports.updateDisabledResolverSDL = __fixtures__1.readGraphql(path_1.resolve(__dirname, 'update', 'update-disabled.resolver.graphql'));
exports.updateOneDisabledResolverSDL = __fixtures__1.readGraphql(path_1.resolve(__dirname, 'update', 'update-one-disabled.resolver.graphql'));
exports.updateManyDisabledResolverSDL = __fixtures__1.readGraphql(path_1.resolve(__dirname, 'update', 'update-many-disabled.resolver.graphql'));
exports.updateCustomNameResolverSDL = __fixtures__1.readGraphql(path_1.resolve(__dirname, 'update', 'update-custom-name.resolver.graphql'));
exports.updateCustomDTOResolverSDL = __fixtures__1.readGraphql(path_1.resolve(__dirname, 'update', 'update-custom-dto.resolver.graphql'));
exports.updateCustomOneInputResolverSDL = __fixtures__1.readGraphql(path_1.resolve(__dirname, 'update', 'update-custom-one-input.resolver.graphql'));
exports.updateCustomManyInputResolverSDL = __fixtures__1.readGraphql(path_1.resolve(__dirname, 'update', 'update-custom-many-input.resolver.graphql'));
exports.updateSubscriptionResolverSDL = __fixtures__1.readGraphql(path_1.resolve(__dirname, 'update', 'update-subscription.resolver.graphql'));
exports.updateOneSubscriptionResolverSDL = __fixtures__1.readGraphql(path_1.resolve(__dirname, 'update', 'update-one-subscription.resolver.graphql'));
exports.updateManySubscriptionResolverSDL = __fixtures__1.readGraphql(path_1.resolve(__dirname, 'update', 'update-many-subscription.resolver.graphql'));
exports.updateCustomOneMutationResolverSDL = __fixtures__1.readGraphql(path_1.resolve(__dirname, 'update', 'update-custom-one-mutation.resolver.graphql'));
exports.updateCustomManyMutationResolverSDL = __fixtures__1.readGraphql(path_1.resolve(__dirname, 'update', 'update-custom-many-mutation.resolver.graphql'));
exports.referenceBasicResolverSDL = __fixtures__1.readGraphql(path_1.resolve(__dirname, 'reference', 'reference-basic.resolver.graphql'));
exports.aggregateResolverSDL = __fixtures__1.readGraphql(path_1.resolve(__dirname, 'aggregate', 'aggregate.resolver.graphql'));
exports.aggregateDisabledResolverSDL = __fixtures__1.readGraphql(path_1.resolve(__dirname, 'aggregate', 'aggregate-disabled.resolver.graphql'));
//# sourceMappingURL=index.js.map