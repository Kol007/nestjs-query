"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const src_1 = require("../../../src");
const __fixtures__1 = require("../../__fixtures__");
describe('AggregateResponseType', () => {
    let FakeType = class FakeType {
    };
    tslib_1.__decorate([
        src_1.FilterableField(),
        tslib_1.__metadata("design:type", String)
    ], FakeType.prototype, "stringField", void 0);
    tslib_1.__decorate([
        src_1.FilterableField(),
        tslib_1.__metadata("design:type", Number)
    ], FakeType.prototype, "numberField", void 0);
    tslib_1.__decorate([
        src_1.FilterableField(),
        tslib_1.__metadata("design:type", Boolean)
    ], FakeType.prototype, "boolField", void 0);
    tslib_1.__decorate([
        src_1.FilterableField(() => graphql_1.GraphQLISODateTime),
        tslib_1.__metadata("design:type", Date)
    ], FakeType.prototype, "dateField", void 0);
    FakeType = tslib_1.__decorate([
        graphql_1.ObjectType()
    ], FakeType);
    it('should create an aggregate type with the correct fields for each type', async () => {
        const AggResponse = src_1.AggregateResponseType(FakeType);
        let AggregateResponseTypeSpec = class AggregateResponseTypeSpec {
            aggregate() {
                return {};
            }
        };
        tslib_1.__decorate([
            graphql_1.Query(() => AggResponse),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", Object)
        ], AggregateResponseTypeSpec.prototype, "aggregate", null);
        AggregateResponseTypeSpec = tslib_1.__decorate([
            graphql_1.Resolver()
        ], AggregateResponseTypeSpec);
        return __fixtures__1.expectSDL([AggregateResponseTypeSpec], __fixtures__1.aggregateResponseTypeSDL);
    });
    it('should return the same class if called multiple times', async () => {
        src_1.AggregateResponseType(FakeType);
        const AggResponse = src_1.AggregateResponseType(FakeType);
        let AggregateResponseTypeSpec = class AggregateResponseTypeSpec {
            aggregate() {
                return {};
            }
        };
        tslib_1.__decorate([
            graphql_1.Query(() => AggResponse),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", Object)
        ], AggregateResponseTypeSpec.prototype, "aggregate", null);
        AggregateResponseTypeSpec = tslib_1.__decorate([
            graphql_1.Resolver()
        ], AggregateResponseTypeSpec);
        return __fixtures__1.expectSDL([AggregateResponseTypeSpec], __fixtures__1.aggregateResponseTypeSDL);
    });
    it('should create an aggregate type with a custom name', async () => {
        const AggResponse = src_1.AggregateResponseType(FakeType, { prefix: 'CustomPrefix' });
        let AggregateResponseTypeSpec = class AggregateResponseTypeSpec {
            aggregate() {
                return {};
            }
        };
        tslib_1.__decorate([
            graphql_1.Query(() => AggResponse),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", Object)
        ], AggregateResponseTypeSpec.prototype, "aggregate", null);
        AggregateResponseTypeSpec = tslib_1.__decorate([
            graphql_1.Resolver(() => AggResponse)
        ], AggregateResponseTypeSpec);
        return __fixtures__1.expectSDL([AggregateResponseTypeSpec], __fixtures__1.aggregateResponseTypeWithCustomNameSDL);
    });
    it('throw an error if the type is not registered', () => {
        class BadType {
        }
        expect(() => src_1.AggregateResponseType(BadType)).toThrow('Unable to make AggregationResponseType. Ensure BadType is annotated with @nestjs/graphql @ObjectType');
    });
    it('throw an error if fields are not found', () => {
        let BadType = class BadType {
        };
        BadType = tslib_1.__decorate([
            graphql_1.ObjectType()
        ], BadType);
        expect(() => src_1.AggregateResponseType(BadType)).toThrow('No fields found to create AggregationResponseType for BadType. Ensure fields are annotated with @FilterableField');
    });
});
//# sourceMappingURL=aggregate-response.type.spec.js.map