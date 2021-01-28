"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const relations_1 = require("../../../src/resolvers/relations");
const __fixtures__1 = require("../../__fixtures__");
const __fixtures__2 = require("../__fixtures__");
const __fixtures__3 = require("./__fixtures__");
let TestResolver = class TestResolver extends relations_1.ReferencesRelationsResolver(__fixtures__2.TestResolverDTO, {
    reference: { DTO: __fixtures__3.TestRelationDTO, keys: { id: 'stringField' } },
}) {
    constructor(service) {
        super(service);
    }
};
TestResolver = tslib_1.__decorate([
    graphql_1.Resolver(() => __fixtures__2.TestResolverDTO),
    tslib_1.__metadata("design:paramtypes", [__fixtures__2.TestService])
], TestResolver);
describe('ReferencesRelationMixin', () => {
    const expectResolverSDL = (sdl, opts) => {
        let TestSDLResolver = class TestSDLResolver extends relations_1.ReferencesRelationsResolver(__fixtures__2.TestResolverDTO, opts !== null && opts !== void 0 ? opts : {}) {
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
    it('should not add reference methods if references empty', () => {
        return expectResolverSDL(__fixtures__3.referenceRelationEmptySDL);
    });
    it('should use the add the reference if provided', () => {
        return expectResolverSDL(__fixtures__3.referenceRelationSDL, {
            reference: { DTO: __fixtures__3.TestRelationDTO, keys: { id: 'stringField' }, dtoName: 'Test' },
        });
    });
    it('should set the field to nullable if set to true', () => {
        return expectResolverSDL(__fixtures__3.referenceRelationNullableSDL, {
            reference: { DTO: __fixtures__3.TestRelationDTO, keys: { id: 'stringField' }, nullable: true },
        });
    });
    it('should return a references type from the passed in dto', async () => {
        const { resolver } = await __fixtures__2.createResolverFromNest(TestResolver);
        const dto = {
            id: 'id-1',
            stringField: 'reference-id-1',
        };
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        const result = await resolver.referenceReference(dto);
        // eslint-disable-next-line @typescript-eslint/naming-convention
        return expect(result).toEqual({ __typename: 'Reference', id: dto.stringField });
    });
});
//# sourceMappingURL=references-relation.resolver.spec.js.map