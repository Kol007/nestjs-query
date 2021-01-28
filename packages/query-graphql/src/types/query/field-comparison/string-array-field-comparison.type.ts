import { Class, FilterFieldComparison } from '@nestjs-query/core';
import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { IsUndefined } from '../../validators';

/** @internal */
let stringArrayFieldComparison: Class<FilterFieldComparison<string>>;

/** @internal */
export function getOrCreateStringArrayFieldComparison(): Class<FilterFieldComparison<string>> {
  if (stringArrayFieldComparison) {
    return stringArrayFieldComparison;
  }
  @InputType()
  class StringArrayFieldComparisonType implements FilterFieldComparison<string> {
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
  stringArrayFieldComparison = StringArrayFieldComparisonType;
  return stringArrayFieldComparison;
}
