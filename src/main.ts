import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }))
  app.enableCors({
    origin: [
      'http://localhost:5501', // HTTP origin
      'https://localhost:5501', // HTTPS origin
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true, // If you need to support credentials (cookies, authorization headers)
  });
  await app.listen(8000);
}
bootstrap();
