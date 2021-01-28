"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/* eslint-disable @typescript-eslint/no-unused-vars */
const nestGraphql = tslib_1.__importStar(require("@nestjs/graphql"));
const decorators_1 = require("../../src/decorators");
const resolverDecorator = tslib_1.__importStar(require("../../src/decorators/resolver-method.decorator"));
describe('ResolverField decorator', () => {
    const resolverMethodSpy = jest.spyOn(resolverDecorator, 'ResolverMethod');
    const propertySpy = jest.spyOn(nestGraphql, 'ResolveField');
    beforeEach(() => jest.clearAllMocks());
    function createTestResolver(name, typeFunc, options, ...opts) {
        // @ts-ignore
        class TestResolver {
            method() {
                return true;
            }
        }
        tslib_1.__decorate([
            decorators_1.ResolverField(name, typeFunc, options, ...opts),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", Boolean)
        ], TestResolver.prototype, "method", null);
    }
    function assertMutationCall(callNo, name, returnType, advancedOpts) {
        const [n, rt, ao] = propertySpy.mock.calls[callNo];
        expect(n).toEqual(name);
        expect(rt ? rt() : null).toEqual(returnType);
        expect(ao).toEqual(advancedOpts);
    }
    function assertResolverMethodCall(callNo, ...opts) {
        expect(resolverMethodSpy).toHaveBeenNthCalledWith(callNo + 1, ...opts);
    }
    it('should call ResolveField with the correct mutation arguments', () => {
        const opts = [{}];
        createTestResolver('test', () => Boolean, { nullable: true }, ...opts);
        assertMutationCall(0, 'test', Boolean, { nullable: true });
    });
    it('should call ResolverMethod with the correct options', () => {
        const opts = [{}];
        createTestResolver('test', () => Boolean, { nullable: true }, ...opts);
        assertResolverMethodCall(0, ...opts);
    });
    it('should not call ResolverMethod if disabled is true', () => {
        const opts = [{ disabled: true }];
        createTestResolver('test', () => Boolean, { nullable: true }, ...opts);
        expect(propertySpy).toHaveBeenCalledTimes(0);
        expect(resolverMethodSpy).toHaveBeenCalledTimes(0);
    });
});
//# sourceMappingURL=resolver-field.decorator.spec.js.map