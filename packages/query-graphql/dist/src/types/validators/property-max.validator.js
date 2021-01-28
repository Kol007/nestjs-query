"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyMax = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
/** @internal */
let PropertyMax = class PropertyMax {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
    validate(value, args) {
        var _a;
        const object = args.object;
        const field = args.constraints[0];
        const maxVal = args.constraints[1];
        const prop = (_a = object[args.property]) !== null && _a !== void 0 ? _a : {};
        return prop[field] !== undefined ? prop[field] <= maxVal : true;
    }
    defaultMessage(args) {
        return `Field ${args.property}.${args.constraints[0]} max allowed value is \`${args.constraints[1]}\`.`;
    }
};
PropertyMax = tslib_1.__decorate([
    class_validator_1.ValidatorConstraint({ async: false })
], PropertyMax);
exports.PropertyMax = PropertyMax;
//# sourceMappingURL=property-max.validator.js.map