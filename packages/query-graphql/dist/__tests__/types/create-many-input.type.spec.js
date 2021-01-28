"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const graphql_1 = require("@nestjs/graphql");
const src_1 = require("../../src");
const __fixtures__1 = require("../__fixtures__");
describe('CreateManyInputType', () => {
    let FakeType = class FakeType {
    };
    tslib_1.__decorate([
        graphql_1.Field(),
        class_validator_1.MinLength(5),
        tslib_1.__metadata("design:type", String)
    ], FakeType.prototype, "field", void 0);
    FakeType = tslib_1.__decorate([
        graphql_1.InputType()
    ], FakeType);
    let CreateMany = class CreateMany extends src_1.CreateManyInputType('fakeInput', FakeType) {
    };
    CreateMany = tslib_1.__decorate([
        graphql_1.InputType()
    ], CreateMany);
    it('should create an args type with the field as the type', async () => {
        let CreateManyInputTypeSpec = class CreateManyInputTypeSpec {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            test(input) {
                return 1;
            }
        };
        tslib_1.__decorate([
            graphql_1.Query(() => graphql_1.Int),
            tslib_1.__param(0, graphql_1.Args('input')),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", [CreateMany]),
            tslib_1.__metadata("design:returntype", Number)
        ], CreateManyInputTypeSpec.prototype, "test", null);
        CreateManyInputTypeSpec = tslib_1.__decorate([
            graphql_1.Resolver()
        ], CreateManyInputTypeSpec);
        return __fixtures__1.expectSDL([CreateManyInputTypeSpec], __fixtures__1.createManyInputTypeSDL);
    });
    it('should properly assign the input field', () => {
        const input = [{ field: 'hello' }];
        const it = class_transformer_1.plainToClass(CreateMany, { input });
        expect(it.input).toEqual(input);
        it.input.forEach((i) => expect(i).toBeInstanceOf(FakeType));
    });
    it('should assign the typeName to the input field', () => {
        const input = [{ field: 'hello' }];
        const it = class_transformer_1.plainToClass(CreateMany, { fakeInput: input });
        expect(it.input).toEqual(input);
        it.input.forEach((i) => expect(i).toBeInstanceOf(FakeType));
    });
    describe('validation', () => {
        it('should validate the input property', () => {
            const input = [{ field: 'hola' }];
            const it = class_transformer_1.plainToClass(CreateMany, { input });
            const errors = class_validator_1.validateSync(it);
            expect(errors).toEqual([
                {
                    children: [
                        {
                            children: [
                                {
                                    children: [],
                                    constraints: {
                                        minLength: 'field must be longer than or equal to 5 characters',
                                    },
                                    property: 'field',
                                    target: input[0],
                                    value: input[0].field,
                                },
                            ],
                            property: '0',
                            target: input,
                            value: input[0],
                        },
                    ],
                    property: 'input',
                    target: {
                        input,
                    },
                    value: input,
                },
            ]);
        });
        it('should assign the typeName to the input field', () => {
            const input = [{ field: 'hola' }];
            const it = class_transformer_1.plainToClass(CreateMany, { fakeInput: input });
            const errors = class_validator_1.validateSync(it);
            expect(errors).toEqual([
                {
                    children: [
                        {
                            children: [
                                {
                                    children: [],
                                    constraints: {
                                        minLength: 'field must be longer than or equal to 5 characters',
                                    },
                                    property: 'field',
                                    target: input[0],
                                    value: input[0].field,
                                },
                            ],
                            property: '0',
                            target: input,
                            value: input[0],
                        },
                    ],
                    property: 'input',
                    target: {
                        input,
                    },
                    value: input,
                },
            ]);
        });
    });
});
//# sourceMappingURL=create-many-input.type.spec.js.map