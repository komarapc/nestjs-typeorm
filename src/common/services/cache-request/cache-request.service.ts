import { Injectable } from '@nestjs/common';

@Injectable()
export class CacheRequestService {
  private cacheKey: string;
  setCacheKey(key: string): void {
    this.cacheKey = key;
  }
  getCacheKey(): string {
    return this.cacheKey;
  }
}
