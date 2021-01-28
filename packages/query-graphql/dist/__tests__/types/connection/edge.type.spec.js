"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const connection_1 = require("../../../src/types/connection");
const __fixtures__1 = require("../../__fixtures__");
describe('EdgeType', () => {
    let FakeType = class FakeType {
    };
    tslib_1.__decorate([
        graphql_1.Field(),
        tslib_1.__metadata("design:type", String)
    ], FakeType.prototype, "field", void 0);
    FakeType = tslib_1.__decorate([
        graphql_1.ObjectType()
    ], FakeType);
    const TestEdge = connection_1.EdgeType(FakeType);
    it('should create an edge type for the dto', () => {
        let TestEdgeTypeResolver = class TestEdgeTypeResolver {
            test() {
                return undefined;
            }
        };
        tslib_1.__decorate([
            graphql_1.Query(() => TestEdge),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", Object)
        ], TestEdgeTypeResolver.prototype, "test", null);
        TestEdgeTypeResolver = tslib_1.__decorate([
            graphql_1.Resolver()
        ], TestEdgeTypeResolver);
        return __fixtures__1.expectSDL([TestEdgeTypeResolver], __fixtures__1.edgeObjectTypeSDL);
    });
    it('should return the same an edge type for a dto', () => {
        expect(TestEdge).toBe(connection_1.EdgeType(FakeType));
    });
    it('should not return the same an edge type for a different dto', () => {
        let FakeTypeTwo = class FakeTypeTwo {
        };
        FakeTypeTwo = tslib_1.__decorate([
            graphql_1.ObjectType('Fake2')
        ], FakeTypeTwo);
        expect(connection_1.EdgeType(FakeType)).not.toBe(connection_1.EdgeType(FakeTypeTwo));
    });
    it('should throw an error for a type that is not registered with types-graphql', () => {
        class BadDTO {
        }
        expect(() => connection_1.EdgeType(BadDTO)).toThrow('Unable to make EdgeType for class. Ensure BadDTO is annotated with @nestjs/graphql @ObjectType');
    });
});
//# sourceMappingURL=edge.type.spec.js.map