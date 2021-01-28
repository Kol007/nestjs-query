"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const graphql_1 = require("@nestjs/graphql");
const decorators_1 = require("../../src/decorators");
const types_1 = require("../../src/types");
const __fixtures__1 = require("../__fixtures__");
describe('UpdateManyInputType', () => {
    let FakeUpdateManyType = class FakeUpdateManyType {
    };
    tslib_1.__decorate([
        decorators_1.FilterableField(),
        class_validator_1.MinLength(5),
        tslib_1.__metadata("design:type", String)
    ], FakeUpdateManyType.prototype, "name", void 0);
    FakeUpdateManyType = tslib_1.__decorate([
        graphql_1.InputType('FakeUpdateManyInput'),
        graphql_1.ObjectType()
    ], FakeUpdateManyType);
    let UpdateMany = class UpdateMany extends types_1.UpdateManyInputType(FakeUpdateManyType, FakeUpdateManyType) {
    };
    UpdateMany = tslib_1.__decorate([
        graphql_1.InputType()
    ], UpdateMany);
    it('should create an args type with the field as the type', async () => {
        let UpdateManyInputTypeSpec = class UpdateManyInputTypeSpec {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            updateTest(input) {
                return 1;
            }
        };
        tslib_1.__decorate([
            graphql_1.Query(() => graphql_1.Int),
            tslib_1.__param(0, graphql_1.Args('input')),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", [UpdateMany]),
            tslib_1.__metadata("design:returntype", Number)
        ], UpdateManyInputTypeSpec.prototype, "updateTest", null);
        UpdateManyInputTypeSpec = tslib_1.__decorate([
            graphql_1.Resolver()
        ], UpdateManyInputTypeSpec);
        return __fixtures__1.expectSDL([UpdateManyInputTypeSpec], __fixtures__1.updateManyInputTypeSDL);
    });
    it('should return the input when accessing the update field', () => {
        const Type = types_1.UpdateManyInputType(FakeUpdateManyType, FakeUpdateManyType);
        const input = {};
        const it = class_transformer_1.plainToClass(Type, input);
        expect(it).toEqual(input);
    });
    describe('validation', () => {
        it('should validate the filter is not empty', () => {
            const input = { update: { name: 'hello world' } };
            const it = class_transformer_1.plainToClass(UpdateMany, input);
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
        it('should validate the update input', () => {
            const input = { filter: { name: { eq: 'hello world' } }, update: {} };
            const it = class_transformer_1.plainToClass(UpdateMany, input);
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
                    target: input,
                    value: input.update,
                },
            ]);
        });
    });
});
//# sourceMappingURL=update-many-input.type.spec.js.map