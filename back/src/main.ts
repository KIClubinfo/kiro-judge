import { NestFactory } from '@nestjs/core';
import * as cors from 'cors';

import { AppModule } from 'app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  await app.listen(parseInt(process.env.PORT || '3000', 10));
}
bootstrap();
