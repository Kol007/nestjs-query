import { Filter, FilterComparisons, FilterFieldComparison } from 'nestjs-query/packages/core';
import { FilterQuery, Document, Types, Schema } from 'mongoose';
import { EntityComparisonField, ComparisonBuilder } from './comparison.builder';

const { ObjectId } = Types;

/**
 * @internal
 * Builds a WHERE clause from a Filter.
 */
export class WhereBuilder<Entity extends Document> {
  constructor(readonly comparisonBuilder: ComparisonBuilder<Entity> = new ComparisonBuilder<Entity>()) {}

  /**
   * Builds a WHERE clause from a Filter.
   * @param filter - the filter to build the WHERE clause from.
   * @param schema - mongoose schema.
   */
  build(filter: Filter<Entity>, schema?: any): FilterQuery<Entity> {
    const { and, or } = filter;
    let ands: FilterQuery<Entity>[] = [];
    let ors: FilterQuery<Entity>[] = [];
    let filterQuery: FilterQuery<Entity> = {};
    if (and && and.length) {
      ands = and.map((f) => this.build(f, schema));
    }
    if (or && or.length) {
      ors = or.map((f) => this.build(f, schema));
    }
    const filterAnds = this.filterFields(filter, schema);
    if (filterAnds) {
      ands = [...ands, filterAnds];
    }
    if (ands.length) {
      filterQuery = { ...filterQuery, $and: ands } as FilterQuery<Entity>;
    }
    if (ors.length) {
      filterQuery = { ...filterQuery, $or: ors } as FilterQuery<Entity>;
    }
    return filterQuery;
  }

  /**
   * Creates field comparisons from a filter. This method will ignore and/or properties.
   * @param filter - the filter with fields to create comparisons for.
   */
  private filterFields(filter: Filter<Entity>, schema?: any): FilterQuery<Entity> | undefined {
    const ands = Object.keys(filter)
      .filter((f) => f !== 'and' && f !== 'or')
      .map((field) =>
        this.withFilterComparison(field as keyof Entity, this.getField(filter, field as keyof Entity), schema),
      );
    if (ands.length === 1) {
      return ands[0];
    }
    if (ands.length) {
      return { $and: ands } as FilterQuery<Entity>;
    }
    return undefined;
  }

  private getField<K extends keyof FilterComparisons<Entity>>(
    obj: FilterComparisons<Entity>,
    field: K,
  ): FilterFieldComparison<Entity[K]> {
    return obj[field] as FilterFieldComparison<Entity[K]>;
  }

  private convertValueToObjectId(value: any) {
    if (Array.isArray(value)) {
      return value.map((item) => ObjectId(item));
    }

    if (value === null) {
      return value;
    }

    return ObjectId(value);
  }

  private withFilterComparison<T extends keyof Entity>(
    field: T,
    cmp: FilterFieldComparison<Entity[T]>,
    schema?: Record<string, any>,
  ): FilterQuery<Entity> {
    const opts = Object.keys(cmp) as (keyof FilterFieldComparison<Entity[T]>)[];
    if (opts.length === 1) {
      const cmpType = opts[0];

      const isObjectId =
        schema &&
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        (schema?.path(field) instanceof Schema.Types.ObjectId ||
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
          schema?.path(field)?.caster instanceof Schema.Types.ObjectId);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const value = isObjectId ? this.convertValueToObjectId(cmp[cmpType]) : cmp[cmpType];

      return this.comparisonBuilder.build(field, cmpType, value as EntityComparisonField<Entity, T>);
    }
    return {
      $or: opts.map((cmpType) => {
        const isObjectId =
          schema &&
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          (schema?.path(field) instanceof Schema.Types.ObjectId ||
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
            schema?.path(field)?.caster instanceof Schema.Types.ObjectId);

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const value =
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          isObjectId ? this.convertValueToObjectId(cmp[cmpType]) : cmp[cmpType];
        return this.comparisonBuilder.build(field, cmpType, value as EntityComparisonField<Entity, T>);
      }),
    } as FilterQuery<Entity>;
  }
}
