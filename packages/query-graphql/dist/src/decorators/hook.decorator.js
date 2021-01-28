"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFindOneHook = exports.BeforeFindOne = exports.getQueryManyHook = exports.BeforeQueryMany = exports.getDeleteManyHook = exports.BeforeDeleteMany = exports.getDeleteOneHook = exports.BeforeDeleteOne = exports.getUpdateManyHook = exports.BeforeUpdateMany = exports.getUpdateOneHook = exports.BeforeUpdateOne = exports.getCreateManyHook = exports.BeforeCreateMany = exports.getCreateOneHook = exports.BeforeCreateOne = void 0;
const core_1 = require("nestjs-query/packages/core");
const constants_1 = require("./constants");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
exports.BeforeCreateOne = core_1.classMetadataDecorator(constants_1.BEFORE_CREATE_ONE_KEY);
function getCreateOneHook(DTOClass) {
    return core_1.getClassMetadata(DTOClass, constants_1.BEFORE_CREATE_ONE_KEY, true);
}
exports.getCreateOneHook = getCreateOneHook;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
exports.BeforeCreateMany = core_1.classMetadataDecorator(constants_1.BEFORE_CREATE_MANY_KEY);
function getCreateManyHook(DTOClass) {
    return core_1.getClassMetadata(DTOClass, constants_1.BEFORE_CREATE_MANY_KEY, true);
}
exports.getCreateManyHook = getCreateManyHook;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
exports.BeforeUpdateOne = core_1.classMetadataDecorator(constants_1.BEFORE_UPDATE_ONE_KEY);
function getUpdateOneHook(DTOClass) {
    return core_1.getClassMetadata(DTOClass, constants_1.BEFORE_UPDATE_ONE_KEY, true);
}
exports.getUpdateOneHook = getUpdateOneHook;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
exports.BeforeUpdateMany = core_1.classMetadataDecorator(constants_1.BEFORE_UPDATE_MANY_KEY);
function getUpdateManyHook(DTOClass) {
    return core_1.getClassMetadata(DTOClass, constants_1.BEFORE_UPDATE_MANY_KEY, true);
}
exports.getUpdateManyHook = getUpdateManyHook;
exports.BeforeDeleteOne = core_1.classMetadataDecorator(constants_1.BEFORE_DELETE_ONE_KEY);
function getDeleteOneHook(DTOClass) {
    return core_1.getClassMetadata(DTOClass, constants_1.BEFORE_DELETE_ONE_KEY, true);
}
exports.getDeleteOneHook = getDeleteOneHook;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
exports.BeforeDeleteMany = core_1.classMetadataDecorator(constants_1.BEFORE_DELETE_MANY_KEY);
function getDeleteManyHook(DTOClass) {
    return core_1.getClassMetadata(DTOClass, constants_1.BEFORE_DELETE_MANY_KEY, true);
}
exports.getDeleteManyHook = getDeleteManyHook;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
exports.BeforeQueryMany = core_1.classMetadataDecorator(constants_1.BEFORE_QUERY_MANY_KEY);
function getQueryManyHook(DTOClass) {
    return core_1.getClassMetadata(DTOClass, constants_1.BEFORE_QUERY_MANY_KEY, true);
}
exports.getQueryManyHook = getQueryManyHook;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
exports.BeforeFindOne = core_1.classMetadataDecorator(constants_1.BEFORE_FIND_ONE_KEY);
function getFindOneHook(DTOClass) {
    return core_1.getClassMetadata(DTOClass, constants_1.BEFORE_FIND_ONE_KEY, true);
}
exports.getFindOneHook = getFindOneHook;
//# sourceMappingURL=hook.decorator.js.map