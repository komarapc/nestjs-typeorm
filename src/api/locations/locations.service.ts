import { LocationQueryDto, LocationsDto } from './locations.dto';
import { locationQuerySchema, locationsSchema } from './locations.schema';
import {
  MetaPagination,
  metaPagination,
  zodErrorParse,
} from '@/common/utils/lib';
import {
  responseBadRequest,
  responseCreated,
  responseInternalServerError,
  responseNotFound,
  responseOk,
} from '@/common/utils/response-api';

import { Inject, Injectable } from '@nestjs/common';
import { LocationsRepository } from './locations.repository';
import { SitesRepository } from '../sites/sites.repository';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CacheRequestService } from '@/common/services/cache-request/cache-request.service';
import { LocationsEntity } from '@/database/entity/locations.entity';
import { seconds } from '@nestjs/throttler';

@Injectable()
export class LocationsService {
  constructor(
    private readonly locationRepo: LocationsRepository,
    private readonly siteRepo: SitesRepository,
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
    private readonly cacheKey: CacheRequestService,
  ) {}

  async findAll(query: LocationQueryDto) {
    try {
      const cacheKey = this.cacheKey.getCacheKey();
      const cachedData = await this.cache.get<{
        locations: LocationsEntity[];
        meta: MetaPagination;
      }>(cacheKey);
      if (cachedData) return responseOk({ data: cachedData });
      const parsed = locationQuerySchema.parse(query);
      const { data, total } = await this.locationRepo.findAll(parsed);
      const meta = metaPagination({
        limit: parsed.limit,
        page: parsed.page,
        total,
      });
      await this.cache.set(cacheKey, { locations: data, meta }, seconds(30));
      return responseOk({ data: { locations: data, meta } });
    } catch (error) {
      const message = error.message || 'Internal Server Error';
      const zodErr = zodErrorParse(error);
      if (zodErr.isError) return responseBadRequest({ error: zodErr.errors });
      return responseInternalServerError({ message });
    }
  }

  async store(data: LocationsDto) {
    try {
      const parsed = locationsSchema.parse(data);
      const site = await this.siteRepo.findOne(parsed.site_id);
      if (!site) return responseNotFound({ message: 'Site not found' });
      const location = await this.locationRepo.store(parsed);
      return responseCreated({ data: location });
    } catch (error) {
      const zodErr = zodErrorParse(error);
      const errMessage = error.message || 'Internal Server Error';
      if (zodErr.isError) return responseBadRequest({ error: zodErr.errors });
      return responseInternalServerError({ message: errMessage });
    }
  }

  async findOne(id: string) {
    try {
      const cacheKey = this.cacheKey.getCacheKey();
      const cachedData = await this.cache.get<LocationsEntity>(cacheKey);
      if (cachedData) return responseOk({ data: cachedData });
      const location = await this.locationRepo.findById(id);
      if (!location) return responseNotFound({ message: 'Location not found' });
      await this.cache.set(cacheKey, location, seconds(30));
      return responseOk({ data: location });
    } catch (error) {
      const message = error.message || 'Internal Server Error';
      return responseInternalServerError({ message });
    }
  }

  async update(id: string, data: LocationsDto) {
    try {
      const parsed = locationsSchema.parse(data);
      const [location, site] = await Promise.all([
        this.locationRepo.findById(id),
        this.siteRepo.findOne(parsed.site_id),
      ]);
      if (!location) return responseNotFound({ message: 'Location not found' });
      if (!site) return responseNotFound({ message: 'Site not found' });
      const updatedLocation = await this.locationRepo.update(id, parsed);
      return responseOk({ data: updatedLocation });
    } catch (error) {
      const message = error.message || 'Internal Server Error';
      const zodErr = zodErrorParse(error);
      if (zodErr.isError) return responseBadRequest({ error: zodErr.errors });
      return responseInternalServerError({ message });
    }
  }

  async destroy(id: string) {
    try {
      const location = await this.locationRepo.findById(id);
      if (!location) return responseNotFound({ message: 'Location not found' });
      await this.locationRepo.destroy(id);
      return responseOk({ message: 'Location deleted successfully' });
    } catch (error) {
      const message = error.message || 'Internal Server Error';
      return responseInternalServerError({ message });
    }
  }
}
