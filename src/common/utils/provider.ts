import { Provider } from '@nestjs/common';
import { RateLimiterGuard } from '../guards/rate-limiter/rate-limiter.guard';

export const ThrottlerProvider: Provider = {
  provide: 'APP_GUARD',
  useClass: RateLimiterGuard,
};
