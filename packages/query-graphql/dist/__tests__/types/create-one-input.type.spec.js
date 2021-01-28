"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const graphql_1 = require("@nestjs/graphql");
const src_1 = require("../../src");
const __fixtures__1 = require("../__fixtures__");
describe('CreateOneInputType', () => {
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
    let CreateOne = class CreateOne extends src_1.CreateOneInputType('fakeInput', FakeType) {
    };
    CreateOne = tslib_1.__decorate([
        graphql_1.InputType()
    ], CreateOne);
    it('should create an args type with the field as the type', async () => {
        let CreateOneInputTypeSpec = class CreateOneInputTypeSpec {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            test(input) {
                return 1;
            }
        };
        tslib_1.__decorate([
            graphql_1.Query(() => graphql_1.Int),
            tslib_1.__param(0, graphql_1.Args('input')),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", [CreateOne]),
            tslib_1.__metadata("design:returntype", Number)
        ], CreateOneInputTypeSpec.prototype, "test", null);
        CreateOneInputTypeSpec = tslib_1.__decorate([
            graphql_1.Resolver()
        ], CreateOneInputTypeSpec);
        return __fixtures__1.expectSDL([CreateOneInputTypeSpec], __fixtures__1.createOneInputTypeSDL);
    });
    it('should properly assign the input field', () => {
        const input = { field: 'hello' };
        const it = class_transformer_1.plainToClass(CreateOne, { input });
        expect(it.input).toEqual(input);
        expect(it.input).toBeInstanceOf(FakeType);
    });
    it('should assign the typeName to the input field', () => {
        const input = { field: 'hello' };
        const it = class_transformer_1.plainToClass(CreateOne, { fakeInput: input });
        expect(it.input).toEqual(input);
        expect(it.input).toBeInstanceOf(FakeType);
    });
    describe('validation', () => {
        it('should validate the input property', () => {
            const input = { field: 'hola' };
            const it = class_transformer_1.plainToClass(CreateOne, { input });
            const errors = class_validator_1.validateSync(it);
            expect(errors).toEqual([
                {
                    children: [
                        {
                            children: [],
                            constraints: {
                                minLength: 'field must be longer than or equal to 5 characters',
                            },
                            property: 'field',
                            target: input,
                            value: input.field,
                        },
                    ],
                    property: 'input',
                    target: { input },
                    value: input,
                },
            ]);
        });
        it('should assign the typeName to the input field', () => {
            const input = { field: 'hola' };
            const it = class_transformer_1.plainToClass(CreateOne, { fakeInput: input });
            const errors = class_validator_1.validateSync(it);
            expect(errors).toEqual([
                {
                    children: [
                        {
                            children: [],
                            constraints: {
                                minLength: 'field must be longer than or equal to 5 characters',
                            },
                            property: 'field',
                            target: input,
                            value: input.field,
                        },
                    ],
                    property: 'input',
                    target: { input },
                    value: input,
                },
            ]);
        });
    });
});
//# sourceMappingURL=create-one-input.type.spec.js.map