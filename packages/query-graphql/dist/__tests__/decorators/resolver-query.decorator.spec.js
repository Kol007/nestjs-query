"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/* eslint-disable @typescript-eslint/no-unused-vars */
const nestGraphql = tslib_1.__importStar(require("@nestjs/graphql"));
const resolverDecorator = tslib_1.__importStar(require("../../src/decorators/resolver-method.decorator"));
const decorators_1 = require("../../src/decorators");
describe('ResolverQuery decorator', () => {
    const resolverMethodSpy = jest.spyOn(resolverDecorator, 'ResolverMethod');
    const querySpy = jest.spyOn(nestGraphql, 'Query');
    beforeEach(() => jest.clearAllMocks());
    function createTestResolver(typeFunc, options, ...opts) {
        // @ts-ignore
        class TestResolver {
            method() {
                return true;
            }
        }
        tslib_1.__decorate([
            decorators_1.ResolverQuery(typeFunc, options, ...opts),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", Boolean)
        ], TestResolver.prototype, "method", null);
    }
    function assertQueryCall(callNo, returnType, advancedOpts) {
        const [rt, ao] = querySpy.mock.calls[callNo];
        expect(rt()).toEqual(returnType);
        expect(ao).toEqual(advancedOpts);
    }
    function assertResolverMethodCall(callNo, ...opts) {
        expect(resolverMethodSpy).toHaveBeenNthCalledWith(callNo + 1, ...opts);
    }
    it('should call Query with the correct mutation arguments', () => {
        const opts = [{}];
        createTestResolver(() => Boolean, { name: 'test' }, ...opts);
        assertQueryCall(0, Boolean, { name: 'test' });
    });
    it('should call ResolverMethod with the correct options', () => {
        const opts = [{}];
        createTestResolver(() => Boolean, { name: 'test' }, ...opts);
        assertResolverMethodCall(0, ...opts);
    });
    it('should not call ResolverMethod if disabled is true', () => {
        const opts = [{ disabled: true }];
        createTestResolver(() => Boolean, { name: 'test' }, ...opts);
        expect(querySpy).toHaveBeenCalledTimes(0);
        expect(resolverMethodSpy).toHaveBeenCalledTimes(0);
    });
});
//# sourceMappingURL=resolver-query.decorator.spec.js.map