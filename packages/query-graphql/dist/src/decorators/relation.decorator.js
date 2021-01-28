"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterableConnection = exports.Connection = exports.FilterableRelation = exports.Relation = exports.getRelations = exports.reflector = void 0;
const core_1 = require("nestjs-query/packages/core");
const paging_1 = require("../types/query/paging");
const constants_1 = require("./constants");
const common_1 = require("../common");
exports.reflector = new core_1.ArrayReflector(constants_1.RELATION_KEY);
function getRelationsDescriptors(DTOClass) {
    return core_1.getPrototypeChain(DTOClass).reduce((relations, cls) => {
        var _a;
        const relationNames = relations.map((t) => t.name);
        const metaRelations = (_a = exports.reflector.get(cls)) !== null && _a !== void 0 ? _a : [];
        const inheritedRelations = metaRelations.filter((t) => !relationNames.includes(t.name));
        return [...inheritedRelations, ...relations];
    }, []);
}
function convertRelationsToOpts(relations, baseOpts) {
    const relationOpts = {};
    relations.forEach((r) => {
        const relationType = r.relationTypeFunc();
        const DTO = Array.isArray(relationType) ? relationType[0] : relationType;
        const opts = common_1.mergeBaseResolverOpts({ ...r.relationOpts, DTO }, baseOpts !== null && baseOpts !== void 0 ? baseOpts : {});
        if (r.isMany) {
            relationOpts.many = { ...relationOpts.many, [r.name]: opts };
        }
        else {
            relationOpts.one = { ...relationOpts.one, [r.name]: opts };
        }
    });
    return relationOpts;
}
function getRelations(DTOClass, opts) {
    const relationDescriptors = getRelationsDescriptors(DTOClass);
    return convertRelationsToOpts(relationDescriptors, opts);
}
exports.getRelations = getRelations;
function Relation(name, relationTypeFunc, options) {
    return (DTOClass) => {
        const isMany = Array.isArray(relationTypeFunc());
        const relationOpts = isMany ? { pagingStrategy: paging_1.PagingStrategies.OFFSET, ...options } : options;
        exports.reflector.append(DTOClass, { name, isMany, relationOpts, relationTypeFunc });
        return DTOClass;
    };
}
exports.Relation = Relation;
function FilterableRelation(name, relationTypeFunc, options) {
    return Relation(name, relationTypeFunc, { ...options, allowFiltering: true });
}
exports.FilterableRelation = FilterableRelation;
function Connection(name, relationTypeFunc, options) {
    const relationOpts = { pagingStrategy: paging_1.PagingStrategies.CURSOR, ...options };
    return (DTOClass) => {
        exports.reflector.append(DTOClass, { name, isMany: true, relationOpts, relationTypeFunc });
        return DTOClass;
    };
}
exports.Connection = Connection;
function FilterableConnection(name, relationTypeFunc, options) {
    return Connection(name, relationTypeFunc, { ...options, allowFiltering: true });
}
exports.FilterableConnection = FilterableConnection;
//# sourceMappingURL=relation.decorator.js.map