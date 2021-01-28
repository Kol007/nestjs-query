"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ts_mockito_1 = require("ts-mockito");
const graphql_1 = require("@nestjs/graphql");
const relations_1 = require("../../../src/resolvers/relations");
const __fixtures__1 = require("../../__fixtures__");
const __fixtures__2 = require("../__fixtures__");
const __fixtures__3 = require("./__fixtures__");
let TestResolver = class TestResolver extends relations_1.UpdateRelationsResolver(__fixtures__2.TestResolverDTO, {
    one: { relation: { DTO: __fixtures__3.TestRelationDTO }, custom: { DTO: __fixtures__3.TestRelationDTO, relationName: 'other' } },
    many: { relations: { DTO: __fixtures__3.TestRelationDTO }, customs: { DTO: __fixtures__3.TestRelationDTO, relationName: 'others' } },
}) {
    constructor(service) {
        super(service);
    }
};
TestResolver = tslib_1.__decorate([
    graphql_1.Resolver(() => __fixtures__2.TestResolverDTO),
    tslib_1.__metadata("design:paramtypes", [__fixtures__2.TestService])
], TestResolver);
describe('UpdateRelationsResolver', () => {
    const expectResolverSDL = (sdl, opts) => {
        let TestSDLResolver = class TestSDLResolver extends relations_1.UpdateRelationsResolver(__fixtures__2.TestResolverDTO, opts !== null && opts !== void 0 ? opts : {}) {
            test() {
                return { id: '1', stringField: 'foo' };
            }
        };
        tslib_1.__decorate([
            graphql_1.Query(() => __fixtures__2.TestResolverDTO),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", __fixtures__2.TestResolverDTO)
        ], TestSDLResolver.prototype, "test", null);
        TestSDLResolver = tslib_1.__decorate([
            graphql_1.Resolver(() => __fixtures__2.TestResolverDTO)
        ], TestSDLResolver);
        return __fixtures__1.expectSDL([TestSDLResolver], sdl);
    };
    it('should not add update methods if one and many are empty', () => {
        return expectResolverSDL(__fixtures__3.updateRelationEmptySDL);
    });
    describe('one', () => {
        it('should use the object type name', () => {
            return expectResolverSDL(__fixtures__3.updateRelationOneSDL, { one: { relation: { DTO: __fixtures__3.TestRelationDTO } } });
        });
        it('should use the dtoName if provided', () => {
            return expectResolverSDL(__fixtures__3.updateRelationOneCustomNameSDL, {
                one: { relation: { DTO: __fixtures__3.TestRelationDTO, dtoName: 'Test' } },
            });
        });
        it('should not add update one methods if disableRead is true', () => {
            return expectResolverSDL(__fixtures__3.updateRelationOneDisabledSDL, {
                one: { relation: { DTO: __fixtures__3.TestRelationDTO, disableUpdate: true } },
            });
        });
        it('should call the service findRelation with the provided dto and correct relation name', async () => {
            const { resolver, mockService } = await __fixtures__2.createResolverFromNest(TestResolver);
            const input = {
                id: 'record-id',
                relationId: 'relation-id',
            };
            const output = {
                id: 'record-id',
                stringField: 'foo',
            };
            ts_mockito_1.when(mockService.setRelation('relation', input.id, input.relationId, undefined)).thenResolve(output);
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            const result = await resolver.setRelationOnTestResolverDTO({ input });
            return expect(result).toEqual(output);
        });
        it('should call the service findRelation with the provided dto and custom relation name', async () => {
            const { resolver, mockService } = await __fixtures__2.createResolverFromNest(TestResolver);
            const input = {
                id: 'record-id',
                relationId: 'relation-id',
            };
            const output = {
                id: 'record-id',
                stringField: 'foo',
            };
            ts_mockito_1.when(mockService.setRelation('other', input.id, input.relationId, undefined)).thenResolve(output);
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            const result = await resolver.setCustomOnTestResolverDTO({ input });
            return expect(result).toEqual(output);
        });
    });
    describe('many', () => {
        it('should use the object type name', () => {
            return expectResolverSDL(__fixtures__3.updateRelationManySDL, { many: { relations: { DTO: __fixtures__3.TestRelationDTO } } });
        });
        it('should use the dtoName if provided', () => {
            return expectResolverSDL(__fixtures__3.updateRelationManyCustomNameSDL, {
                many: { relations: { DTO: __fixtures__3.TestRelationDTO, dtoName: 'Test' } },
            });
        });
        it('should not add update many methods if disableUpdate is true', () => {
            return expectResolverSDL(__fixtures__3.updateRelationManyDisabledSDL, {
                many: { relations: { DTO: __fixtures__3.TestRelationDTO, disableUpdate: true } },
            });
        });
        it('should call the service findRelation with the provided dto and correct relation name', async () => {
            const { resolver, mockService } = await __fixtures__2.createResolverFromNest(TestResolver);
            const input = {
                id: 'id-1',
                relationIds: ['relation-id-1', 'relation-id-2'],
            };
            const output = {
                id: 'record-id',
                stringField: 'foo',
            };
            ts_mockito_1.when(mockService.addRelations('relations', input.id, ts_mockito_1.deepEqual(input.relationIds), undefined)).thenResolve(output);
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            const result = await resolver.addRelationsToTestResolverDTO({ input });
            return expect(result).toEqual(output);
        });
        it('should call the service findRelation with the provided dto and custom relation name', async () => {
            const { resolver, mockService } = await __fixtures__2.createResolverFromNest(TestResolver);
            const input = {
                id: 'id-1',
                relationIds: ['relation-id-1', 'relation-id-2'],
            };
            const output = {
                id: 'record-id',
                stringField: 'foo',
            };
            ts_mockito_1.when(mockService.addRelations('others', input.id, ts_mockito_1.deepEqual(input.relationIds), undefined)).thenResolve(output);
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            const result = await resolver.addCustomsToTestResolverDTO({ input });
            return expect(result).toEqual(output);
        });
    });
});
//# sourceMappingURL=update-relation.resolver.spec.js.map