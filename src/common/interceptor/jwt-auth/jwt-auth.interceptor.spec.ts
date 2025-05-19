import { JwtAuthInterceptor } from './jwt-auth.interceptor';

describe('JwtAuthInterceptor', () => {
  it('should be defined', () => {
    expect(new JwtAuthInterceptor()).toBeDefined();
  });
});
