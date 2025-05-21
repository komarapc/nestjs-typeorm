import { CacheRequestService } from '@/common/services/cache-request/cache-request.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { SubdistrictsRepository } from './subdistricts.repository';
import { RegenciesRepository } from '../regencies/regencies.repository';
import { SubdistrictDto, SubdistrictQueryDto } from './subdistricts.dto';
import { getErrorResponse, Meta, metaPagination } from '@/common/utils/lib';
import {
  subdistrictQuerySchema,
  subdistrictSchema,
} from './subdistricts.schema';
import { AddressSubdistrictEntity } from '@/database/entity/address-subdistrict.entity';
import {
  responseConflict,
  responseCreated,
  responseNotFound,
  responseOk,
} from '@/common/utils/response-api';
import { seconds } from '@nestjs/throttler';

type DataCache = {
  subdistricts: AddressSubdistrictEntity[];
  meta: Meta;
};
@Injectable()
export class SubdistrictsService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly cacheKey: CacheRequestService,
    private readonly repository: SubdistrictsRepository,
    private readonly regencyRepository: RegenciesRepository,
  ) {}

  async findAll(query: SubdistrictQueryDto) {
    try {
      const parsed = subdistrictQuerySchema.parse(query);
      const key = this.cacheKey.getCacheKey();
      let cacheData = await this.cacheManager.get<DataCache>(key);
      if (cacheData) return responseOk({ data: cacheData });
      const { data, total } = await this.repository.findAll(parsed);
      const meta = metaPagination({
        page: parsed.page,
        limit: parsed.limit,
        total,
      });
      cacheData = { subdistricts: data, meta };
      await this.cacheManager.set(key, cacheData, seconds(60));
      return responseOk({ data: cacheData });
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  async findById(id: string) {
    try {
      const key = this.cacheKey.getCacheKey();
      let data = await this.cacheManager.get<AddressSubdistrictEntity>(key);
      if (data) return responseOk({ data });
      data = await this.repository.findById(id);
      if (!data) return responseNotFound({ message: 'Subdistrict not found' });
      await this.cacheManager.set(key, data, seconds(60));
      return responseOk({ data });
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  async store(data: SubdistrictDto) {
    try {
      const parsed = subdistrictSchema.parse(data);
      const [existingCode, regency] = await Promise.all([
        this.repository.findByCode(parsed.code),
        this.regencyRepository.findByCode(parsed.regency_code),
      ]);
      if (existingCode)
        return responseConflict({ message: 'Subdistrict code already exists' });
      if (!regency) return responseNotFound({ message: 'Regency not found' });
      const subdistrict = await this.repository.store(parsed);
      return responseCreated({ data: subdistrict });
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  async update(id: string, data: SubdistrictDto) {
    try {
      const parsed = subdistrictSchema.parse(data);
      const [subdistrict, existincCode, province] = await Promise.all([
        this.repository.findById(id),
        this.repository.findByCode(parsed.code),
        this.regencyRepository.findByCode(parsed.regency_code),
      ]);
      if (!subdistrict)
        return responseNotFound({ message: 'Subdistrict not found' });
      if (existincCode && existincCode.id !== id)
        return responseConflict({ message: 'Subdistrict code already exists' });
      if (!province) return responseNotFound({ message: 'Regency not found' });
      const updated = await this.repository.update(id, parsed);
      return responseOk({ data: updated });
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  async destroy(id: string) {
    try {
      const subdistrict = await this.repository.findById(id);
      if (!subdistrict)
        return responseNotFound({ message: 'Subdistrict not found' });
      await this.repository.destroy(id);
      return responseOk({ message: 'Subdistrict deleted successfully' });
    } catch (error) {
      return getErrorResponse(error);
    }
  }
}
