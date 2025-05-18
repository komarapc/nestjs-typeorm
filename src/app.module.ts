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
import { throttlerModuleConfig } from './common/utils/modules';

@Module({
  imports: [
    ThrottlerModule.forRootAsync(throttlerModuleConfig),
    TypeOrmModule.forRoot(databaseConfig),
    ConfigModule.forRoot(),
    ApiModule,
  ],
  controllers: [AppController],
  providers: [AppService, ThrottlerProvider],
})
export class AppModule {}
