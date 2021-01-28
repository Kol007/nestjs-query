"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const noop_query_service_1 = require("../../src/services/noop-query.service");
describe('NoOpQueryService', () => {
    class TestType {
    }
    const instance = noop_query_service_1.NoOpQueryService.getInstance();
    it('should throw a NotImplementedException when calling addRelations', () => {
        return expect(instance.addRelations('test', 1, [1, 2, 3])).rejects.toThrow('addRelations is not implemented');
    });
    it('should throw a NotImplementedException when calling createMany', () => {
        return expect(instance.createMany([{ foo: 'bar' }])).rejects.toThrow('createMany is not implemented');
    });
    it('should throw a NotImplementedException when calling createOne', () => {
        return expect(instance.createOne({ foo: 'bar' })).rejects.toThrow('createOne is not implemented');
    });
    it('should throw a NotImplementedException when calling deleteMany', () => {
        return expect(instance.deleteMany({ foo: { eq: 'bar' } })).rejects.toThrow('deleteMany is not implemented');
    });
    it('should throw a NotImplementedException when calling deleteOne', () => {
        return expect(instance.deleteOne(1)).rejects.toThrow('deleteOne is not implemented');
    });
    it('should throw a NotImplementedException when calling findById', () => {
        return expect(instance.findById(1)).rejects.toThrow('findById is not implemented');
    });
    it('should throw a NotImplementedException when calling findRelation', () => {
        return expect(instance.findRelation(TestType, 'test', new TestType())).rejects.toThrow('findRelation is not implemented');
    });
    it('should throw a NotImplementedException when calling getById', () => {
        return expect(instance.getById(1)).rejects.toThrow('getById is not implemented');
    });
    it('should throw a NotImplementedException when calling query', () => {
        return expect(instance.query({})).rejects.toThrow('query is not implemented');
    });
    it('should throw a NotImplementedException when calling aggregate', () => {
        return expect(instance.aggregate({}, {})).rejects.toThrow('aggregate is not implemented');
    });
    it('should throw a NotImplementedException when calling count', () => {
        return expect(instance.count({})).rejects.toThrow('count is not implemented');
    });
    it('should throw a NotImplementedException when calling queryRelations', () => {
        return expect(instance.queryRelations(TestType, 'test', new TestType(), {})).rejects.toThrow('queryRelations is not implemented');
    });
    it('should throw a NotImplementedException when calling countRelations', () => {
        return expect(instance.countRelations(TestType, 'test', new TestType(), {})).rejects.toThrow('countRelations is not implemented');
    });
    it('should throw a NotImplementedException when calling removeRelation', () => {
        return expect(instance.removeRelation('test', 1, 2)).rejects.toThrow('removeRelation is not implemented');
    });
    it('should throw a NotImplementedException when calling removeRelations', () => {
        return expect(instance.removeRelations('test', 1, [1, 2, 3])).rejects.toThrow('removeRelations is not implemented');
    });
    it('should throw a NotImplementedException when calling setRelation', () => {
        return expect(instance.setRelation('test', 1, 1)).rejects.toThrow('setRelation is not implemented');
    });
    it('should throw a NotImplementedException when calling updateMany', () => {
        return expect(instance.updateMany({ foo: 'bar' }, {})).rejects.toThrow('updateMany is not implemented');
    });
    it('should throw a NotImplementedException when calling updateOne', () => {
        return expect(instance.updateOne(1, { foo: 'bar' })).rejects.toThrow('updateOne is not implemented');
    });
    it('should throw a NotImplementedException when calling aggregateRelations', () => {
        return expect(instance.aggregateRelations(TestType, 'test', new TestType(), {}, {})).rejects.toThrow('aggregateRelations is not implemented');
    });
});
//# sourceMappingURL=noop-query.service.spec.js.map