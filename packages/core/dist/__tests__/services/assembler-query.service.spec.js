"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_mockito_1 = require("ts-mockito");
const src_1 = require("../../src");
describe('AssemblerQueryService', () => {
    class TestDTO {
    }
    class TestEntity {
    }
    class TestAssembler extends src_1.AbstractAssembler {
        constructor() {
            super(TestDTO, TestEntity);
        }
        convertToDTO(entity) {
            return {
                foo: entity.bar,
            };
        }
        convertToEntity(dto) {
            return {
                bar: dto.foo,
            };
        }
        convertQuery(query) {
            return src_1.transformQuery(query, {
                foo: 'bar',
            });
        }
        convertAggregateQuery(aggregate) {
            return src_1.transformAggregateQuery(aggregate, {
                foo: 'bar',
            });
        }
        convertAggregateResponse(aggregate) {
            return src_1.transformAggregateResponse(aggregate, {
                bar: 'foo',
            });
        }
        convertToCreateEntity(create) {
            return { bar: create.foo };
        }
        convertToUpdateEntity(update) {
            return { bar: update.foo };
        }
    }
    describe('query', () => {
        it('transform the query and results', () => {
            const mockQueryService = ts_mockito_1.mock();
            const assemblerService = new src_1.AssemblerQueryService(new TestAssembler(), ts_mockito_1.instance(mockQueryService));
            ts_mockito_1.when(mockQueryService.query(ts_mockito_1.objectContaining({ filter: { bar: { eq: 'bar' } } }))).thenResolve([{ bar: 'bar' }]);
            return expect(assemblerService.query({ filter: { foo: { eq: 'bar' } } })).resolves.toEqual([{ foo: 'bar' }]);
        });
    });
    describe('count', () => {
        it('transform the filter and results', () => {
            const mockQueryService = ts_mockito_1.mock();
            const assemblerService = new src_1.AssemblerQueryService(new TestAssembler(), ts_mockito_1.instance(mockQueryService));
            ts_mockito_1.when(mockQueryService.count(ts_mockito_1.objectContaining({ bar: { eq: 'bar' } }))).thenResolve(1);
            return expect(assemblerService.count({ foo: { eq: 'bar' } })).resolves.toEqual(1);
        });
    });
    describe('findById', () => {
        it('should transform the results', () => {
            const mockQueryService = ts_mockito_1.mock();
            const assemblerService = new src_1.AssemblerQueryService(new TestAssembler(), ts_mockito_1.instance(mockQueryService));
            ts_mockito_1.when(mockQueryService.findById(1, undefined)).thenResolve({ bar: 'bar' });
            return expect(assemblerService.findById(1)).resolves.toEqual({ foo: 'bar' });
        });
        it('should transform a filter if provided', () => {
            const mockQueryService = ts_mockito_1.mock();
            const assemblerService = new src_1.AssemblerQueryService(new TestAssembler(), ts_mockito_1.instance(mockQueryService));
            ts_mockito_1.when(mockQueryService.findById(1, ts_mockito_1.objectContaining({ filter: { bar: { eq: 'bar' } } }))).thenResolve({
                bar: 'bar',
            });
            return expect(assemblerService.findById(1, { filter: { foo: { eq: 'bar' } } })).resolves.toEqual({ foo: 'bar' });
        });
        it('should not transform the results if undefined', () => {
            const mockQueryService = ts_mockito_1.mock();
            const assemblerService = new src_1.AssemblerQueryService(new TestAssembler(), ts_mockito_1.instance(mockQueryService));
            ts_mockito_1.when(mockQueryService.findById(1)).thenResolve(undefined);
            return expect(assemblerService.findById(1)).resolves.toBeUndefined();
        });
    });
    describe('queryRelations', () => {
        it('should transform the results for a single entity', () => {
            const mockQueryService = ts_mockito_1.mock();
            const assemblerService = new src_1.AssemblerQueryService(new TestAssembler(), ts_mockito_1.instance(mockQueryService));
            ts_mockito_1.when(mockQueryService.queryRelations(TestDTO, 'test', ts_mockito_1.objectContaining({ bar: 'bar' }), ts_mockito_1.objectContaining({ filter: { foo: { eq: 'bar' } } }))).thenResolve([{ foo: 'bar' }]);
            return expect(assemblerService.queryRelations(TestDTO, 'test', { foo: 'bar' }, { filter: { foo: { eq: 'bar' } } })).resolves.toEqual([{ foo: 'bar' }]);
        });
        it('should transform the results for multiple entities', () => {
            const mockQueryService = ts_mockito_1.mock();
            const assemblerService = new src_1.AssemblerQueryService(new TestAssembler(), ts_mockito_1.instance(mockQueryService));
            const dto = { foo: 'bar' };
            const entity = { bar: 'bar' };
            const result = { foo: 'baz' };
            ts_mockito_1.when(mockQueryService.queryRelations(TestDTO, 'test', ts_mockito_1.deepEqual([entity]), ts_mockito_1.objectContaining({ filter: { foo: { eq: 'bar' } } }))).thenCall((relationClass, relation, entities) => {
                return Promise.resolve(new Map([[entities[0], [result]]]));
            });
            return expect(assemblerService.queryRelations(TestDTO, 'test', [{ foo: 'bar' }], { filter: { foo: { eq: 'bar' } } })).resolves.toEqual(new Map([[dto, [result]]]));
        });
        it('should return an empty array for dtos with no relations', () => {
            const mockQueryService = ts_mockito_1.mock();
            const assemblerService = new src_1.AssemblerQueryService(new TestAssembler(), ts_mockito_1.instance(mockQueryService));
            const dto = { foo: 'bar' };
            const entity = { bar: 'bar' };
            ts_mockito_1.when(mockQueryService.queryRelations(TestDTO, 'test', ts_mockito_1.deepEqual([entity]), ts_mockito_1.objectContaining({ filter: { foo: { eq: 'bar' } } }))).thenResolve(new Map());
            return expect(assemblerService.queryRelations(TestDTO, 'test', [{ foo: 'bar' }], { filter: { foo: { eq: 'bar' } } })).resolves.toEqual(new Map([[dto, []]]));
        });
    });
    describe('aggregateRelations', () => {
        it('should transform the results for a single entity', () => {
            const mockQueryService = ts_mockito_1.mock();
            const assemblerService = new src_1.AssemblerQueryService(new TestAssembler(), ts_mockito_1.instance(mockQueryService));
            const aggQuery = { count: ['foo'] };
            const result = { count: { foo: 1 } };
            ts_mockito_1.when(mockQueryService.aggregateRelations(TestDTO, 'test', ts_mockito_1.objectContaining({ bar: 'bar' }), ts_mockito_1.objectContaining({ foo: { eq: 'bar' } }), aggQuery)).thenResolve(result);
            return expect(assemblerService.aggregateRelations(TestDTO, 'test', { foo: 'bar' }, { foo: { eq: 'bar' } }, aggQuery)).resolves.toEqual(result);
        });
        it('should transform the results for multiple entities', () => {
            const mockQueryService = ts_mockito_1.mock();
            const assemblerService = new src_1.AssemblerQueryService(new TestAssembler(), ts_mockito_1.instance(mockQueryService));
            const dto = { foo: 'bar' };
            const entity = { bar: 'bar' };
            const aggQuery = { count: ['foo'] };
            const result = { count: { foo: 1 } };
            ts_mockito_1.when(mockQueryService.aggregateRelations(TestDTO, 'test', ts_mockito_1.deepEqual([entity]), ts_mockito_1.objectContaining({ foo: { eq: 'bar' } }), aggQuery)).thenCall((relationClass, relation, entities) => {
                return Promise.resolve(new Map([[entities[0], result]]));
            });
            return expect(assemblerService.aggregateRelations(TestDTO, 'test', [{ foo: 'bar' }], { foo: { eq: 'bar' } }, aggQuery)).resolves.toEqual(new Map([[dto, result]]));
        });
        it('should return an empty array for dtos with no aggregateRelations', () => {
            const mockQueryService = ts_mockito_1.mock();
            const assemblerService = new src_1.AssemblerQueryService(new TestAssembler(), ts_mockito_1.instance(mockQueryService));
            const dto = { foo: 'bar' };
            const entity = { bar: 'bar' };
            const aggQuery = { count: ['foo'] };
            ts_mockito_1.when(mockQueryService.aggregateRelations(TestDTO, 'test', ts_mockito_1.deepEqual([entity]), ts_mockito_1.objectContaining({ foo: { eq: 'bar' } }), aggQuery)).thenResolve(new Map());
            return expect(assemblerService.aggregateRelations(TestDTO, 'test', [{ foo: 'bar' }], { foo: { eq: 'bar' } }, aggQuery)).resolves.toEqual(new Map([[dto, {}]]));
        });
    });
    describe('countRelations', () => {
        it('should transform the results for a single entity', () => {
            const mockQueryService = ts_mockito_1.mock();
            const assemblerService = new src_1.AssemblerQueryService(new TestAssembler(), ts_mockito_1.instance(mockQueryService));
            ts_mockito_1.when(mockQueryService.countRelations(TestDTO, 'test', ts_mockito_1.objectContaining({ bar: 'bar' }), ts_mockito_1.objectContaining({ foo: { eq: 'bar' } }))).thenResolve(1);
            return expect(assemblerService.countRelations(TestDTO, 'test', { foo: 'bar' }, { foo: { eq: 'bar' } })).resolves.toEqual(1);
        });
        it('should transform multiple entities', () => {
            const mockQueryService = ts_mockito_1.mock();
            const assemblerService = new src_1.AssemblerQueryService(new TestAssembler(), ts_mockito_1.instance(mockQueryService));
            const dto = { foo: 'bar' };
            const entity = { bar: 'bar' };
            ts_mockito_1.when(mockQueryService.countRelations(TestDTO, 'test', ts_mockito_1.deepEqual([entity]), ts_mockito_1.objectContaining({ foo: { eq: 'bar' } }))).thenCall((relationClass, relation, entities) => {
                return Promise.resolve(new Map([[entities[0], 1]]));
            });
            return expect(assemblerService.countRelations(TestDTO, 'test', [{ foo: 'bar' }], { foo: { eq: 'bar' } })).resolves.toEqual(new Map([[dto, 1]]));
        });
    });
    describe('findRelation', () => {
        it('should transform the results for a single entity', () => {
            const mockQueryService = ts_mockito_1.mock();
            const assemblerService = new src_1.AssemblerQueryService(new TestAssembler(), ts_mockito_1.instance(mockQueryService));
            ts_mockito_1.when(mockQueryService.findRelation(TestDTO, 'test', ts_mockito_1.objectContaining({ bar: 'bar' }))).thenResolve({
                foo: 'bar',
            });
            return expect(assemblerService.findRelation(TestDTO, 'test', { foo: 'bar' })).resolves.toEqual({ foo: 'bar' });
        });
        it('should transform the results for multiple entities', () => {
            const mockQueryService = ts_mockito_1.mock();
            const assemblerService = new src_1.AssemblerQueryService(new TestAssembler(), ts_mockito_1.instance(mockQueryService));
            const dto = { foo: 'bar' };
            const entity = { bar: 'bar' };
            const result = { foo: 'baz' };
            ts_mockito_1.when(mockQueryService.findRelation(TestDTO, 'test', ts_mockito_1.deepEqual([entity]), undefined)).thenCall((relationClass, relation, entities) => {
                return Promise.resolve(new Map([[entities[0], result]]));
            });
            return expect(assemblerService.findRelation(TestDTO, 'test', [{ foo: 'bar' }])).resolves.toEqual(new Map([[dto, result]]));
        });
    });
    describe('addRelations', () => {
        it('should transform the results for a single entity', () => {
            const mockQueryService = ts_mockito_1.mock();
            const assemblerService = new src_1.AssemblerQueryService(new TestAssembler(), ts_mockito_1.instance(mockQueryService));
            ts_mockito_1.when(mockQueryService.addRelations('test', 1, ts_mockito_1.deepEqual([2, 3, 4]), undefined)).thenResolve({
                bar: 'baz',
            });
            return expect(assemblerService.addRelations('test', 1, [2, 3, 4])).resolves.toEqual({ foo: 'baz' });
        });
        it('should transform the filter and results for a single entity', async () => {
            const mockQueryService = ts_mockito_1.mock();
            const assemblerService = new src_1.AssemblerQueryService(new TestAssembler(), ts_mockito_1.instance(mockQueryService));
            ts_mockito_1.when(mockQueryService.addRelations('test', 1, ts_mockito_1.deepEqual([2, 3, 4]), ts_mockito_1.objectContaining({ filter: { bar: { eq: 'bar' } } }))).thenResolve({
                bar: 'baz',
            });
            const addResult = await assemblerService.addRelations('test', 1, [2, 3, 4], {
                filter: { foo: { eq: 'bar' } },
            });
            return expect(addResult).toEqual({ foo: 'baz' });
        });
    });
    describe('setRelation', () => {
        it('should transform the results for a single entity', () => {
            const mockQueryService = ts_mockito_1.mock();
            const assemblerService = new src_1.AssemblerQueryService(new TestAssembler(), ts_mockito_1.instance(mockQueryService));
            ts_mockito_1.when(mockQueryService.setRelation('test', 1, 2, undefined)).thenResolve({
                bar: 'baz',
            });
            return expect(assemblerService.setRelation('test', 1, 2)).resolves.toEqual({ foo: 'baz' });
        });
        it('should transform the options and results for a single entity', () => {
            const mockQueryService = ts_mockito_1.mock();
            const assemblerService = new src_1.AssemblerQueryService(new TestAssembler(), ts_mockito_1.instance(mockQueryService));
            ts_mockito_1.when(mockQueryService.setRelation('test', 1, 2, ts_mockito_1.objectContaining({ filter: { bar: { eq: 'bar' } } }))).thenResolve({
                bar: 'baz',
            });
            return expect(assemblerService.setRelation('test', 1, 2, {
                filter: { foo: { eq: 'bar' } },
            })).resolves.toEqual({ foo: 'baz' });
        });
    });
    describe('removeRelations', () => {
        it('should transform the results for a single entity', () => {
            const mockQueryService = ts_mockito_1.mock();
            const assemblerService = new src_1.AssemblerQueryService(new TestAssembler(), ts_mockito_1.instance(mockQueryService));
            ts_mockito_1.when(mockQueryService.removeRelations('test', 1, ts_mockito_1.deepEqual([2, 3, 4]), undefined)).thenResolve({
                bar: 'baz',
            });
            return expect(assemblerService.removeRelations('test', 1, [2, 3, 4])).resolves.toEqual({ foo: 'baz' });
        });
        it('should transform the options and results for a single entity', () => {
            const mockQueryService = ts_mockito_1.mock();
            const assemblerService = new src_1.AssemblerQueryService(new TestAssembler(), ts_mockito_1.instance(mockQueryService));
            ts_mockito_1.when(mockQueryService.removeRelations('test', 1, ts_mockito_1.deepEqual([2, 3, 4]), ts_mockito_1.objectContaining({ filter: { bar: { eq: 'bar' } } }))).thenResolve({
                bar: 'baz',
            });
            return expect(assemblerService.removeRelations('test', 1, [2, 3, 4], {
                filter: { foo: { eq: 'bar' } },
            })).resolves.toEqual({ foo: 'baz' });
        });
    });
    describe('removeRelation', () => {
        it('should transform the results for a single entity', () => {
            const mockQueryService = ts_mockito_1.mock();
            const assemblerService = new src_1.AssemblerQueryService(new TestAssembler(), ts_mockito_1.instance(mockQueryService));
            ts_mockito_1.when(mockQueryService.removeRelation('test', 1, 2, undefined)).thenResolve({
                bar: 'baz',
            });
            return expect(assemblerService.removeRelation('test', 1, 2)).resolves.toEqual({ foo: 'baz' });
        });
        it('should transform the options and results for a single entity', () => {
            const mockQueryService = ts_mockito_1.mock();
            const assemblerService = new src_1.AssemblerQueryService(new TestAssembler(), ts_mockito_1.instance(mockQueryService));
            ts_mockito_1.when(mockQueryService.removeRelation('test', 1, 2, ts_mockito_1.objectContaining({ filter: { bar: { eq: 'bar' } } }))).thenResolve({
                bar: 'baz',
            });
            return expect(assemblerService.removeRelation('test', 1, 2, {
                filter: { foo: { eq: 'bar' } },
            })).resolves.toEqual({ foo: 'baz' });
        });
    });
    describe('getById', () => {
        it('should transform the results', () => {
            const mockQueryService = ts_mockito_1.mock();
            const assemblerService = new src_1.AssemblerQueryService(new TestAssembler(), ts_mockito_1.instance(mockQueryService));
            ts_mockito_1.when(mockQueryService.getById(1, undefined)).thenResolve({ bar: 'bar' });
            return expect(assemblerService.getById(1)).resolves.toEqual({ foo: 'bar' });
        });
        it('should transform the filter and results', () => {
            const mockQueryService = ts_mockito_1.mock();
            const assemblerService = new src_1.AssemblerQueryService(new TestAssembler(), ts_mockito_1.instance(mockQueryService));
            ts_mockito_1.when(mockQueryService.getById(1, ts_mockito_1.deepEqual({ filter: { bar: { eq: 'bar' } } }))).thenResolve({
                bar: 'bar',
            });
            return expect(assemblerService.getById(1, { filter: { foo: { eq: 'bar' } } })).resolves.toEqual({ foo: 'bar' });
        });
    });
    describe('createOne', () => {
        it('should transform the results for a single entity', () => {
            const mockQueryService = ts_mockito_1.mock();
            const assemblerService = new src_1.AssemblerQueryService(new TestAssembler(), ts_mockito_1.instance(mockQueryService));
            ts_mockito_1.when(mockQueryService.createOne(ts_mockito_1.objectContaining({ bar: 'baz' }))).thenResolve({
                bar: 'baz',
            });
            return expect(assemblerService.createOne({ foo: 'baz' })).resolves.toEqual({ foo: 'baz' });
        });
    });
    describe('createMany', () => {
        it('should transform the results for a single entity', () => {
            const mockQueryService = ts_mockito_1.mock();
            const assemblerService = new src_1.AssemblerQueryService(new TestAssembler(), ts_mockito_1.instance(mockQueryService));
            ts_mockito_1.when(mockQueryService.createMany(ts_mockito_1.deepEqual([{ bar: 'baz' }]))).thenResolve([{ bar: 'baz' }]);
            return expect(assemblerService.createMany([{ foo: 'baz' }])).resolves.toEqual([{ foo: 'baz' }]);
        });
    });
    describe('updateOne', () => {
        it('should transform the results for a single entity', () => {
            const mockQueryService = ts_mockito_1.mock();
            const assemblerService = new src_1.AssemblerQueryService(new TestAssembler(), ts_mockito_1.instance(mockQueryService));
            ts_mockito_1.when(mockQueryService.updateOne(1, ts_mockito_1.objectContaining({ bar: 'baz' }), undefined)).thenResolve({
                bar: 'baz',
            });
            return expect(assemblerService.updateOne(1, { foo: 'baz' })).resolves.toEqual({ foo: 'baz' });
        });
        it('should transform the filter and results for a single entity', () => {
            const mockQueryService = ts_mockito_1.mock();
            const assemblerService = new src_1.AssemblerQueryService(new TestAssembler(), ts_mockito_1.instance(mockQueryService));
            ts_mockito_1.when(mockQueryService.updateOne(1, ts_mockito_1.objectContaining({ bar: 'baz' }), ts_mockito_1.objectContaining({ filter: { bar: { eq: 'bar' } } }))).thenResolve({
                bar: 'baz',
            });
            return expect(assemblerService.updateOne(1, { foo: 'baz' }, { filter: { foo: { eq: 'bar' } } })).resolves.toEqual({
                foo: 'baz',
            });
        });
    });
    describe('updateMany', () => {
        it('should transform the arguments', () => {
            const mockQueryService = ts_mockito_1.mock();
            const assemblerService = new src_1.AssemblerQueryService(new TestAssembler(), ts_mockito_1.instance(mockQueryService));
            ts_mockito_1.when(mockQueryService.updateMany(ts_mockito_1.objectContaining({ bar: 'baz' }), ts_mockito_1.objectContaining({ bar: { eq: 'bar' } }))).thenResolve({ updatedCount: 1 });
            return expect(assemblerService.updateMany({ foo: 'baz' }, { foo: { eq: 'bar' } })).resolves.toEqual({
                updatedCount: 1,
            });
        });
    });
    describe('deleteOne', () => {
        it('should transform the results for a single entity', () => {
            const mockQueryService = ts_mockito_1.mock();
            const assemblerService = new src_1.AssemblerQueryService(new TestAssembler(), ts_mockito_1.instance(mockQueryService));
            ts_mockito_1.when(mockQueryService.deleteOne(1, undefined)).thenResolve({
                bar: 'baz',
            });
            return expect(assemblerService.deleteOne(1)).resolves.toEqual({ foo: 'baz' });
        });
        it('should transform the filter and results for a single entity', () => {
            const mockQueryService = ts_mockito_1.mock();
            const assemblerService = new src_1.AssemblerQueryService(new TestAssembler(), ts_mockito_1.instance(mockQueryService));
            ts_mockito_1.when(mockQueryService.deleteOne(1, ts_mockito_1.objectContaining({ filter: { bar: { eq: 'bar' } } }))).thenResolve({
                bar: 'baz',
            });
            return expect(assemblerService.deleteOne(1, { filter: { foo: { eq: 'bar' } } })).resolves.toEqual({ foo: 'baz' });
        });
    });
    describe('deleteMany', () => {
        it('should transform the arguments', () => {
            const mockQueryService = ts_mockito_1.mock();
            const assemblerService = new src_1.AssemblerQueryService(new TestAssembler(), ts_mockito_1.instance(mockQueryService));
            ts_mockito_1.when(mockQueryService.deleteMany(ts_mockito_1.objectContaining({ bar: { eq: 'bar' } }))).thenResolve({ deletedCount: 1 });
            return expect(assemblerService.deleteMany({ foo: { eq: 'bar' } })).resolves.toEqual({
                deletedCount: 1,
            });
        });
    });
});
//# sourceMappingURL=assembler-query.service.spec.js.map