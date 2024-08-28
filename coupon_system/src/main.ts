import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { swaggerSetup } from './swagger';

async function bootstrap() {
  const app: INestApplication<any> = await NestFactory.create(AppModule);
  const port = 3000;
  const host = 'localhost';
  swaggerSetup(app);
  await app.listen(port, host);
  console.log('========= DataBase Initialize Successfully =========');
  console.log(
    `========= Running Application on Port: ${port} and host ${host} =========`,
  );
}
bootstrap();
