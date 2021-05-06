"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongooseQueryService = void 0;
const common_1 = require("@nestjs/common");
// import { SoftDeleteModel } from 'mongoose-delete';
const query_1 = require("../query");
const reference_query_service_1 = require("./reference-query.service");
/**
 * Base class for all query services that use Typegoose.
 *
 * @example
 *
 * ```ts
 * @QueryService(TodoItemEntity)
 * export class TodoItemService extends TypegooseQueryService<TodoItemEntity> {
 *   constructor(
 *     @InjectModel(TodoItemEntity) model: ReturnModelType<typeof TodoItemEntity>,
 *   ) {
 *     super(model);
 *   }
 * }
 * ```
 */
class MongooseQueryService extends reference_query_service_1.ReferenceQueryService {
    // constructor(readonly Model: MongooseModel<Entity> | SoftDeleteModel<Entity>) {
    constructor(Model) {
        super();
        this.Model = Model;
        this.filterQueryBuilder = new query_1.FilterQueryBuilder();
    }
    /**
     * Query for multiple entities, using a Query from `nestjs-query/packages/core`.
     *
     * @example
     * ```ts
     * const todoItems = await this.service.query({
     *   filter: { title: { eq: 'Foo' } },
     *   paging: { limit: 10 },
     *   sorting: [{ field: "create", direction: SortDirection.DESC }],
     * });
     * ```
     * @param query - The Query used to filter, page, and sort rows.
     */
    async query(query) {
        const { locale } = query;
        const { filterQuery, options, sort } = this.filterQueryBuilder.buildQuery(query);
        let request = this.Model.find(filterQuery, {}, options);
        if (locale) {
            request = request.collation({ locale });
        }
        else {
            request = request.collation({ locale: 'en' });
        }
        if (sort) {
            request = request.sort(sort);
        }
        return request.exec();
    }
    async aggregate(filter, aggregateQuery) {
        const { aggregate, filterQuery } = this.filterQueryBuilder.buildAggregateQuery(aggregateQuery, filter);
        const aggResult = (await this.Model.aggregate([
            { $match: filterQuery },
            { $group: { _id: null, ...aggregate } },
        ]).exec());
        return query_1.AggregateBuilder.convertToAggregateResponse(aggResult[0]);
    }
    count(filter) {
        const filterQuery = this.filterQueryBuilder.buildFilterQuery(filter);
        return this.Model.count(filterQuery).exec();
    }
    /**
     * Find an entity by it's `id`.
     *
     * @example
     * ```ts
     * const todoItem = await this.service.findById(1);
     * ```
     * @param id - The id of the record to find.
     * @param opts - Additional options
     */
    async findById(id, opts) {
        const filterQuery = this.filterQueryBuilder.buildIdFilterQuery(id, opts === null || opts === void 0 ? void 0 : opts.filter);
        const doc = await this.Model.findOne(filterQuery);
        if (!doc) {
            return undefined;
        }
        return doc;
    }
    /**
     * Gets an entity by it's `id`. If the entity is not found a rejected promise is returned.
     *
     * @example
     * ```ts
     * try {
     *   const todoItem = await this.service.getById(1);
     * } catch(e) {
     *   console.error('Unable to find entity with id = 1');
     * }
     * ```
     * @param id - The id of the record to find.
     * @param opts - Additional options
     */
    async getById(id, opts) {
        const doc = await this.findById(id, opts);
        if (!doc) {
            throw new common_1.NotFoundException(`Unable to find ${this.Model.modelName} with id: ${id}`);
        }
        return doc;
    }
    /**
     * Creates a single entity.
     *
     * @example
     * ```ts
     * const todoItem = await this.service.createOne({title: 'Todo Item', completed: false });
     * ```
     * @param record - The entity to create.
     */
    async createOne(record) {
        return this.Model.create(record);
    }
    /**
     * Create multiple entities.
     *
     * @example
     * ```ts
     * const todoItem = await this.service.createMany([
     *   {title: 'Todo Item 1', completed: false },
     *   {title: 'Todo Item 2', completed: true },
     * ]);
     * ```
     * @param records - The entities to create.
     */
    async createMany(records) {
        // records.forEach((r) => this.ensureIdIsNotPresent(r));
        return this.Model.create(records);
    }
    /**
     * Update an entity.
     *
     * @example
     * ```ts
     * const updatedEntity = await this.service.updateOne(1, { completed: true });
     * ```
     * @param id - The `id` of the record.
     * @param update - A `Partial` of the entity with fields to update.
     * @param opts - Additional options
     */
    async updateOne(id, update, opts) {
        this.ensureIdIsNotPresent(update);
        const filterQuery = this.filterQueryBuilder.buildIdFilterQuery(id, opts === null || opts === void 0 ? void 0 : opts.filter);
        const doc = await this.Model.findOneAndUpdate(filterQuery, this.getUpdateQuery(update), {
            new: true,
        });
        if (!doc) {
            throw new common_1.NotFoundException(`Unable to find ${this.Model.modelName} with id: ${id}`);
        }
        return doc;
    }
    /**
     * Update multiple entities with a `nestjs-query/packages/core` Filter.
     *
     * @example
     * ```ts
     * const { updatedCount } = await this.service.updateMany(
     *   { completed: true }, // the update to apply
     *   { title: { eq: 'Foo Title' } } // Filter to find records to update
     * );
     * ```
     * @param update - A `Partial` of entity with the fields to update
     * @param filter - A Filter used to find the records to update
     */
    async updateMany(update, filter) {
        this.ensureIdIsNotPresent(update);
        const filterQuery = this.filterQueryBuilder.buildFilterQuery(filter);
        const res = (await this.Model.updateMany(filterQuery, this.getUpdateQuery(update)).exec());
        return { updatedCount: res.nModified || 0 };
    }
    /**
     * Delete an entity by `id`.
     *
     * @example
     *
     * ```ts
     * const deletedTodo = await this.service.deleteOne(1);
     * ```
     *
     * @param id - The `id` of the entity to delete.
     * @param opts - Additional filter to use when finding the entity to delete.
     */
    async deleteOne(id, opts) {
        var _a;
        const filterQuery = this.filterQueryBuilder.buildIdFilterQuery(id, opts === null || opts === void 0 ? void 0 : opts.filter);
        let doc;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if ((_a = this.Model) === null || _a === void 0 ? void 0 : _a.updateDeleted) {
            doc = await this.Model.findOne(filterQuery);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            await this.Model.delete(filterQuery);
        }
        else {
            doc = await this.Model.findOneAndDelete(filterQuery); // origin
        }
        if (!doc) {
            throw new common_1.NotFoundException(`Unable to find ${this.Model.modelName} with id: ${id}`);
        }
        return doc;
    }
    /**
     * Delete multiple records with a `nestjs-query/packages/core` `Filter`.
     *
     * @example
     *
     * ```ts
     * const { deletedCount } = this.service.deleteMany({
     *   created: { lte: new Date('2020-1-1') }
     * });
     * ```
     *
     * @param filter - A `Filter` to find records to delete.
     */
    async deleteMany(filter) {
        const filterQuery = this.filterQueryBuilder.buildFilterQuery(filter);
        let res;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (this.Model.updateDeleted) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
            res = await this.Model.delete(filterQuery); // { n: 1, nModified: 1, ok: 1 }
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            return { deletedCount: +(res === null || res === void 0 ? void 0 : res.ok) || 0 };
        }
        res = await this.Model.deleteMany(filterQuery).exec();
        return { deletedCount: res.deletedCount || 0 };
    }
    ensureIdIsNotPresent(e) {
        if (Object.keys(e).find((f) => f === 'id' || f === '_id')) {
            throw new Error('Id cannot be specified when updating or creating');
        }
    }
    getUpdateQuery(entity) {
        if (entity instanceof this.Model) {
            return entity.modifiedPaths().reduce((update, k) => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                return { ...update, [k]: entity.get(k) };
            }, {});
        }
        return entity;
    }
}
exports.MongooseQueryService = MongooseQueryService;
//# sourceMappingURL=mongoose-query.service.js.map