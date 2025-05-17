import { RateLimiterGuard } from './rate-limiter.guard';

describe('RateLimiterGuard', () => {
  it('should be defined', () => {
    expect(new RateLimiterGuard()).toBeDefined();
  });
});
