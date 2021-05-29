import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  @Query(() => String, {
    nullable: false,
    description: 'App info.',
  })
  appInfo(): string {
    return 'heyday tech challenge starter';
  }
}
