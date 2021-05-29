import { NestFactory } from '@nestjs/core';
import { AppModule } from '@src/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  console.log('The GraphQL playground is accessible at:');
  console.log('');
  console.log('  http://localhost:3000/graphql');
  console.log('');
}
bootstrap();
