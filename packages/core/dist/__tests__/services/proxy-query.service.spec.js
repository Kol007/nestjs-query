"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_mockito_1 = require("ts-mockito");
const proxy_query_service_1 = require("../../src/services/proxy-query.service");
describe('ProxyQueryService', () => {
    class TestType {
    }
    const mockQueryService = ts_mockito_1.mock();
    afterEach(() => ts_mockito_1.reset(mockQueryService));
    const queryService = new proxy_query_service_1.ProxyQueryService(ts_mockito_1.instance(mockQueryService));
    it('should proxy to the underlying service when calling addRelations', () => {
        const relationName = 'test';
        const id = 1;
        const relationIds = [1, 2, 3];
        const result = { foo: 'bar' };
        ts_mockito_1.when(mockQueryService.addRelations(relationName, id, relationIds, undefined)).thenResolve(result);
        return expect(queryService.addRelations(relationName, id, relationIds)).resolves.toBe(result);
    });
    it('should proxy to the underlying service when calling createMany', () => {
        const entities = [{ foo: 'bar' }];
        ts_mockito_1.when(mockQueryService.createMany(entities)).thenResolve(entities);
        return expect(queryService.createMany(entities)).resolves.toBe(entities);
    });
    it('should proxy to the underlying service when calling createOne', () => {
        const entity = { foo: 'bar' };
        ts_mockito_1.when(mockQueryService.createOne(entity)).thenResolve(entity);
        return expect(queryService.createOne(entity)).resolves.toBe(entity);
    });
    it('should proxy to the underlying service when calling deleteMany', () => {
        const filter = {};
        const result = { deletedCount: 2 };
        ts_mockito_1.when(mockQueryService.deleteMany(filter)).thenResolve(result);
        return expect(queryService.deleteMany(filter)).resolves.toBe(result);
    });
    it('should proxy to the underlying service when calling deleteOne', () => {
        const result = { foo: 'bar' };
        ts_mockito_1.when(mockQueryService.deleteOne(1, undefined)).thenResolve(result);
        return expect(queryService.deleteOne(1)).resolves.toBe(result);
    });
    it('should proxy to the underlying service when calling findById', () => {
        const result = { foo: 'bar' };
        ts_mockito_1.when(mockQueryService.findById(1, undefined)).thenResolve(result);
        return expect(queryService.findById(1)).resolves.toBe(result);
    });
    it('should proxy to the underlying service when calling findRelation with one dto', () => {
        const relationName = 'test';
        const dto = new TestType();
        const result = { foo: 'bar' };
        ts_mockito_1.when(mockQueryService.findRelation(TestType, relationName, dto, undefined)).thenResolve(result);
        return expect(queryService.findRelation(TestType, relationName, dto)).resolves.toBe(result);
    });
    it('should proxy to the underlying service when calling findRelation with multiple dtos', () => {
        const relationName = 'test';
        const dtos = [new TestType()];
        const result = new Map([[{ foo: 'bar' }, undefined]]);
        ts_mockito_1.when(mockQueryService.findRelation(TestType, relationName, dtos, undefined)).thenResolve(result);
        return expect(queryService.findRelation(TestType, relationName, dtos)).resolves.toBe(result);
    });
    it('should proxy to the underlying service when calling getById', () => {
        const result = { foo: 'bar' };
        ts_mockito_1.when(mockQueryService.getById(1, undefined)).thenResolve(result);
        return expect(queryService.getById(1)).resolves.toBe(result);
    });
    it('should proxy to the underlying service when calling query', () => {
        const query = {};
        const result = [{ foo: 'bar' }];
        ts_mockito_1.when(mockQueryService.query(query)).thenResolve(result);
        return expect(queryService.query(query)).resolves.toBe(result);
    });
    it('should proxy to the underlying service when calling aggregate', () => {
        const filter = {};
        const aggregate = { count: ['foo'] };
        const result = { count: { foo: 1 } };
        ts_mockito_1.when(mockQueryService.aggregate(filter, aggregate)).thenResolve(result);
        return expect(queryService.aggregate(filter, aggregate)).resolves.toBe(result);
    });
    it('should proxy to the underlying service when calling count', () => {
        const query = {};
        const result = 1;
        ts_mockito_1.when(mockQueryService.count(query)).thenResolve(result);
        return expect(queryService.count(query)).resolves.toBe(result);
    });
    it('should proxy to the underlying service when calling queryRelations with one dto', () => {
        const relationName = 'test';
        const dto = new TestType();
        const query = {};
        const result = [{ foo: 'bar' }];
        ts_mockito_1.when(mockQueryService.queryRelations(TestType, relationName, dto, query)).thenResolve(result);
        return expect(queryService.queryRelations(TestType, relationName, dto, query)).resolves.toBe(result);
    });
    it('should proxy to the underlying service when calling queryRelations with many dtos', () => {
        const relationName = 'test';
        const dtos = [new TestType()];
        const query = {};
        const result = new Map([[{ foo: 'bar' }, []]]);
        ts_mockito_1.when(mockQueryService.queryRelations(TestType, relationName, dtos, query)).thenResolve(result);
        return expect(queryService.queryRelations(TestType, relationName, dtos, query)).resolves.toBe(result);
    });
    it('should proxy to the underlying service when calling aggregateRelations with one dto', () => {
        const relationName = 'test';
        const dto = new TestType();
        const filter = {};
        const aggQuery = { count: ['foo'] };
        const result = { count: { foo: 1 } };
        ts_mockito_1.when(mockQueryService.aggregateRelations(TestType, relationName, dto, filter, aggQuery)).thenResolve(result);
        return expect(queryService.aggregateRelations(TestType, relationName, dto, filter, aggQuery)).resolves.toBe(result);
    });
    it('should proxy to the underlying service when calling aggregateRelations with many dtos', () => {
        const relationName = 'test';
        const dtos = [new TestType()];
        const filter = {};
        const aggQuery = { count: ['foo'] };
        const result = new Map([[{ foo: 'bar' }, { count: { foo: 1 } }]]);
        ts_mockito_1.when(mockQueryService.aggregateRelations(TestType, relationName, dtos, filter, aggQuery)).thenResolve(result);
        return expect(queryService.aggregateRelations(TestType, relationName, dtos, filter, aggQuery)).resolves.toBe(result);
    });
    it('should proxy to the underlying service when calling countRelations with one dto', () => {
        const relationName = 'test';
        const dto = new TestType();
        const query = {};
        const result = 1;
        ts_mockito_1.when(mockQueryService.countRelations(TestType, relationName, dto, query)).thenResolve(result);
        return expect(queryService.countRelations(TestType, relationName, dto, query)).resolves.toBe(result);
    });
    it('should proxy to the underlying service when calling countRelations with many dtos', () => {
        const relationName = 'test';
        const dtos = [new TestType()];
        const query = {};
        const result = new Map([[{ foo: 'bar' }, 1]]);
        ts_mockito_1.when(mockQueryService.countRelations(TestType, relationName, dtos, query)).thenResolve(result);
        return expect(queryService.countRelations(TestType, relationName, dtos, query)).resolves.toBe(result);
    });
    it('should proxy to the underlying service when calling removeRelation', () => {
        const relationName = 'test';
        const id = 1;
        const relationId = 2;
        const result = { foo: 'bar' };
        ts_mockito_1.when(mockQueryService.removeRelation(relationName, id, relationId, undefined)).thenResolve(result);
        return expect(queryService.removeRelation(relationName, id, relationId)).resolves.toBe(result);
    });
    it('should proxy to the underlying service when calling removeRelations', () => {
        const relationName = 'test';
        const id = 1;
        const relationIds = [2];
        const result = { foo: 'bar' };
        ts_mockito_1.when(mockQueryService.removeRelations(relationName, id, relationIds, undefined)).thenResolve(result);
        return expect(queryService.removeRelations(relationName, id, relationIds)).resolves.toBe(result);
    });
    it('should proxy to the underlying service when calling setRelation', () => {
        const relationName = 'test';
        const id = 1;
        const relationId = 2;
        const result = { foo: 'bar' };
        ts_mockito_1.when(mockQueryService.setRelation(relationName, id, relationId, undefined)).thenResolve(result);
        return expect(queryService.setRelation(relationName, id, relationId)).resolves.toBe(result);
    });
    it('should proxy to the underlying service when calling updateMany', () => {
        const update = { foo: 'bar' };
        const filter = {};
        const result = { updatedCount: 1 };
        ts_mockito_1.when(mockQueryService.updateMany(update, filter)).thenResolve(result);
        return expect(queryService.updateMany(update, filter)).resolves.toBe(result);
    });
    it('should proxy to the underlying service when calling updateOne', () => {
        const id = 1;
        const update = { foo: 'bar' };
        const result = { foo: 'bar' };
        ts_mockito_1.when(mockQueryService.updateOne(id, update, undefined)).thenResolve(result);
        return expect(queryService.updateOne(id, update)).resolves.toBe(result);
    });
});
//# sourceMappingURL=proxy-query.service.spec.js.map