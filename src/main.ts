import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DynamicCorsMiddleware } from './dynamic-cors.middleware';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  console.log(`REDIS_HOST: ${configService.get('redis.host')}`);
  console.log(`REDIS_PORT: ${configService.get('redis.port')}`);
  console.log(`REDIS_PASSWORD: ${configService.get('redis.password')}`);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }))
  app.use(new DynamicCorsMiddleware().use);
  await app.listen(8000);
}
bootstrap();
