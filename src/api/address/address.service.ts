import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { AddressRepository } from './address.repository';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CacheRequestService } from '@/common/services/cache-request/cache-request.service';
import {
  addressQuerySchema,
  AddressQuerySchema,
  addressSchema,
} from './address.schema';
import { getErrorResponse } from '@/common/utils/lib';
import {
  responseConflict,
  responseCreated,
  responseNotFound,
  responseOk,
} from '@/common/utils/response-api';
import { seconds } from '@nestjs/throttler';
import { AddressDto } from './address.dto';
import { ProvincesRepository } from '../admininstrative-area/provinces/provinces.repository';
import { RegenciesRepository } from '../admininstrative-area/regencies/regencies.repository';
import { SubdistrictsRepository } from '../admininstrative-area/subdistricts/subdistricts.repository';
import { VillagesRepository } from '../admininstrative-area/villages/villages.repository';

@Injectable()
export class AddressService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly cache: CacheRequestService,
    private readonly repo: AddressRepository,
    private readonly provinceRepo: ProvincesRepository,
    private readonly regencyRepo: RegenciesRepository,
    private readonly subdistrictRepo: SubdistrictsRepository,
    private readonly villageRepo: VillagesRepository,
  ) {}

  async index(query: AddressQuerySchema) {
    try {
      const parsed = addressQuerySchema.parse(query);
      const key = this.cache.getCacheKey();
      let data = await this.cacheManager.get(key);
      if (data) return responseOk({ data });
      data = await this.repo.findByRefId(parsed.ref_id);
      if (!data) return responseNotFound({ message: 'Address not found' });
      await this.cacheManager.set(key, data, seconds(60));
      return responseOk({ data });
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  async findById(id: string) {
    try {
      const key = this.cache.getCacheKey();
      let data = await this.cacheManager.get(key);
      if (data) return responseOk({ data });
      data = await this.repo.findById(id);
      if (!data) return responseNotFound({ message: 'Address not found' });
      await this.cacheManager.set(key, data, seconds(60));
      return responseOk({ data });
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  async store(data: AddressDto) {
    try {
      const parsed = addressSchema.parse(data);
      const [existing, province, regency, subdistrict, village] =
        await Promise.all([
          this.repo.findByRefId(parsed.ref_id),
          this.provinceRepo.findOneById(parsed.province_id),
          this.regencyRepo.findById(parsed.regency_id),
          this.subdistrictRepo.findById(parsed.subdistrict_id),
          this.villageRepo.findById(parsed.village_id),
        ]);
      if (existing)
        return responseConflict({ message: 'Address already exists' });
      if (!province || !regency || !subdistrict || !village) {
        return responseNotFound({ message: 'Address not found' });
      }
      const address = await this.repo.store(parsed);
      return responseCreated({ data: address });
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  async update(id: string, data: AddressDto) {
    try {
      const parsed = addressSchema.parse(data);
      const [address, province, regency, subdistrict, village] =
        await Promise.all([
          this.repo.findById(id),
          this.provinceRepo.findOneById(parsed.province_id),
          this.regencyRepo.findById(parsed.regency_id),
          this.subdistrictRepo.findById(parsed.subdistrict_id),
          this.villageRepo.findById(parsed.village_id),
        ]);
      if (!address) return responseNotFound({ message: 'Address not found' });
      if (!province) return responseNotFound({ message: 'Province not found' });
      if (!regency) return responseNotFound({ message: 'Regency not found' });
      if (!subdistrict)
        return responseNotFound({ message: 'Subdistrict not found' });
      if (!village) return responseNotFound({ message: 'Village not found' });
      const updatedAddress = await this.repo.update(id, parsed);
      return responseOk({ data: updatedAddress });
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  async destroy(id: string) {
    try {
      const address = await this.repo.findById(id);
      if (!address) return responseNotFound({ message: 'Address not found' });
      await this.repo.destroy(id);
      return responseOk({ message: 'Address deleted' });
    } catch (error) {
      return getErrorResponse(error);
    }
  }
}
