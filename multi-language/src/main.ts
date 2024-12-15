import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    console.log('Boostrap');
    const app = await NestFactory.create(AppModule);
    console.log('Running on port 3000 and localhost');
    await app.listen(3000, 'localhost');
    console.log('Running on port 3000 and localhost');
  } catch (error) {
    console.log('This is error in main: ', error);
  }
}
bootstrap();
