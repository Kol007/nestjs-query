"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const graphql_1 = require("@nestjs/graphql");
const src_1 = require("../../src");
const __fixtures__1 = require("../__fixtures__");
describe('RelationsInputType', () => {
    let RelationsInput = class RelationsInput extends src_1.RelationsInputType() {
    };
    RelationsInput = tslib_1.__decorate([
        graphql_1.InputType()
    ], RelationsInput);
    it('should create an args type with an array field', () => {
        let RelationsInputTypeSpec = class RelationsInputTypeSpec {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            test(input) {
                return 1;
            }
        };
        tslib_1.__decorate([
            graphql_1.Query(() => graphql_1.Int),
            tslib_1.__param(0, graphql_1.Args('input')),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", [RelationsInput]),
            tslib_1.__metadata("design:returntype", Number)
        ], RelationsInputTypeSpec.prototype, "test", null);
        RelationsInputTypeSpec = tslib_1.__decorate([
            graphql_1.Resolver()
        ], RelationsInputTypeSpec);
        return __fixtures__1.expectSDL([RelationsInputTypeSpec], __fixtures__1.relationsInputTypeSDL);
    });
    it('should return the input when accessing the update field', () => {
        const input = { id: 1, relationIds: [2, 3, 4] };
        const it = class_transformer_1.plainToClass(RelationsInput, input);
        expect(it.id).toEqual(input.id);
        expect(it.relationIds).toEqual(input.relationIds);
    });
    describe('validation', () => {
        it('should validate the id is defined', () => {
            const input = { relationIds: [2, 3, 4] };
            const it = class_transformer_1.plainToClass(RelationsInput, input);
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
            const input = { id: '', relationIds: [2, 3, 4] };
            const it = class_transformer_1.plainToClass(RelationsInput, input);
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
        it('should validate that relationsIds is not empty', () => {
            const input = { id: 1, relationIds: [] };
            const it = class_transformer_1.plainToClass(RelationsInput, input);
            const errors = class_validator_1.validateSync(it);
            expect(errors).toEqual([
                {
                    children: [],
                    constraints: {
                        arrayNotEmpty: 'relationIds should not be empty',
                    },
                    property: 'relationIds',
                    target: input,
                    value: input.relationIds,
                },
            ]);
        });
        it('should validate that relationsIds is unique', () => {
            const input = { id: 1, relationIds: [1, 2, 1, 2] };
            const it = class_transformer_1.plainToClass(RelationsInput, input);
            const errors = class_validator_1.validateSync(it);
            expect(errors).toEqual([
                {
                    children: [],
                    constraints: {
                        arrayUnique: "All relationIds's elements must be unique",
                    },
                    property: 'relationIds',
                    target: input,
                    value: input.relationIds,
                },
            ]);
        });
        it('should validate that relationsIds does not contain an empty id', () => {
            const input = { id: 1, relationIds: [''] };
            const it = class_transformer_1.plainToClass(RelationsInput, input);
            const errors = class_validator_1.validateSync(it);
            expect(errors).toEqual([
                {
                    children: [],
                    constraints: {
                        isNotEmpty: 'each value in relationIds should not be empty',
                    },
                    property: 'relationIds',
                    target: input,
                    value: input.relationIds,
                },
            ]);
        });
    });
});
//# sourceMappingURL=relations-input.type.spec.js.map