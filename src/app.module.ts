import {
  cacheRedisModuleConfig,
  throttlerModuleConfig,
} from '@/common/utils/modules';

import { ApiModule } from '@/api/api.module';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { CacheModule } from '@nestjs/cache-manager';
import { CacheRequestService } from '@/common/services/cache-request/cache-request.service';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerProvider } from '@/common/utils/provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from '@/config/database';

@Module({
  imports: [
    ThrottlerModule.forRootAsync(throttlerModuleConfig),
    CacheModule.registerAsync(cacheRedisModuleConfig),
    TypeOrmModule.forRoot(databaseConfig),
    ConfigModule.forRoot(),
    ApiModule,
  ],
  controllers: [AppController],
  providers: [AppService, ThrottlerProvider, CacheRequestService],
})
export class AppModule {}
