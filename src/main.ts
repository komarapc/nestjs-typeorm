import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { appConfig } from './config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  const config = appConfig();
  await app.listen(config.app.port ?? 3000);
}
bootstrap();
