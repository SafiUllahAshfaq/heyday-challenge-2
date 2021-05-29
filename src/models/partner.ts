import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Partner {
  @Field(() => ID)
  id!: number;

  @Field()
  name!: string;
}
