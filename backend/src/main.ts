import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true })); // Active la validation globale : Si le body ne correspond pas au DTO, NestJS renvoie automatiquement une 400 Bad Request
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
