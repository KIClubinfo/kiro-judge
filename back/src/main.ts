import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from 'app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api');

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(parseInt(process.env.PORT || '3000', 10));
}
bootstrap();
