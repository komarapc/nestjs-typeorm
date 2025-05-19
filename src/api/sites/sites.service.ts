import { SitesDto, SitesQueryDto } from './sites.dto';
import { metaPagination, zodErrorParse } from '@/common/utils/lib';
import {
  responseBadRequest,
  responseCreated,
  responseInternalServerError,
  responseNotFound,
  responseOk,
} from '@/common/utils/response-api';
import { sitesQuerySchema, sitesSchema } from './sites.schema';

import { Inject, Injectable } from '@nestjs/common';
import { SitesRepository } from './sites.repository';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CacheRequestService } from '@/common/services/cache-request/cache-request.service';
import { seconds } from '@nestjs/throttler';

@Injectable()
export class SitesService {
  constructor(
    private readonly siteRepo: SitesRepository,
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
    private readonly cacheKey: CacheRequestService,
  ) {}

  async index(query: SitesQueryDto) {
    try {
      const parsed = sitesQuerySchema.parse(query);
      const key = this.cacheKey.getCacheKey();
      const cachedData = await this.cache.get(key);
      if (cachedData) return responseOk({ data: cachedData });
      const { data, total } = await this.siteRepo.findAll(parsed);
      const meta = metaPagination({
        page: parsed.page,
        limit: parsed.limit,
        total,
      });
      const dataResponse = { sites: data, meta };
      await this.cache.set(key, dataResponse, seconds(30));
      return responseOk({ data: dataResponse });
    } catch (error) {
      const zodErr = zodErrorParse(error);
      if (zodErr.isError) return responseBadRequest({ error: zodErr.errors });
      return responseInternalServerError({
        message: error.message || 'Internal Server Error',
      });
    }
  }

  async findOne(id: string) {
    try {
      const key = this.cacheKey.getCacheKey();
      const cachedData = await this.cache.get(key);
      if (cachedData) return responseOk({ data: cachedData });
      const site = await this.siteRepo.findOne(id);
      if (!site) return responseNotFound({ message: 'Site not found' });
      await this.cache.set(key, site, seconds(30));
      return responseOk({ data: site });
    } catch (error) {
      return responseInternalServerError({
        error: error.message || 'Internal Server Error',
      });
    }
  }

  async store(data: SitesDto) {
    try {
      const parsed = sitesSchema.parse(data);
      const site = await this.siteRepo.store(parsed);
      return responseCreated({ data: site });
    } catch (error) {
      const zodErr = zodErrorParse(error);
      if (zodErr.isError) return responseBadRequest({ error: zodErr.errors });
      return responseInternalServerError({
        message: error.message || 'Internal Server Error',
      });
    }
  }

  async update(id: string, data: SitesDto) {
    try {
      const parsed = sitesSchema.parse(data);
      const site = await this.siteRepo.findOne(id);
      if (!site) return responseNotFound({ message: 'Site not found' });
      const updated = await this.siteRepo.update(id, parsed);
      return responseOk({ data: updated });
    } catch (error) {
      const zodErr = zodErrorParse(error);
      if (zodErr.isError) return responseBadRequest({ error: zodErr.errors });
      return responseInternalServerError({
        message: error.message || 'Internal Server Error',
      });
    }
  }

  async destroy(id: string) {
    try {
      const site = await this.siteRepo.findOne(id);
      if (!site) return responseNotFound({ message: 'Site not found' });
      await this.siteRepo.destroy(id);
      return responseOk({ message: 'Site deleted' });
    } catch (error) {
      return responseInternalServerError({
        message: error.message || 'Internal Server Error',
      });
    }
  }
}
