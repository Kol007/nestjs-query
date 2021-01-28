"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/* eslint-disable @typescript-eslint/no-unused-vars */
const resolver_method_decorator_1 = require("../../src/decorators/resolver-method.decorator");
describe('ResolverMethod decorator', () => {
    function createTestResolver(...opts) {
        // @ts-ignore
        class TestResolver {
            method() {
                return true;
            }
        }
        tslib_1.__decorate([
            resolver_method_decorator_1.ResolverMethod(...opts),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", Boolean)
        ], TestResolver.prototype, "method", null);
    }
    describe('decorators option', () => {
        it('should call the decorator', () => {
            // eslint-disable-next-line @typescript-eslint/ban-types
            const propDecorator = jest.fn((target, propertyKey) => {
                return undefined;
            });
            const opts = [{ decorators: [propDecorator] }];
            createTestResolver(...opts);
            expect(propDecorator).toHaveBeenCalledWith({}, 'method', expect.any(Object));
        });
        it('should call the decorator once', () => {
            // eslint-disable-next-line @typescript-eslint/ban-types
            const propDecorator = jest.fn((target, propertyKey) => {
                return undefined;
            });
            const opts = [{ decorators: [propDecorator] }, { decorators: [propDecorator] }];
            createTestResolver(...opts);
            expect(propDecorator).toHaveBeenCalledTimes(1);
            expect(propDecorator).toHaveBeenCalledWith({}, 'method', expect.any(Object));
        });
    });
});
//# sourceMappingURL=resolver-method.decorator.spec.js.map