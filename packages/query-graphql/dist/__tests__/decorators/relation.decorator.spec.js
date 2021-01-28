"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// eslint-disable-next-line max-classes-per-file
const graphql_1 = require("@nestjs/graphql");
const src_1 = require("../../src");
const decorators_1 = require("../../src/decorators");
let TestRelation = class TestRelation {
};
TestRelation = tslib_1.__decorate([
    graphql_1.ObjectType()
], TestRelation);
describe('@Relation', () => {
    it('should add the relation metadata to the metadata storage', () => {
        const relationFn = () => TestRelation;
        const relationOpts = { disableRead: true };
        let TestDTO = class TestDTO {
        };
        TestDTO = tslib_1.__decorate([
            graphql_1.ObjectType(),
            src_1.Relation('test', relationFn, relationOpts)
        ], TestDTO);
        const relations = decorators_1.getRelations(TestDTO);
        expect(relations).toEqual({ one: { test: { DTO: TestRelation, ...relationOpts } } });
    });
    it('should set the isMany flag if the relationFn returns an array', () => {
        const relationFn = () => [TestRelation];
        const relationOpts = { disableRead: true };
        let TestDTO = class TestDTO {
        };
        TestDTO = tslib_1.__decorate([
            graphql_1.ObjectType(),
            src_1.Relation('tests', relationFn, relationOpts)
        ], TestDTO);
        const relations = decorators_1.getRelations(TestDTO);
        expect(relations).toEqual({
            many: { tests: { DTO: TestRelation, ...relationOpts, pagingStrategy: src_1.PagingStrategies.OFFSET } },
        });
    });
});
describe('@FilterableRelation', () => {
    it('should add the relation metadata to the metadata storage', () => {
        const relationFn = () => TestRelation;
        const relationOpts = { disableRead: true };
        let TestDTO = class TestDTO {
        };
        TestDTO = tslib_1.__decorate([
            graphql_1.ObjectType(),
            src_1.FilterableRelation('test', relationFn, relationOpts)
        ], TestDTO);
        const relations = decorators_1.getRelations(TestDTO);
        expect(relations).toEqual({ one: { test: { DTO: TestRelation, ...relationOpts, allowFiltering: true } } });
    });
    it('should set the isMany flag if the relationFn returns an array', () => {
        const relationFn = () => [TestRelation];
        const relationOpts = { disableRead: true };
        let TestDTO = class TestDTO {
        };
        TestDTO = tslib_1.__decorate([
            graphql_1.ObjectType(),
            src_1.FilterableRelation('tests', relationFn, relationOpts)
        ], TestDTO);
        const relations = decorators_1.getRelations(TestDTO);
        expect(relations).toEqual({
            many: {
                tests: { DTO: TestRelation, ...relationOpts, pagingStrategy: src_1.PagingStrategies.OFFSET, allowFiltering: true },
            },
        });
    });
});
describe('@Connection', () => {
    it('should add the relation metadata to the metadata storage', () => {
        const relationFn = () => TestRelation;
        const relationOpts = { disableRead: true };
        let TestDTO = class TestDTO {
        };
        TestDTO = tslib_1.__decorate([
            graphql_1.ObjectType(),
            src_1.Connection('test', relationFn, relationOpts)
        ], TestDTO);
        const relations = decorators_1.getRelations(TestDTO);
        expect(relations).toEqual({
            many: { test: { DTO: TestRelation, ...relationOpts, pagingStrategy: src_1.PagingStrategies.CURSOR } },
        });
    });
});
describe('@FilterableConnection', () => {
    it('should add the relation metadata to the metadata storage', () => {
        const relationFn = () => TestRelation;
        const relationOpts = { disableRead: true };
        let TestDTO = class TestDTO {
        };
        TestDTO = tslib_1.__decorate([
            graphql_1.ObjectType(),
            src_1.FilterableConnection('test', relationFn, relationOpts)
        ], TestDTO);
        const relations = decorators_1.getRelations(TestDTO);
        expect(relations).toEqual({
            many: {
                test: { DTO: TestRelation, ...relationOpts, pagingStrategy: src_1.PagingStrategies.CURSOR, allowFiltering: true },
            },
        });
    });
});
describe('getRelations', () => {
    let SomeRelation = class SomeRelation {
    };
    SomeRelation = tslib_1.__decorate([
        graphql_1.ObjectType()
    ], SomeRelation);
    let BaseType = class BaseType {
    };
    BaseType = tslib_1.__decorate([
        graphql_1.ObjectType({ isAbstract: true }),
        src_1.Relation('test', () => SomeRelation),
        src_1.Relation('tests', () => [SomeRelation]),
        src_1.Connection('testConnection', () => SomeRelation)
    ], BaseType);
    let ImplementingClass = class ImplementingClass extends BaseType {
    };
    ImplementingClass = tslib_1.__decorate([
        graphql_1.ObjectType(),
        src_1.Relation('implementedRelation', () => SomeRelation),
        src_1.Relation('implementedRelations', () => [SomeRelation]),
        src_1.Connection('implementedConnection', () => SomeRelation)
    ], ImplementingClass);
    let DuplicateImplementor = class DuplicateImplementor extends ImplementingClass {
    };
    DuplicateImplementor = tslib_1.__decorate([
        graphql_1.ObjectType(),
        src_1.Relation('implementedRelation', () => SomeRelation, { relationName: 'test' }),
        src_1.Relation('implementedRelations', () => [SomeRelation], { relationName: 'tests' }),
        src_1.Connection('implementedConnection', () => SomeRelation, { relationName: 'testConnection' })
    ], DuplicateImplementor);
    it('should return relations for a type', () => {
        expect(decorators_1.getRelations(BaseType)).toEqual({
            one: {
                test: { DTO: SomeRelation },
            },
            many: {
                tests: { DTO: SomeRelation, pagingStrategy: 'offset' },
                testConnection: { DTO: SomeRelation, pagingStrategy: 'cursor' },
            },
        });
    });
    it('should return inherited relations fields for a type', () => {
        expect(decorators_1.getRelations(ImplementingClass)).toEqual({
            one: {
                test: { DTO: SomeRelation },
                implementedRelation: { DTO: SomeRelation },
            },
            many: {
                tests: { DTO: SomeRelation, pagingStrategy: src_1.PagingStrategies.OFFSET },
                testConnection: { DTO: SomeRelation, pagingStrategy: src_1.PagingStrategies.CURSOR },
                implementedRelations: { DTO: SomeRelation, pagingStrategy: src_1.PagingStrategies.OFFSET },
                implementedConnection: { DTO: SomeRelation, pagingStrategy: src_1.PagingStrategies.CURSOR },
            },
        });
    });
    it('should exclude duplicate inherited relations fields for a type', () => {
        expect(decorators_1.getRelations(DuplicateImplementor)).toEqual({
            one: {
                test: { DTO: SomeRelation },
                implementedRelation: { DTO: SomeRelation, relationName: 'test' },
            },
            many: {
                tests: { DTO: SomeRelation, pagingStrategy: src_1.PagingStrategies.OFFSET },
                testConnection: { DTO: SomeRelation, pagingStrategy: src_1.PagingStrategies.CURSOR },
                implementedRelations: { DTO: SomeRelation, pagingStrategy: src_1.PagingStrategies.OFFSET, relationName: 'tests' },
                implementedConnection: {
                    DTO: SomeRelation,
                    pagingStrategy: src_1.PagingStrategies.CURSOR,
                    relationName: 'testConnection',
                },
            },
        });
    });
});
//# sourceMappingURL=relation.decorator.spec.js.map