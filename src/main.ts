import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import { appConfig } from './config';

async function bootstrap() {
  const config = appConfig();
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('API Docs')
    .addBearerAuth()
    .setDescription('API Documentation')
    .setVersion('1.0.0')
    .build();
  const factory = () => SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, factory(), {
    swaggerOptions: {
      defaultModelsExpandDepth: -1,
      docExpansion: 'none',
      filter: true,
      showRequestDuration: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
      syntaxHighlight: {
        activate: true,
        theme: 'arta',
      },
    },
  });

  await app.listen(config.app.port ?? 3000, '0.0.0.0');
}
bootstrap();
