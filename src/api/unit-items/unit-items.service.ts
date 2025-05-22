import { Inject, Injectable } from '@nestjs/common';
import { UnitItemsRepository } from './unit-items.repository';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CacheRequestService } from '@/common/services/cache-request/cache-request.service';
import { UnitItemDto, UnitItemQueryDto } from './unit-items.dto';
import { getErrorResponse, Meta, metaPagination } from '@/common/utils/lib';
import { unitItemQuerySchema, unitItemSchema } from './unit-items.schema';
import { UnitItemsEntity } from '@/database/entity/unit-items.entity';
import {
  responseCreated,
  responseNotFound,
  responseOk,
} from '@/common/utils/response-api';
import { seconds } from '@nestjs/throttler';

type DataCache = {
  unit_items: UnitItemsEntity[];
  meta: Meta;
};
@Injectable()
export class UnitItemsService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly cacheKey: CacheRequestService,
    private readonly repository: UnitItemsRepository,
  ) {}

  async findAll(query: UnitItemQueryDto) {
    try {
      const parsed = unitItemQuerySchema.parse(query);
      const key = this.cacheKey.getCacheKey();
      let data = await this.cacheManager.get<DataCache>(key);
      if (data) return responseOk({ data });
      const { data: unit_items, total } = await this.repository.findAll(parsed);
      const meta = metaPagination({
        page: parsed.page,
        limit: parsed.limit,
        total,
      });
      data = { unit_items, meta };
      await this.cacheManager.set<DataCache>(key, data, seconds(60));
      return responseOk({ data });
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  async findOne(id: string) {
    try {
      const key = this.cacheKey.getCacheKey();
      let data = await this.cacheManager.get<UnitItemsEntity>(key);
      if (data) return responseOk({ data });
      data = await this.repository.findOneById(id);
      if (!data) return responseNotFound({ message: 'Unit Item not found' });
      await this.cacheManager.set<UnitItemsEntity>(key, data, seconds(60));
      return responseOk({ data });
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  async store(data: UnitItemDto) {
    try {
      const parsed = unitItemSchema.parse(data);
      const unitItem = await this.repository.store(parsed);
      return responseCreated({ data: unitItem });
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  async update(id: string, data: UnitItemDto) {
    try {
      const parsed = unitItemSchema.parse(data);
      const unitItem = await this.repository.findOneById(id);
      if (!unitItem)
        return responseNotFound({ message: 'Unit Item not found' });
      const updated = await this.repository.update(id, parsed);
      return responseOk({ data: updated });
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  async destroy(id: string) {
    try {
      const unitItem = await this.repository.findOneById(id);
      if (!unitItem)
        return responseNotFound({ message: 'Unit Item not found' });
      await this.repository.destroy(id);
      return responseOk({ message: 'Unit Item deleted' });
    } catch (error) {
      return getErrorResponse(error);
    }
  }
}
