import { ConfigModule, ConfigService } from '@nestjs/config';
import { throttler, trackerThrottler } from './common/utils/throttler';

import { ApiModule } from './api/api.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerProvider } from './common/utils/provider';
import { ThrottlerStorageRedisService } from '@nest-lab/throttler-storage-redis';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database';

@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        throttlers: throttler,
        getTracker: trackerThrottler,
        storage: new ThrottlerStorageRedisService({
          host: configService.get('REDIS_HOST', 'localhost'),
          port: parseInt(configService.get('REDIS_PORT', '6379'), 10),
          db: parseInt(configService.get('REDIS_DB', '0'), 10),
        }),
      }),
    }),
    TypeOrmModule.forRoot(databaseConfig),
    ConfigModule.forRoot(),
    ApiModule,
  ],
  controllers: [AppController],
  providers: [AppService, ThrottlerProvider],
})
export class AppModule {}
