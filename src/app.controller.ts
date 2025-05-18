import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { Controller, Get, UseInterceptors } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { hours } from '@nestjs/throttler';

@ApiTags('/')
@Controller()
@UseInterceptors(CacheInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @CacheTTL(hours(1))
  @CacheKey('app_info')
  async getApp() {
    return this.appService.getApp();
  }
}
