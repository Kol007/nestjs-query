"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDTONames = void 0;
const pluralize_1 = require("pluralize");
const upper_case_first_1 = require("upper-case-first");
const lower_case_first_1 = require("lower-case-first");
const external_utils_1 = require("./external.utils");
/** @internal */
const getDTONames = (DTOClass, opts) => {
    var _a, _b, _c;
    const baseName = upper_case_first_1.upperCaseFirst((_c = (_a = opts === null || opts === void 0 ? void 0 : opts.dtoName) !== null && _a !== void 0 ? _a : (_b = external_utils_1.findGraphqlObjectMetadata(DTOClass)) === null || _b === void 0 ? void 0 : _b.name) !== null && _c !== void 0 ? _c : DTOClass.name);
    const pluralBaseName = pluralize_1.plural(baseName);
    const baseNameLower = lower_case_first_1.lowerCaseFirst(baseName);
    const pluralBaseNameLower = pluralize_1.plural(baseNameLower);
    return {
        baseName,
        baseNameLower,
        pluralBaseName,
        pluralBaseNameLower,
    };
};
exports.getDTONames = getDTONames;
//# sourceMappingURL=get-dto-names.js.map