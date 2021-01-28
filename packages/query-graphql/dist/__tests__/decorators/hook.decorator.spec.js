"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// eslint-disable-next-line max-classes-per-file
const src_1 = require("../../src");
const decorators_1 = require("../../src/decorators");
describe('hook decorators', () => {
    describe('@BeforeCreateOne', () => {
        it('should store the hook', () => {
            const hookFn = jest.fn();
            let Test = class Test {
            };
            Test = tslib_1.__decorate([
                src_1.BeforeCreateOne(hookFn)
            ], Test);
            expect(decorators_1.getCreateOneHook(Test)).toBe(hookFn);
        });
        it('should return a hook from the base class', () => {
            const hookFn = jest.fn();
            let Base = class Base {
            };
            Base = tslib_1.__decorate([
                src_1.BeforeCreateOne(hookFn)
            ], Base);
            class Test extends Base {
            }
            expect(decorators_1.getCreateOneHook(Test)).toBe(hookFn);
        });
        it('should return a hook from the child class if there is a hook on both the base and child', () => {
            const baseHookFn = jest.fn();
            let Base = class Base {
            };
            Base = tslib_1.__decorate([
                src_1.BeforeCreateOne(baseHookFn)
            ], Base);
            const childHookFn = jest.fn();
            let Test = class Test extends Base {
            };
            Test = tslib_1.__decorate([
                src_1.BeforeCreateOne(childHookFn)
            ], Test);
            expect(decorators_1.getCreateOneHook(Test)).toBe(childHookFn);
        });
    });
    describe('@BeforeCreateMany', () => {
        it('should store the hook', () => {
            const hookFn = jest.fn();
            let Test = class Test {
            };
            Test = tslib_1.__decorate([
                src_1.BeforeCreateMany(hookFn)
            ], Test);
            expect(decorators_1.getCreateManyHook(Test)).toBe(hookFn);
        });
        it('should return a hook from the base class', () => {
            const hookFn = jest.fn();
            let Base = class Base {
            };
            Base = tslib_1.__decorate([
                src_1.BeforeCreateMany(hookFn)
            ], Base);
            class Test extends Base {
            }
            expect(decorators_1.getCreateManyHook(Test)).toBe(hookFn);
        });
        it('should return a hook from the child class if there is a hook on both the base and child', () => {
            const baseHookFn = jest.fn();
            let Base = class Base {
            };
            Base = tslib_1.__decorate([
                src_1.BeforeCreateMany(baseHookFn)
            ], Base);
            const childHookFn = jest.fn();
            let Test = class Test extends Base {
            };
            Test = tslib_1.__decorate([
                src_1.BeforeCreateMany(childHookFn)
            ], Test);
            expect(decorators_1.getCreateManyHook(Test)).toBe(childHookFn);
        });
    });
    describe('@BeforeUpdateOne', () => {
        it('should store the hook', () => {
            const hookFn = jest.fn();
            let Test = class Test {
            };
            Test = tslib_1.__decorate([
                src_1.BeforeUpdateOne(hookFn)
            ], Test);
            expect(decorators_1.getUpdateOneHook(Test)).toBe(hookFn);
        });
        it('should return a hook from the base class', () => {
            const hookFn = jest.fn();
            let Base = class Base {
            };
            Base = tslib_1.__decorate([
                src_1.BeforeUpdateOne(hookFn)
            ], Base);
            class Test extends Base {
            }
            expect(decorators_1.getUpdateOneHook(Test)).toBe(hookFn);
        });
        it('should return a hook from the child class if there is a hook on both the base and child', () => {
            const baseHookFn = jest.fn();
            let Base = class Base {
            };
            Base = tslib_1.__decorate([
                src_1.BeforeUpdateOne(baseHookFn)
            ], Base);
            const childHookFn = jest.fn();
            let Test = class Test extends Base {
            };
            Test = tslib_1.__decorate([
                src_1.BeforeUpdateOne(childHookFn)
            ], Test);
            expect(decorators_1.getUpdateOneHook(Test)).toBe(childHookFn);
        });
    });
    describe('@BeforeUpdateMany', () => {
        it('should store the hook', () => {
            const hookFn = jest.fn();
            let Test = class Test {
            };
            Test = tslib_1.__decorate([
                src_1.BeforeUpdateMany(hookFn)
            ], Test);
            expect(decorators_1.getUpdateManyHook(Test)).toBe(hookFn);
        });
        it('should return a hook from the base class', () => {
            const hookFn = jest.fn();
            let Base = class Base {
            };
            Base = tslib_1.__decorate([
                src_1.BeforeUpdateMany(hookFn)
            ], Base);
            class Test extends Base {
            }
            expect(decorators_1.getUpdateManyHook(Test)).toBe(hookFn);
        });
        it('should return a hook from the child class if there is a hook on both the base and child', () => {
            const baseHookFn = jest.fn();
            let Base = class Base {
            };
            Base = tslib_1.__decorate([
                src_1.BeforeUpdateMany(baseHookFn)
            ], Base);
            const childHookFn = jest.fn();
            let Test = class Test extends Base {
            };
            Test = tslib_1.__decorate([
                src_1.BeforeUpdateMany(childHookFn)
            ], Test);
            expect(decorators_1.getUpdateManyHook(Test)).toBe(childHookFn);
        });
    });
    describe('@BeforeDeleteOne', () => {
        it('should store the hook', () => {
            const hookFn = jest.fn();
            let Test = class Test {
            };
            Test = tslib_1.__decorate([
                src_1.BeforeDeleteOne(hookFn)
            ], Test);
            expect(decorators_1.getDeleteOneHook(Test)).toBe(hookFn);
        });
        it('should return a hook from the base class', () => {
            const hookFn = jest.fn();
            let Base = class Base {
            };
            Base = tslib_1.__decorate([
                src_1.BeforeDeleteOne(hookFn)
            ], Base);
            class Test extends Base {
            }
            expect(decorators_1.getDeleteOneHook(Test)).toBe(hookFn);
        });
        it('should return a hook from the child class if there is a hook on both the base and child', () => {
            const baseHookFn = jest.fn();
            let Base = class Base {
            };
            Base = tslib_1.__decorate([
                src_1.BeforeDeleteOne(baseHookFn)
            ], Base);
            const childHookFn = jest.fn();
            let Test = class Test extends Base {
            };
            Test = tslib_1.__decorate([
                src_1.BeforeDeleteOne(childHookFn)
            ], Test);
            expect(decorators_1.getDeleteOneHook(Test)).toBe(childHookFn);
        });
    });
    describe('@BeforeDeleteMany', () => {
        it('should store the hook', () => {
            const hookFn = jest.fn();
            let Test = class Test {
            };
            Test = tslib_1.__decorate([
                src_1.BeforeDeleteMany(hookFn)
            ], Test);
            expect(decorators_1.getDeleteManyHook(Test)).toBe(hookFn);
        });
        it('should return a hook from the base class', () => {
            const hookFn = jest.fn();
            let Base = class Base {
            };
            Base = tslib_1.__decorate([
                src_1.BeforeDeleteMany(hookFn)
            ], Base);
            class Test extends Base {
            }
            expect(decorators_1.getDeleteManyHook(Test)).toBe(hookFn);
        });
        it('should return a hook from the child class if there is a hook on both the base and child', () => {
            const baseHookFn = jest.fn();
            let Base = class Base {
            };
            Base = tslib_1.__decorate([
                src_1.BeforeDeleteMany(baseHookFn)
            ], Base);
            const childHookFn = jest.fn();
            let Test = class Test extends Base {
            };
            Test = tslib_1.__decorate([
                src_1.BeforeDeleteMany(childHookFn)
            ], Test);
            expect(decorators_1.getDeleteManyHook(Test)).toBe(childHookFn);
        });
    });
    describe('@BeforeQueryMany', () => {
        it('should store the hook', () => {
            const hookFn = jest.fn();
            let Test = class Test {
            };
            Test = tslib_1.__decorate([
                src_1.BeforeQueryMany(hookFn)
            ], Test);
            expect(decorators_1.getQueryManyHook(Test)).toBe(hookFn);
        });
        it('should return a hook from the base class', () => {
            const hookFn = jest.fn();
            let Base = class Base {
            };
            Base = tslib_1.__decorate([
                src_1.BeforeQueryMany(hookFn)
            ], Base);
            class Test extends Base {
            }
            expect(decorators_1.getQueryManyHook(Test)).toBe(hookFn);
        });
        it('should return a hook from the child class if there is a hook on both the base and child', () => {
            const baseHookFn = jest.fn();
            let Base = class Base {
            };
            Base = tslib_1.__decorate([
                src_1.BeforeQueryMany(baseHookFn)
            ], Base);
            const childHookFn = jest.fn();
            let Test = class Test extends Base {
            };
            Test = tslib_1.__decorate([
                src_1.BeforeQueryMany(childHookFn)
            ], Test);
            expect(decorators_1.getQueryManyHook(Test)).toBe(childHookFn);
        });
    });
    describe('@BeforeFindOne', () => {
        it('should store the hook', () => {
            const hookFn = jest.fn();
            let Test = class Test {
            };
            Test = tslib_1.__decorate([
                src_1.BeforeFindOne(hookFn)
            ], Test);
            expect(decorators_1.getFindOneHook(Test)).toBe(hookFn);
        });
        it('should return a hook from the base class', () => {
            const hookFn = jest.fn();
            let Base = class Base {
            };
            Base = tslib_1.__decorate([
                src_1.BeforeFindOne(hookFn)
            ], Base);
            class Test extends Base {
            }
            expect(decorators_1.getFindOneHook(Test)).toBe(hookFn);
        });
        it('should return a hook from the child class if there is a hook on both the base and child', () => {
            const baseHookFn = jest.fn();
            let Base = class Base {
            };
            Base = tslib_1.__decorate([
                src_1.BeforeFindOne(baseHookFn)
            ], Base);
            const childHookFn = jest.fn();
            let Test = class Test extends Base {
            };
            Test = tslib_1.__decorate([
                src_1.BeforeFindOne(childHookFn)
            ], Test);
            expect(decorators_1.getFindOneHook(Test)).toBe(childHookFn);
        });
    });
});
//# sourceMappingURL=hook.decorator.spec.js.map