"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const graphql_1 = require("@nestjs/graphql");
const src_1 = require("../../src");
const __fixtures__1 = require("../__fixtures__");
describe('DeleteOneInputType', () => {
    let DeleteOne = class DeleteOne extends src_1.DeleteOneInputType() {
    };
    DeleteOne = tslib_1.__decorate([
        graphql_1.InputType()
    ], DeleteOne);
    it('should create an args type with the field as the type', async () => {
        let DeleteOneInputTypeSpec = class DeleteOneInputTypeSpec {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            test(input) {
                return 1;
            }
        };
        tslib_1.__decorate([
            graphql_1.Query(() => graphql_1.Int),
            tslib_1.__param(0, graphql_1.Args('input')),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", [DeleteOne]),
            tslib_1.__metadata("design:returntype", Number)
        ], DeleteOneInputTypeSpec.prototype, "test", null);
        DeleteOneInputTypeSpec = tslib_1.__decorate([
            graphql_1.Resolver()
        ], DeleteOneInputTypeSpec);
        return __fixtures__1.expectSDL([DeleteOneInputTypeSpec], __fixtures__1.deleteOneInputTypeSDL);
    });
    describe('validation', () => {
        it('should validate the id is defined', () => {
            const input = {};
            const it = class_transformer_1.plainToClass(DeleteOne, input);
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
        it('should validate the id is not empty', () => {
            const input = { id: '' };
            const it = class_transformer_1.plainToClass(DeleteOne, input);
            const errors = class_validator_1.validateSync(it);
            expect(errors).toEqual([
                {
                    children: [],
                    constraints: {
                        isNotEmpty: 'id should not be empty',
                    },
                    property: 'id',
                    target: input,
                    value: '',
                },
            ]);
        });
    });
});
//# sourceMappingURL=delete-one-input.type.spec.js.map