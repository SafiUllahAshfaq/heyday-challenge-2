import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Partner {
  @Field(() => ID)
  id!: number;

  @Field()
  name!: string;
}

@ObjectType('RevenuePerPartner')
export class RevenuePerPartner {
  @Field(() => ID)
  partnerId!: number;

  @Field(() => Number)
  revenue!: number;
}
