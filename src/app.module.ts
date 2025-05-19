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
import { JwtAuthService } from './common/services/jwt-auth/jwt-auth.service';
import { JwtModule } from '@nestjs/jwt';
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
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
      global: true,
    }),
    ApiModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ThrottlerProvider,
    CacheRequestService,
    JwtAuthService,
  ],
})
export class AppModule {}
