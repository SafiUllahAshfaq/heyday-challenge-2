import { join } from 'path';
import { Controller, Get, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { AppResolver } from '@src/resolvers/app';
import { EmployeesResolver } from './resolvers/employee';
import { DatabaseService } from './services/database';
import { EmployeeService } from './services/employee';

// Heartbeat end point
@Controller('health')
class HealthController {
  @Get('/')
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
  providers: [AppResolver, EmployeesResolver, DatabaseService, EmployeeService],
  controllers: [HealthController],
})
export class AppModule {}
