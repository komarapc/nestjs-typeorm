import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ResponseApi, responseOk } from './common/utils/response-api';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { hours, seconds } from '@nestjs/throttler';

type Data = {
  app_name: string;
  api_version: Record<string, string>;
};

@Injectable()
export class AppService {
  private readonly cacheKey = 'app_info';
  private readonly cacheTTL = seconds(hours(1));
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}
  private async getOrSetCache(): Promise<Data> {
    let data = await this.cache.get<Data>(this.cacheKey);
    if (!data) {
      data = this.getData();
      await this.cache.set(this.cacheKey, data, this.cacheTTL);
    }
    return data;
  }
  private getData(): Data {
    return {
      app_name: process.env.APP_NAME || 'API',
      api_version: {
        '1': 'Initial release',
      },
    };
  }
  async getApp(): Promise<ResponseApi> {
    const data = await this.getOrSetCache();
    return responseOk({ data });
  }
}
