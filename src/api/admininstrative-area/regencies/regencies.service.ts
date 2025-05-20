import {
  responseConflict,
  responseCreated,
  responseInternalServerError,
  responseNotFound,
  responseOk,
} from '@/common/utils/response-api';

import { Inject, Injectable } from '@nestjs/common';
import { ProvincesRepository } from '../provinces/provinces.repository';
import { RegenciesRepository } from './regencies.repository';
import { RegencyDto, RegencyQueryDto } from './regencies.dto';
import { getErrorResponse, Meta, metaPagination } from '@/common/utils/lib';
import { regencyQuerySchema, regencySchema } from './regencies.schema';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CacheRequestService } from '@/common/services/cache-request/cache-request.service';
import { AddressRegencyEntity } from '@/database/entity/address-regency.entity';
import { seconds } from '@nestjs/throttler';

type DataCache = {
  regencies: AddressRegencyEntity[];
  meta: Meta;
};
@Injectable()
export class RegenciesService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly cacheKey: CacheRequestService,
    private readonly repo: RegenciesRepository,
    private readonly provinceRepo: ProvincesRepository,
  ) {}

  async findAll(query: RegencyQueryDto) {
    try {
      const parsed = regencyQuerySchema.parse(query);
      const key = this.cacheKey.getCacheKey();
      let cacheData = await this.cacheManager.get<DataCache>(key);
      if (cacheData) return responseOk({ data: cacheData });
      const { data, total } = await this.repo.findAll(parsed);
      const meta = metaPagination({
        page: parsed.page,
        limit: parsed.limit,
        total,
      });
      cacheData = { regencies: data, meta };
      await this.cacheManager.set(key, cacheData, seconds(60));
      return responseOk({ data: cacheData });
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  async findById(id: string) {
    try {
      const key = this.cacheKey.getCacheKey();
      let regency = await this.cacheManager.get<AddressRegencyEntity>(key);
      if (regency) return responseOk({ data: regency });
      regency = await this.repo.findById(id);
      if (!regency) return responseNotFound({ message: 'Regency not found' });
      await this.cacheManager.set(key, regency, seconds(60));
      return responseOk({ data: regency });
    } catch (error) {
      return responseInternalServerError({
        message: error.message || 'Internal Server Error',
      });
    }
  }

  async store(data: RegencyDto) {
    try {
      const parsed = regencySchema.parse(data);
      const [existing, province] = await Promise.all([
        this.repo.findByCode(parsed.code),
        this.provinceRepo.findOneByCode(parsed.province_code),
      ]);
      if (existing)
        return responseConflict({ message: 'Regency already exists' });
      if (!province) return responseNotFound({ message: 'Province not found' });
      const regency = await this.repo.store(parsed);
      return responseCreated({ data: regency });
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  async update(id: string, data: RegencyDto) {
    try {
      const parsed = regencySchema.parse(data);
      const [regency, existingCode, province] = await Promise.all([
        this.repo.findById(id),
        this.repo.findByCode(parsed.code),
        this.provinceRepo.findOneByCode(parsed.province_code),
      ]);
      if (!regency) return responseNotFound({ message: 'Regency not found' });
      if (existingCode && existingCode.id !== id)
        return responseConflict({ message: 'Regency already exists' });
      if (!province) return responseNotFound({ message: 'Province not found' });
      const updated = await this.repo.update(id, parsed);
      return responseOk({ data: updated });
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  async destroy(id: string) {
    try {
      const regency = await this.repo.findById(id);
      if (!regency) return responseNotFound({ message: 'Regency not found' });
      await this.repo.destroy(id);
      return responseOk({ message: 'Regency deleted successfully' });
    } catch (error) {
      return getErrorResponse(error);
    }
  }
}
