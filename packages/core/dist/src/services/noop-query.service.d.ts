import { Filter, UpdateManyResponse, Query, DeleteManyResponse, AggregateQuery, AggregateResponse, ModifyRelationOptions, DeleteOneOptions, FindByIdOptions, FindRelationOptions, GetByIdOptions, UpdateOneOptions } from '../interfaces';
import { QueryService } from './query.service';
import { DeepPartial, Class } from '../common';
export declare class NoOpQueryService<DTO, C = DeepPartial<DTO>, U = DeepPartial<DTO>> implements QueryService<DTO, C, U> {
    private static instance;
    static getInstance<DTO, C, U>(): QueryService<DTO, C, U>;
    constructor();
    addRelations<Relation>(relationName: string, id: string | number, relationIds: (string | number)[], opts?: ModifyRelationOptions<DTO, Relation>): Promise<DTO>;
    createMany(items: C[]): Promise<DTO[]>;
    createOne(item: C): Promise<DTO>;
    deleteMany(filter: Filter<DTO>): Promise<DeleteManyResponse>;
    deleteOne(id: number | string, opts?: DeleteOneOptions<DTO>): Promise<DTO>;
    findById(id: string | number, opts?: FindByIdOptions<DTO>): Promise<DTO | undefined>;
    findRelation<Relation>(RelationClass: Class<Relation>, relationName: string, dto: DTO, opts?: FindRelationOptions<Relation>): Promise<Relation | undefined>;
    findRelation<Relation>(RelationClass: Class<Relation>, relationName: string, dtos: DTO[], opts?: FindRelationOptions<Relation>): Promise<Map<DTO, Relation | undefined>>;
    getById(id: string | number, opts?: GetByIdOptions<DTO>): Promise<DTO>;
    query(query: Query<DTO>): Promise<DTO[]>;
    aggregate(filter: Filter<DTO>, aggregate: AggregateQuery<DTO>): Promise<AggregateResponse<DTO>>;
    count(filter: Filter<DTO>): Promise<number>;
    queryRelations<Relation>(RelationClass: Class<Relation>, relationName: string, dto: DTO, query: Query<Relation>): Promise<Relation[]>;
    queryRelations<Relation>(RelationClass: Class<Relation>, relationName: string, dtos: DTO[], query: Query<Relation>): Promise<Map<DTO, Relation[]>>;
    countRelations<Relation>(RelationClass: Class<Relation>, relationName: string, dto: DTO, filter: Filter<Relation>): Promise<number>;
    countRelations<Relation>(RelationClass: Class<Relation>, relationName: string, dtos: DTO[], filter: Filter<Relation>): Promise<Map<DTO, number>>;
    removeRelation<Relation>(relationName: string, id: string | number, relationId: string | number, opts?: ModifyRelationOptions<DTO, Relation>): Promise<DTO>;
    removeRelations<Relation>(relationName: string, id: string | number, relationIds: (string | number)[], opts?: ModifyRelationOptions<DTO, Relation>): Promise<DTO>;
    setRelation<Relation>(relationName: string, id: string | number, relationId: string | number, opts?: ModifyRelationOptions<DTO, Relation>): Promise<DTO>;
    updateMany(update: U, filter: Filter<DTO>): Promise<UpdateManyResponse>;
    updateOne(id: string | number, update: U, opts?: UpdateOneOptions<DTO>): Promise<DTO>;
    aggregateRelations<Relation>(RelationClass: Class<Relation>, relationName: string, dto: DTO, filter: Filter<Relation>, aggregate: AggregateQuery<Relation>): Promise<AggregateResponse<Relation>>;
    aggregateRelations<Relation>(RelationClass: Class<Relation>, relationName: string, dtos: DTO[], filter: Filter<Relation>, aggregate: AggregateQuery<Relation>): Promise<Map<DTO, AggregateResponse<Relation>>>;
}
