import { join } from 'path';
import { Controller, Get, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { AppResolver } from '@src/app.resolver';

// Heartbeat end point
@Controller('health')
class HealthController {
  @Get()
  health(): string {
    return `Server is up and running`;
  }
}

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [AppResolver],
  controllers: [HealthController],
})
export class AppModule {}
