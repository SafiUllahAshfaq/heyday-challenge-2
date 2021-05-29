import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Employee {
  @Field(() => ID)
  id!: number;

  @Field()
  name!: string;

  @Field()
  budget!: number;

  @Field()
  companyId!: number;
}
