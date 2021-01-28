"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const graphql_1 = require("@nestjs/graphql");
const src_1 = require("../../src");
const __fixtures__1 = require("../__fixtures__");
describe('UpdateOneInputType', () => {
    let FakeUpdateOneType = class FakeUpdateOneType {
    };
    tslib_1.__decorate([
        graphql_1.Field(),
        class_validator_1.MinLength(5),
        tslib_1.__metadata("design:type", String)
    ], FakeUpdateOneType.prototype, "name", void 0);
    FakeUpdateOneType = tslib_1.__decorate([
        graphql_1.InputType()
    ], FakeUpdateOneType);
    let UpdateOne = class UpdateOne extends src_1.UpdateOneInputType(FakeUpdateOneType) {
    };
    UpdateOne = tslib_1.__decorate([
        graphql_1.InputType()
    ], UpdateOne);
    it('should create an args type with the field as the type', async () => {
        let UpdateOneInputTypeSpec = class UpdateOneInputTypeSpec {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            updateTest(input) {
                return 1;
            }
        };
        tslib_1.__decorate([
            graphql_1.Query(() => graphql_1.Int),
            tslib_1.__param(0, graphql_1.Args('input')),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", [UpdateOne]),
            tslib_1.__metadata("design:returntype", Number)
        ], UpdateOneInputTypeSpec.prototype, "updateTest", null);
        UpdateOneInputTypeSpec = tslib_1.__decorate([
            graphql_1.Resolver()
        ], UpdateOneInputTypeSpec);
        return __fixtures__1.expectSDL([UpdateOneInputTypeSpec], __fixtures__1.updateOneInputTypeSDL);
    });
    describe('validation', () => {
        it('should validate id is defined is not empty', () => {
            const Type = src_1.UpdateOneInputType(FakeUpdateOneType);
            const input = { update: { name: 'hello world' } };
            const it = class_transformer_1.plainToClass(Type, input);
            const errors = class_validator_1.validateSync(it);
            expect(errors).toEqual([
                {
                    children: [],
                    constraints: {
                        isNotEmpty: 'id should not be empty',
                    },
                    property: 'id',
                    target: input,
                },
            ]);
        });
        it('should validate id is not empty is defined is not empty', () => {
            const Type = src_1.UpdateOneInputType(FakeUpdateOneType);
            const input = { id: '', update: { name: 'hello world' } };
            const it = class_transformer_1.plainToClass(Type, input);
            const errors = class_validator_1.validateSync(it);
            expect(errors).toEqual([
                {
                    children: [],
                    constraints: {
                        isNotEmpty: 'id should not be empty',
                    },
                    property: 'id',
                    target: input,
                    value: input.id,
                },
            ]);
        });
        it('should validate the update input', () => {
            const Type = src_1.UpdateOneInputType(FakeUpdateOneType);
            const input = { id: 'id-1', update: {} };
            const it = class_transformer_1.plainToClass(Type, input);
            const errors = class_validator_1.validateSync(it);
            expect(errors).toEqual([
                {
                    children: [
                        {
                            children: [],
                            constraints: {
                                minLength: 'name must be longer than or equal to 5 characters',
                            },
                            property: 'name',
                            target: {},
                        },
                    ],
                    property: 'update',
                    target: it,
                    value: it.update,
                },
            ]);
        });
    });
});
//# sourceMappingURL=update-one-input.type.spec.js.map