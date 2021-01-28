"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ts_mockito_1 = require("ts-mockito");
const graphql_1 = require("@nestjs/graphql");
const src_1 = require("../../src");
const __fixtures__1 = require("../__fixtures__");
const __fixtures__2 = require("./__fixtures__");
let TestResolver = class TestResolver extends src_1.ReferenceResolver(__fixtures__2.TestResolverDTO, { key: 'id' }) {
    constructor(service) {
        super(service);
    }
};
TestResolver = tslib_1.__decorate([
    graphql_1.Resolver(() => __fixtures__2.TestResolverDTO),
    tslib_1.__metadata("design:paramtypes", [__fixtures__2.TestService])
], TestResolver);
describe('ReferenceResolver', () => {
    const expectResolverSDL = (sdl, opts) => {
        let TestSDLResolver = class TestSDLResolver extends src_1.CreateResolver(__fixtures__2.TestResolverDTO, opts) {
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
    it('should create a new resolver with a resolveReference method', () => {
        return expectResolverSDL(__fixtures__2.referenceBasicResolverSDL);
    });
    it('should return the original resolver if key is not provided', () => {
        const TestReferenceResolver = src_1.ReferenceResolver(__fixtures__2.TestResolverDTO);
        return expect(TestReferenceResolver.prototype.resolveReference).toBeUndefined();
    });
    describe('#resolveReference', () => {
        it('should call the service getById with the provided input', async () => {
            const { resolver, mockService } = await __fixtures__2.createResolverFromNest(TestResolver);
            const id = 'id-1';
            const output = {
                id,
                stringField: 'foo',
            };
            ts_mockito_1.when(mockService.getById(id)).thenResolve(output);
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/naming-convention
            const result = await resolver.resolveReference({ __type: 'TestReference', id });
            return expect(result).toEqual(output);
        });
        it('should reject if the id is not found', async () => {
            const { resolver, mockService } = await __fixtures__2.createResolverFromNest(TestResolver);
            const id = 'id-1';
            const output = {
                id,
                stringField: 'foo',
            };
            ts_mockito_1.when(mockService.getById(id)).thenResolve(output);
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/naming-convention
            return expect(resolver.resolveReference({ __type: 'TestReference' })).rejects.toThrow('Unable to resolve reference, missing required key id for TestResolverDTO');
        });
    });
});
//# sourceMappingURL=reference.resolver.spec.js.map