import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Company {
  @Field(() => ID)
  id!: number;

  @Field()
  title!: string;
}
