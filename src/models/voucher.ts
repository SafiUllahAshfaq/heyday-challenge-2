import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Voucher {
  @Field(() => ID)
  id!: number;

  @Field()
  amount!: number;

  @Field()
  partnerId!: number;
}
