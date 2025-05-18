import { ConfigModule, ConfigService } from '@nestjs/config';
import { throttler, trackerThrottler } from './throttler';

import { ThrottlerAsyncOptions } from '@nestjs/throttler';
import { ThrottlerStorageRedisService } from '@nest-lab/throttler-storage-redis';

const throttlerModuleConfig: ThrottlerAsyncOptions = {
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
};

export { throttlerModuleConfig };
