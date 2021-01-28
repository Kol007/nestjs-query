"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("../../src/common");
describe('getDTONames', () => {
    let DTO = class DTO {
    };
    tslib_1.__decorate([
        graphql_1.Field(),
        tslib_1.__metadata("design:type", String)
    ], DTO.prototype, "str", void 0);
    DTO = tslib_1.__decorate([
        graphql_1.ObjectType('SomeDTO')
    ], DTO);
    it('should use the @nestjs/graphql name for the dto', () => {
        const { baseName, baseNameLower, pluralBaseNameLower, pluralBaseName } = common_1.getDTONames(DTO);
        expect(baseName).toBe('SomeDTO');
        expect(baseNameLower).toBe('someDTO');
        expect(pluralBaseName).toBe('SomeDTOS');
        expect(pluralBaseNameLower).toBe('someDTOS');
    });
    it('should use the dtoName if specified', () => {
        const { baseName, baseNameLower, pluralBaseNameLower, pluralBaseName } = common_1.getDTONames(DTO, {
            dtoName: 'NamedObj',
        });
        expect(baseName).toBe('NamedObj');
        expect(baseNameLower).toBe('namedObj');
        expect(pluralBaseName).toBe('NamedObjs');
        expect(pluralBaseNameLower).toBe('namedObjs');
    });
    it('should fall back to the class name', () => {
        class OtherDTO {
        }
        tslib_1.__decorate([
            graphql_1.Field(),
            tslib_1.__metadata("design:type", String)
        ], OtherDTO.prototype, "str", void 0);
        const { baseName, baseNameLower, pluralBaseNameLower, pluralBaseName } = common_1.getDTONames(OtherDTO);
        expect(baseName).toBe('OtherDTO');
        expect(baseNameLower).toBe('otherDTO');
        expect(pluralBaseName).toBe('OtherDTOS');
        expect(pluralBaseNameLower).toBe('otherDTOS');
    });
});
//# sourceMappingURL=get-dto-names.spec.js.map