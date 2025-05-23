import { CacheRequestService } from '@/common/services/cache-request/cache-request.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { UnitConversionRepository } from './unit-conversions.repository';
import { UnitItemsRepository } from '../unit-items/unit-items.repository';

@Injectable()
export class UnitConversionsService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly cacheKey: CacheRequestService,
    private readonly unitConversionRepo: UnitConversionRepository,
    private readonly unitItemsRepo: UnitItemsRepository,
  ) {}
}
