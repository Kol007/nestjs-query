import { Class, FilterFieldComparison } from '@nestjs-query/core';
// import {  InputType } from '@nestjs/graphql';
import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { IsUndefined } from '../../validators';

/** @internal */
let jsonFieldComparison: Class<FilterFieldComparison<string>>;

/** @internal */
export function getOrCreateJsonFieldComparison(): Class<FilterFieldComparison<string>> {
  if (jsonFieldComparison) {
    return jsonFieldComparison;
  }
  @InputType()
  class JsonFieldComparisonType implements FilterFieldComparison<string> {
    // eslint-disable-next-line prettier/prettier
    // @Field({ nullable: true })
    // @IsString()
    // @IsUndefined()
    // [index: string]: Record<string, any>;
    @Field({ nullable: true })
    @IsString()
    @IsUndefined()
    nest?: Record<string, unknown>;

    @Field({ nullable: true })
    @IsString()
    @IsUndefined()
    eq?: string;

    @Field({ nullable: true })
    @IsString()
    @IsUndefined()
    neq?: string;

    @Field({ nullable: true })
    @IsString()
    @IsUndefined()
    like?: string;

    @Field({ nullable: true })
    @IsString()
    @IsUndefined()
    notLike?: string;

    @Field({ nullable: true })
    @IsString()
    @IsUndefined()
    iLike?: string;

    @Field({ nullable: true })
    @IsString()
    @IsUndefined()
    notILike?: string;

    @Field(() => [String], { nullable: true })
    @IsUndefined()
    @IsString({ each: true })
    in?: string[];

    @Field(() => [String], { nullable: true })
    @IsUndefined()
    @IsString({ each: true })
    all?: string[];

    @Field(() => [String], { nullable: true })
    @IsUndefined()
    @IsString({ each: true })
    notIn?: string[];
  }
  jsonFieldComparison = JsonFieldComparisonType;
  return jsonFieldComparison;
}
