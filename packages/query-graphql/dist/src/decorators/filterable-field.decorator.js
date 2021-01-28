"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilterableFields = exports.FilterableField = void 0;
// import { ArrayReflector, Class, FilterComparisonOperators, getPrototypeChain } from 'nestjs-query/packages/core';
const graphql_1 = require("@nestjs/graphql");
// import { ArrayReflector, Class, FilterComparisonOperators, getPrototypeChain } from '../../../core';
const core_1 = require("nestjs-query/packages/core");
const constants_1 = require("./constants");
const reflector = new core_1.ArrayReflector(constants_1.FILTERABLE_FIELD_KEY);
function FilterableField(returnTypeFuncOrOptions, maybeOptions) {
    let returnTypeFunc;
    let advancedOptions;
    if (typeof returnTypeFuncOrOptions === 'function') {
        returnTypeFunc = returnTypeFuncOrOptions;
        advancedOptions = maybeOptions;
    }
    else if (typeof returnTypeFuncOrOptions === 'object') {
        advancedOptions = returnTypeFuncOrOptions;
    }
    else if (typeof maybeOptions === 'object') {
        advancedOptions = maybeOptions;
    }
    return (
    // eslint-disable-next-line @typescript-eslint/ban-types
    target, propertyName, descriptor) => {
        const Ctx = Reflect.getMetadata('design:type', target, propertyName);
        reflector.append(target.constructor, {
            propertyName: propertyName.toString(),
            target: Ctx,
            returnTypeFunc,
            advancedOptions,
        });
        if (returnTypeFunc) {
            return graphql_1.Field(returnTypeFunc, advancedOptions)(target, propertyName, descriptor);
        }
        if (advancedOptions) {
            return graphql_1.Field(advancedOptions)(target, propertyName, descriptor);
        }
        return graphql_1.Field()(target, propertyName, descriptor);
    };
}
exports.FilterableField = FilterableField;
function getFilterableFields(DTOClass) {
    return core_1.getPrototypeChain(DTOClass).reduce((fields, Cls) => {
        var _a;
        const existingFieldNames = fields.map((t) => t.propertyName);
        const typeFields = (_a = reflector.get(Cls)) !== null && _a !== void 0 ? _a : [];
        const newFields = typeFields.filter((t) => !existingFieldNames.includes(t.propertyName));
        return [...newFields, ...fields];
    }, []);
}
exports.getFilterableFields = getFilterableFields;
//# sourceMappingURL=filterable-field.decorator.js.map