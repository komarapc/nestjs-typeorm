import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import { ApiModule } from './api/api.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { RateLimiterGuard } from './common/guards/rate-limiter/rate-limiter.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 20,
      },
    ]),
    TypeOrmModule.forRoot(databaseConfig),
    ConfigModule.forRoot(),
    ApiModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_GUARD',
      useClass: RateLimiterGuard,
    },
  ],
})
export class AppModule {}
