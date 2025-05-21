import {
  responseConflict,
  responseCreated,
  responseInternalServerError,
  responseNotFound,
  responseOk,
} from '@/common/utils/response-api';

import { Inject, Injectable } from '@nestjs/common';
import { VillagesDto, VillagesQueryDto } from './villages.dto';
import { VillagesRepository } from './villages.repository';
import { getErrorResponse, Meta, metaPagination } from '@/common/utils/lib';
import { villagesQuerySchema, villagesSchema } from './villages.schema';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CacheRequestService } from '@/common/services/cache-request/cache-request.service';
import { SubdistrictsRepository } from '../subdistricts/subdistricts.repository';
import { AddressVillagesEntity } from '@/database/entity/address-villages.entity';
import { seconds } from '@nestjs/throttler';

type DataCache = {
  villages: AddressVillagesEntity[];
  meta: Meta;
};
@Injectable()
export class VillagesService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly cacheKey: CacheRequestService,
    private readonly repo: VillagesRepository,
    private readonly subdistrictRepo: SubdistrictsRepository,
  ) {}

  async findAll(query: VillagesQueryDto) {
    try {
      const parsed = villagesQuerySchema.parse(query);
      const key = this.cacheKey.getCacheKey();
      let data = await this.cacheManager.get<DataCache>(key);
      if (data) return responseOk({ data });
      const { data: villages, total } = await this.repo.findAll(parsed);
      const meta = metaPagination({
        page: parsed.page,
        limit: parsed.limit,
        total,
      });
      data = { villages, meta };
      await this.cacheManager.set<DataCache>(key, data, seconds(60));
      return responseOk({ data });
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  async findById(id: string) {
    try {
      const village = await this.repo.findById(id);
      if (!village) return responseNotFound({ message: 'Village not found' });
      return responseOk({ data: village });
    } catch (error) {
      const message = error.message || 'Internal Server Error';
      return responseInternalServerError({ message });
    }
  }

  async store(data: VillagesDto) {
    try {
      const parsed = villagesSchema.parse(data);
      const [existingCode, subdistrict] = await Promise.all([
        this.repo.findByCode(parsed.code),
        this.subdistrictRepo.findByCode(parsed.subdistrict_code),
      ]);
      if (existingCode)
        return responseConflict({ message: 'Village code already exists' });
      if (!subdistrict)
        return responseNotFound({ message: 'Subdistrict not found' });
      const villages = await this.repo.store(parsed);
      return responseCreated({ data: villages });
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  async update(id: string, data: VillagesDto) {
    try {
      const parsed = villagesSchema.parse(data);
      const [villages, existingCode, subdistrict] = await Promise.all([
        this.repo.findById(id),
        this.repo.findByCode(parsed.code),
        this.subdistrictRepo.findByCode(parsed.subdistrict_code),
      ]);
      if (!villages) return responseNotFound({ message: 'Village not found' });
      if (existingCode && existingCode.id !== id)
        return responseConflict({ message: 'Village code already exists' });
      if (!subdistrict)
        return responseNotFound({ message: 'Subdistrict not found' });
      const updated = await this.repo.update(id, parsed);
      return responseOk({ data: updated });
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  async destroy(id: string) {
    try {
      const villages = await this.repo.findById(id);
      if (!villages) return responseNotFound({ message: 'Village not found' });
      await this.repo.destroy(id);
      return responseOk({ message: 'Village deleted successfully' });
    } catch (error) {
      return getErrorResponse(error);
    }
  }
}
