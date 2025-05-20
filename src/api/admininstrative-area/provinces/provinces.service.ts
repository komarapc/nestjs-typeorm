import { Inject, Injectable } from '@nestjs/common';
import { ProvincesRepository } from './provinces.repository';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CacheRequestService } from '@/common/services/cache-request/cache-request.service';
import { ProvinceDto, ProvinceQueryDto } from './provinces.dto';
import { provinceQuerySchema, provinceSchema } from './provinces.schema';
import { getErrorResponse, Meta, metaPagination } from '@/common/utils/lib';
import {
  responseConflict,
  responseCreated,
  responseNotFound,
  responseOk,
} from '@/common/utils/response-api';
import { AddressProvincesEntity } from '@/database/entity/address-province.entity';
import { seconds } from '@nestjs/throttler';

type ProvinceListCache = {
  provinces: AddressProvincesEntity[];
  meta: Meta;
};

@Injectable()
export class ProvincesService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly cacheKey: CacheRequestService,
    private readonly repo: ProvincesRepository,
  ) {}

  async findAll(query: ProvinceQueryDto) {
    try {
      const parsed = provinceQuerySchema.parse(query);
      const key = this.cacheKey.getCacheKey();
      const cacheData = await this.cacheManager.get<ProvinceListCache>(key);
      if (cacheData) return responseOk({ data: cacheData });
      const { data, total } = await this.repo.findAll(parsed);
      const meta = metaPagination({
        limit: parsed.limit,
        page: parsed.page,
        total,
      });
      await this.cacheManager.set<ProvinceListCache>(
        key,
        { provinces: data, meta },
        seconds(60),
      );
      return responseOk({ data: { provinces: data, meta } });
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  async findOneById(id: string) {
    try {
      const key = this.cacheKey.getCacheKey();
      const cacheData = await this.cacheManager.get<ProvinceListCache>(key);
      if (cacheData) return responseOk({ data: cacheData });
      const province = await this.repo.findOneById(id);
      if (!province) return responseNotFound({ message: 'Province not found' });
      await this.cacheManager.set(key, province, seconds(60));
      return responseOk({ data: province });
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  async store(data: ProvinceDto) {
    try {
      const parsed = provinceSchema.parse(data);
      const existingProvince = await this.repo.findOneByCode(parsed.code);
      if (existingProvince)
        return responseConflict({ message: 'Province already exists' });
      const newProvince = await this.repo.store(parsed);
      return responseCreated({ data: newProvince });
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  async update(id: string, data: ProvinceDto) {
    try {
      const parsed = provinceSchema.parse(data);
      const [province, existingCode] = await Promise.all([
        this.repo.findOneById(id),
        this.repo.findOneByCode(parsed.code),
      ]);
      if (!province) return responseNotFound({ message: 'Province not found' });
      if (existingCode && existingCode.id !== id)
        return responseConflict({ message: 'Province already exists' });
      const updatedProvince = await this.repo.update(id, parsed);
      return responseOk({ data: updatedProvince });
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  async destroy(id: string) {
    try {
      const province = await this.repo.findOneById(id);
      if (!province) return responseNotFound({ message: 'Province not found' });
      await this.repo.destroy(id);
      return responseOk({ message: 'Province deleted successfully' });
    } catch (error) {
      return getErrorResponse(error);
    }
  }
}
