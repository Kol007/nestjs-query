"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CRUDResolver = void 0;
const aggregate_resolver_1 = require("./aggregate.resolver");
const relations_1 = require("./relations");
const read_resolver_1 = require("./read.resolver");
const create_resolver_1 = require("./create.resolver");
const reference_resolver_1 = require("./reference.resolver");
const update_resolver_1 = require("./update.resolver");
const delete_resolver_1 = require("./delete.resolver");
const common_1 = require("../common");
/**
 * Factory to create a resolver that includes all CRUD methods from [[CreateResolver]], [[ReadResolver]],
 * [[UpdateResolver]], and [[DeleteResolver]].
 *
 * ```ts
 * import { CRUDResolver } from '@nestjs-queryquery-graphql';
 * import { Resolver } from '@nestjs/graphql';
 * import { TodoItemDTO } from './dto/todo-item.dto';
 * import { TodoItemService } from './todo-item.service';
 *
 * @Resolver()
 * export class TodoItemResolver extends CRUDResolver(TodoItemDTO) {
 *   constructor(readonly service: TodoItemService) {
 *     super(service);
 *   }
 * }
 * ```
 * @param DTOClass - The DTO Class that the resolver is for. All methods will use types derived from this class.
 * @param opts - Options to customize the resolver.
 */
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentional
const CRUDResolver = (DTOClass, opts = {}) => {
    const { CreateDTOClass, UpdateDTOClass, enableSubscriptions, pagingStrategy, enableTotalCount, enableAggregate, create = {}, read = {}, update = {}, delete: deleteArgs = {}, referenceBy = {}, aggregate, } = opts;
    const referencable = reference_resolver_1.Referenceable(DTOClass, referenceBy);
    const relatable = relations_1.Relatable(DTOClass, common_1.mergeBaseResolverOpts({ enableTotalCount, enableAggregate }, opts));
    const aggregateable = aggregate_resolver_1.Aggregateable(DTOClass, {
        enabled: enableAggregate,
        ...common_1.mergeBaseResolverOpts(aggregate !== null && aggregate !== void 0 ? aggregate : {}, opts),
    });
    const creatable = create_resolver_1.Creatable(DTOClass, {
        CreateDTOClass,
        enableSubscriptions,
        ...common_1.mergeBaseResolverOpts(create !== null && create !== void 0 ? create : {}, opts),
    });
    const readable = read_resolver_1.Readable(DTOClass, {
        enableTotalCount,
        pagingStrategy,
        ...common_1.mergeBaseResolverOpts(read, opts),
    });
    const updateable = update_resolver_1.Updateable(DTOClass, {
        UpdateDTOClass,
        enableSubscriptions,
        ...common_1.mergeBaseResolverOpts(update, opts),
    });
    const deleteResolver = delete_resolver_1.DeleteResolver(DTOClass, { enableSubscriptions, ...common_1.mergeBaseResolverOpts(deleteArgs, opts) });
    return referencable(relatable(aggregateable(creatable(readable(updateable(deleteResolver))))));
};
exports.CRUDResolver = CRUDResolver;
//# sourceMappingURL=crud.resolver.js.map