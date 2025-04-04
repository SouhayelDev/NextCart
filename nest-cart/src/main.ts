import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({ origin: 'http://localhost:3000', credentials: true });
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
  await app.listen(3001);
}
bootstrap();
