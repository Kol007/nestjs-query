"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const graphql_1 = require("@nestjs/graphql");
const src_1 = require("../../../src");
const __fixtures__1 = require("../../__fixtures__");
describe('PagingType', () => {
    it('should create the correct filter graphql schema', () => {
        let Paging = class Paging extends src_1.CursorPagingType() {
        };
        Paging = tslib_1.__decorate([
            graphql_1.InputType()
        ], Paging);
        let PagingTypeSpec = class PagingTypeSpec {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            test(input) {
                return 1;
            }
        };
        tslib_1.__decorate([
            graphql_1.Query(() => graphql_1.Int),
            tslib_1.__param(0, graphql_1.Args('input')),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", [Paging]),
            tslib_1.__metadata("design:returntype", Number)
        ], PagingTypeSpec.prototype, "test", null);
        PagingTypeSpec = tslib_1.__decorate([
            graphql_1.Resolver()
        ], PagingTypeSpec);
        return __fixtures__1.expectSDL([PagingTypeSpec], __fixtures__1.pagingInputTypeSDL);
    });
    it('throw a validation error if first is defined with before', () => {
        const paging = class_transformer_1.plainToClass(src_1.CursorPagingType(), {
            first: 10,
            before: 'YXJyYXljb25uZWN0aW9uOjEx',
        });
        expect(class_validator_1.validateSync(paging)).toEqual([
            {
                children: [],
                constraints: {
                    CannotUseWith: 'Cannot be used with `after` , `first`.',
                    CannotUseWithout: 'Cannot be used without `last`.',
                },
                property: 'before',
                target: {
                    before: 'YXJyYXljb25uZWN0aW9uOjEx',
                    first: 10,
                },
                value: 'YXJyYXljb25uZWN0aW9uOjEx',
            },
            {
                children: [],
                constraints: {
                    CannotUseWith: 'Cannot be used with `before` , `last`.',
                },
                property: 'first',
                target: {
                    before: 'YXJyYXljb25uZWN0aW9uOjEx',
                    first: 10,
                },
                value: 10,
            },
        ]);
    });
    it('throw a validation error if last is defined with after', () => {
        const paging = class_transformer_1.plainToClass(src_1.CursorPagingType(), {
            last: 10,
            after: 'YXJyYXljb25uZWN0aW9uOjEx',
        });
        expect(class_validator_1.validateSync(paging)).toEqual([
            {
                children: [],
                constraints: {
                    CannotUseWith: 'Cannot be used with `before` , `last`.',
                    CannotUseWithout: 'Cannot be used without `first`.',
                },
                property: 'after',
                target: {
                    after: 'YXJyYXljb25uZWN0aW9uOjEx',
                    last: 10,
                },
                value: 'YXJyYXljb25uZWN0aW9uOjEx',
            },
            {
                children: [],
                constraints: {
                    CannotUseWith: 'Cannot be used with `after` , `first`.',
                    CannotUseWithout: 'Cannot be used without `before`.',
                },
                property: 'last',
                target: {
                    after: 'YXJyYXljb25uZWN0aW9uOjEx',
                    last: 10,
                },
                value: 10,
            },
        ]);
    });
    it('throw a validation error if after is defined without first', () => {
        const paging = class_transformer_1.plainToClass(src_1.CursorPagingType(), {
            after: 'YXJyYXljb25uZWN0aW9uOjEx',
        });
        const validateErrors = class_validator_1.validateSync(paging);
        expect(validateErrors).toEqual([
            {
                children: [],
                constraints: {
                    CannotUseWithout: 'Cannot be used without `first`.',
                },
                property: 'after',
                target: {
                    after: 'YXJyYXljb25uZWN0aW9uOjEx',
                },
                value: 'YXJyYXljb25uZWN0aW9uOjEx',
            },
        ]);
    });
    it('throw a validation before if after is defined without last', () => {
        const paging = class_transformer_1.plainToClass(src_1.CursorPagingType(), {
            before: 'YXJyYXljb25uZWN0aW9uOjEx',
        });
        const validateErrors = class_validator_1.validateSync(paging);
        expect(validateErrors).toEqual([
            {
                children: [],
                constraints: {
                    CannotUseWithout: 'Cannot be used without `last`.',
                },
                property: 'before',
                target: {
                    before: 'YXJyYXljb25uZWN0aW9uOjEx',
                },
                value: 'YXJyYXljb25uZWN0aW9uOjEx',
            },
        ]);
    });
});
//# sourceMappingURL=paging.type.spec.js.map