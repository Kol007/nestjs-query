"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// eslint-disable-next-line max-classes-per-file
const testing_1 = require("@nestjs/testing");
const common_1 = require("@nestjs/common");
const src_1 = require("../../src");
const auth_1 = require("../../src/auth");
const providers_1 = require("../../src/providers");
describe('createDefaultAuthorizer', () => {
    let testingModule;
    class TestRelation {
    }
    let RelationAuthorizer = class RelationAuthorizer {
        authorize(context) {
            return Promise.resolve({ authorizerOwnerId: { eq: context.user.id } });
        }
        authorizeRelation() {
            return Promise.reject(new Error('should not have called'));
        }
    };
    RelationAuthorizer = tslib_1.__decorate([
        common_1.Injectable()
    ], RelationAuthorizer);
    let RelationWithAuthorizer = class RelationWithAuthorizer {
    };
    RelationWithAuthorizer = tslib_1.__decorate([
        src_1.Authorize(RelationAuthorizer)
    ], RelationWithAuthorizer);
    let TestDecoratorRelation = class TestDecoratorRelation {
    };
    TestDecoratorRelation = tslib_1.__decorate([
        src_1.Authorize({ authorize: (ctx) => ({ decoratorOwnerId: { eq: ctx.user.id } }) })
    ], TestDecoratorRelation);
    let TestDTO = class TestDTO {
    };
    TestDTO = tslib_1.__decorate([
        src_1.Authorize({ authorize: (ctx) => ({ ownerId: { eq: ctx.user.id } }) }),
        src_1.Relation('relations', () => TestRelation, {
            auth: { authorize: (ctx) => ({ relationOwnerId: { eq: ctx.user.id } }) },
        }),
        src_1.Relation('decoratorRelations', () => [TestDecoratorRelation]),
        src_1.Relation('authorizerRelation', () => RelationWithAuthorizer)
    ], TestDTO);
    class TestNoAuthDTO {
    }
    beforeEach(async () => {
        testingModule = await testing_1.Test.createTestingModule({
            providers: [
                ...providers_1.createAuthorizerProviders([
                    TestDecoratorRelation,
                    TestRelation,
                    RelationWithAuthorizer,
                    TestDTO,
                    TestNoAuthDTO,
                ]),
            ],
        }).compile();
    });
    afterAll(() => testingModule.close());
    it('should create an auth filter', async () => {
        const authorizer = testingModule.get(auth_1.getAuthorizerToken(TestDTO));
        const filter = await authorizer.authorize({ user: { id: 2 } });
        expect(filter).toEqual({ ownerId: { eq: 2 } });
    });
    it('should return an empty filter if auth not found', async () => {
        const authorizer = testingModule.get(auth_1.getAuthorizerToken(TestNoAuthDTO));
        const filter = await authorizer.authorize({ user: { id: 2 } });
        expect(filter).toEqual({});
    });
    it('should create an auth filter for relations using the default auth decorator', async () => {
        const authorizer = testingModule.get(auth_1.getAuthorizerToken(TestDTO));
        const filter = await authorizer.authorizeRelation('decoratorRelations', { user: { id: 2 } });
        expect(filter).toEqual({ decoratorOwnerId: { eq: 2 } });
    });
    it('should create an auth filter for relations using the relation options', async () => {
        const authorizer = testingModule.get(auth_1.getAuthorizerToken(TestDTO));
        const filter = await authorizer.authorizeRelation('relations', { user: { id: 2 } });
        expect(filter).toEqual({ relationOwnerId: { eq: 2 } });
    });
    it('should create an auth filter for relations using the relation authorizer', async () => {
        const authorizer = testingModule.get(auth_1.getAuthorizerToken(TestDTO));
        const filter = await authorizer.authorizeRelation('authorizerRelation', { user: { id: 2 } });
        expect(filter).toEqual({ authorizerOwnerId: { eq: 2 } });
    });
    it('should return an empty object for an unknown relation', async () => {
        const authorizer = testingModule.get(auth_1.getAuthorizerToken(TestDTO));
        const filter = await authorizer.authorizeRelation('unknownRelations', { user: { id: 2 } });
        expect(filter).toEqual({});
    });
});
//# sourceMappingURL=default-crud-auth.service.spec.js.map