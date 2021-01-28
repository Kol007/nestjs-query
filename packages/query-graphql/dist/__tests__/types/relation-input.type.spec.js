"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const graphql_1 = require("@nestjs/graphql");
const src_1 = require("../../src");
const __fixtures__1 = require("../__fixtures__");
describe('RelationInputType', () => {
    let RelationInput = class RelationInput extends src_1.RelationInputType() {
    };
    RelationInput = tslib_1.__decorate([
        graphql_1.InputType()
    ], RelationInput);
    it('should create an args type with an array field', () => {
        let RelationInputTypeSpec = class RelationInputTypeSpec {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            test(input) {
                return 1;
            }
        };
        tslib_1.__decorate([
            graphql_1.Query(() => graphql_1.Int),
            tslib_1.__param(0, graphql_1.Args('input')),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", [RelationInput]),
            tslib_1.__metadata("design:returntype", Number)
        ], RelationInputTypeSpec.prototype, "test", null);
        RelationInputTypeSpec = tslib_1.__decorate([
            graphql_1.Resolver()
        ], RelationInputTypeSpec);
        return __fixtures__1.expectSDL([RelationInputTypeSpec], __fixtures__1.relationInputTypeSDL);
    });
    it('should return the input when accessing the update field', () => {
        const input = { id: 1, relationId: 2 };
        const it = class_transformer_1.plainToClass(RelationInput, input);
        expect(it.id).toEqual(input.id);
        expect(it.relationId).toEqual(input.relationId);
    });
    describe('validation', () => {
        it('should validate the id is defined', () => {
            const input = { relationId: 1 };
            const it = class_transformer_1.plainToClass(RelationInput, input);
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
            const input = { id: '', relationId: 1 };
            const it = class_transformer_1.plainToClass(RelationInput, input);
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
        it('should validate that relationId is defined', () => {
            const input = { id: 1 };
            const it = class_transformer_1.plainToClass(RelationInput, input);
            const errors = class_validator_1.validateSync(it);
            expect(errors).toEqual([
                {
                    children: [],
                    constraints: {
                        isNotEmpty: 'relationId should not be empty',
                    },
                    property: 'relationId',
                    target: input,
                },
            ]);
        });
        it('should validate that relationId is not empty', () => {
            const input = { id: 1, relationId: '' };
            const it = class_transformer_1.plainToClass(RelationInput, input);
            const errors = class_validator_1.validateSync(it);
            expect(errors).toEqual([
                {
                    children: [],
                    constraints: {
                        isNotEmpty: 'relationId should not be empty',
                    },
                    property: 'relationId',
                    target: input,
                    value: input.relationId,
                },
            ]);
        });
    });
});
//# sourceMappingURL=relation-input.type.spec.js.map