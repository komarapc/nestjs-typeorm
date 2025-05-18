import { throttler, trackerThrottler } from './common/utils/throttler';

import { ApiModule } from './api/api.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerProvider } from './common/utils/provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: throttler,
      getTracker: trackerThrottler,
    }),
    TypeOrmModule.forRoot(databaseConfig),
    ConfigModule.forRoot(),
    ApiModule,
  ],
  controllers: [AppController],
  providers: [AppService, ThrottlerProvider],
})
export class AppModule {}
