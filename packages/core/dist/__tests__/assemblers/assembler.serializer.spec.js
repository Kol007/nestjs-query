"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const assembler_serializer_1 = require("../../src/assemblers/assembler.serializer");
const src_1 = require("../../src");
describe('AssemblerSerializer decorator', () => {
    it('should register a serializer', () => {
        let TestSerializer = class TestSerializer {
        };
        TestSerializer = tslib_1.__decorate([
            src_1.AssemblerSerializer((t) => ({ bar: t.foo }))
        ], TestSerializer);
        expect(assembler_serializer_1.getAssemblerSerializer(TestSerializer)({ foo: 'bar' })).toEqual({ bar: 'bar' });
    });
    it('should throw an error if the serializer is registered twice', () => {
        const serializer = (t) => ({ bar: t.foo });
        let TestSerializer = class TestSerializer {
        };
        TestSerializer = tslib_1.__decorate([
            src_1.AssemblerSerializer(serializer)
        ], TestSerializer);
        expect(() => src_1.AssemblerSerializer(serializer)(TestSerializer)).toThrow('Assembler Serializer already registered for TestSerializer');
    });
});
//# sourceMappingURL=assembler.serializer.spec.js.map