import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Order {
  @Field(() => ID)
  id!: number;

  @Field()
  date!: Date;

  @Field()
  employeeId!: number;

  @Field()
  voucherId!: number;
}
