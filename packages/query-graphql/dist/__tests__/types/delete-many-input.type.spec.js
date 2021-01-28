"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const graphql_1 = require("@nestjs/graphql");
const src_1 = require("../../src");
const decorators_1 = require("../../src/decorators");
const __fixtures__1 = require("../__fixtures__");
describe('DeleteManyInputType', () => {
    let DeleteManyDTO = class DeleteManyDTO {
    };
    tslib_1.__decorate([
        decorators_1.FilterableField(),
        tslib_1.__metadata("design:type", String)
    ], DeleteManyDTO.prototype, "field", void 0);
    DeleteManyDTO = tslib_1.__decorate([
        graphql_1.ObjectType()
    ], DeleteManyDTO);
    let DeleteMany = class DeleteMany extends src_1.DeleteManyInputType(DeleteManyDTO) {
    };
    DeleteMany = tslib_1.__decorate([
        graphql_1.InputType()
    ], DeleteMany);
    it('should create an args type with the field as the type', async () => {
        let DeleteManyInputTypeSpec = class DeleteManyInputTypeSpec {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            test(input) {
                return 1;
            }
        };
        tslib_1.__decorate([
            graphql_1.Query(() => graphql_1.Int),
            tslib_1.__param(0, graphql_1.Args('input')),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", [DeleteMany]),
            tslib_1.__metadata("design:returntype", Number)
        ], DeleteManyInputTypeSpec.prototype, "test", null);
        DeleteManyInputTypeSpec = tslib_1.__decorate([
            graphql_1.Resolver()
        ], DeleteManyInputTypeSpec);
        return __fixtures__1.expectSDL([DeleteManyInputTypeSpec], __fixtures__1.deleteManyInputTypeSDL);
    });
    describe('validation', () => {
        it('should validate the filter is defined', () => {
            const input = {};
            const it = class_transformer_1.plainToClass(DeleteMany, input);
            const errors = class_validator_1.validateSync(it);
            expect(errors).toEqual([
                {
                    children: [],
                    constraints: {
                        isNotEmptyObject: 'filter must be a non-empty object',
                    },
                    property: 'filter',
                    target: input,
                },
            ]);
        });
        it('should validate the filter is not empty', () => {
            const input = { filter: {} };
            const it = class_transformer_1.plainToClass(DeleteMany, input);
            const errors = class_validator_1.validateSync(it);
            expect(errors).toEqual([
                {
                    children: [],
                    constraints: {
                        isNotEmptyObject: 'filter must be a non-empty object',
                    },
                    property: 'filter',
                    target: input,
                    value: input.filter,
                },
            ]);
        });
    });
});
//# sourceMappingURL=delete-many-input.type.spec.js.map