import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express'

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use('/uploads', express.static('public/uploads'));

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.APP_PORT, () => {
    console.log('server listening on port ' + process.env.APP_PORT);
  });
}

bootstrap();
