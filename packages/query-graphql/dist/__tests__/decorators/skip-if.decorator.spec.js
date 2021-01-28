"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// eslint-disable-next-line max-classes-per-file
const decorators_1 = require("../../src/decorators");
describe('@SkipIf decorator', () => {
    describe('class decorator', () => {
        it('should call the decorator if the condition is false', () => {
            const dec = jest.fn();
            let TestSkipDecorator = class TestSkipDecorator {
            };
            TestSkipDecorator = tslib_1.__decorate([
                decorators_1.SkipIf(() => false, dec)
            ], TestSkipDecorator);
            expect(dec).toHaveBeenCalledWith(TestSkipDecorator);
        });
        it('should not call the decorator if the condition is true', () => {
            const dec = jest.fn();
            let TestSkipDecorator = 
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            class TestSkipDecorator {
            };
            TestSkipDecorator = tslib_1.__decorate([
                decorators_1.SkipIf(() => true, dec)
                // @ts-ignore
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            ], TestSkipDecorator);
            expect(dec).not.toHaveBeenCalled();
        });
    });
    describe('property decorator', () => {
        it('should call the decorator if the condition is false', () => {
            const dec = jest.fn();
            class TestSkipDecorator {
            }
            tslib_1.__decorate([
                decorators_1.SkipIf(() => false, dec),
                tslib_1.__metadata("design:type", String)
            ], TestSkipDecorator.prototype, "prop", void 0);
            expect(dec).toHaveBeenCalledWith(TestSkipDecorator.prototype, 'prop', undefined);
        });
        it('should not call the decorator if the condition is true', () => {
            const dec = jest.fn();
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            class TestSkipDecorator {
            }
            tslib_1.__decorate([
                decorators_1.SkipIf(() => true, dec),
                tslib_1.__metadata("design:type", String)
            ], TestSkipDecorator.prototype, "prop", void 0);
            expect(dec).not.toHaveBeenCalled();
        });
    });
    describe('method decorator', () => {
        it('should call the decorator if the condition is false', () => {
            const dec = jest.fn();
            class TestSkipDecorator {
                prop() {
                    return 'str';
                }
            }
            tslib_1.__decorate([
                decorators_1.SkipIf(() => false, dec),
                tslib_1.__metadata("design:type", Function),
                tslib_1.__metadata("design:paramtypes", []),
                tslib_1.__metadata("design:returntype", String)
            ], TestSkipDecorator.prototype, "prop", null);
            expect(dec).toHaveBeenCalledWith(TestSkipDecorator.prototype, 'prop', Object.getOwnPropertyDescriptor(TestSkipDecorator.prototype, 'prop'));
        });
        it('should not call the decorator if the condition is true', () => {
            const dec = jest.fn();
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            class TestSkipDecorator {
                prop() {
                    return 'str';
                }
            }
            tslib_1.__decorate([
                decorators_1.SkipIf(() => true, dec),
                tslib_1.__metadata("design:type", Function),
                tslib_1.__metadata("design:paramtypes", []),
                tslib_1.__metadata("design:returntype", String)
            ], TestSkipDecorator.prototype, "prop", null);
            expect(dec).not.toHaveBeenCalled();
        });
    });
    describe('parameter decorator', () => {
        it('should call the decorator if the condition is false', () => {
            const dec = jest.fn();
            class TestSkipDecorator {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                prop(param) {
                    return 'str';
                }
            }
            tslib_1.__decorate([
                tslib_1.__param(0, decorators_1.SkipIf(() => false, dec)),
                tslib_1.__metadata("design:type", Function),
                tslib_1.__metadata("design:paramtypes", [String]),
                tslib_1.__metadata("design:returntype", String)
            ], TestSkipDecorator.prototype, "prop", null);
            expect(dec).toHaveBeenCalledWith(TestSkipDecorator.prototype, 'prop', 0);
        });
        it('should not call the decorator if the condition is true', () => {
            const dec = jest.fn();
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            class TestSkipDecorator {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                prop(param) {
                    return 'str';
                }
            }
            tslib_1.__decorate([
                tslib_1.__param(0, decorators_1.SkipIf(() => true, dec)),
                tslib_1.__metadata("design:type", Function),
                tslib_1.__metadata("design:paramtypes", [String]),
                tslib_1.__metadata("design:returntype", String)
            ], TestSkipDecorator.prototype, "prop", null);
            expect(dec).not.toHaveBeenCalled();
        });
    });
});
//# sourceMappingURL=skip-if.decorator.spec.js.map