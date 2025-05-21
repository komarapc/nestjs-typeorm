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
import { SitesEntity } from '@/database/entity/sites.entity';

type SitesData = {
  id: string;
  name: string;
  address?: {
    id?: string;
    full_address?: string;
    province?: {
      id?: string;
      code?: string;
      name?: string;
    };
    regency?: {
      id?: string;
      code?: string;
      name?: string;
    };
    subdistrict?: {
      id?: string;
      code?: string;
      name?: string;
    };
    village?: {
      id?: string;
      code?: string;
      name?: string;
    };
  };
};
@Injectable()
export class SitesService {
  constructor(
    private readonly siteRepo: SitesRepository,
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
    private readonly cacheKey: CacheRequestService,
  ) {}

  private transformSiteData(data: SitesEntity): SitesData {
    return {
      id: data.id,
      name: data.name,
      address: {
        id: data.address?.id,
        full_address: data.address?.text_address,
        province: {
          id: data.address?.province?.id,
          code: data.address?.province?.code,
          name: data.address?.province?.name,
        },
        regency: {
          id: data.address?.regency?.id,
          code: data.address?.regency?.code,
          name: data.address?.regency?.name,
        },
        subdistrict: {
          id: data.address?.subdistrict?.id,
          code: data.address?.subdistrict?.code,
          name: data.address?.subdistrict?.name,
        },
        village: {
          id: data.address?.village?.id,
          code: data.address?.village?.code,
          name: data.address?.village?.name,
        },
      },
    };
  }

  async index(query: SitesQueryDto) {
    try {
      const parsed = sitesQuerySchema.parse(query);
      const key = this.cacheKey.getCacheKey();
      let data = await this.cache.get(key);
      if (data) return responseOk({ data });
      const { data: sites, total } = await this.siteRepo.findAll(parsed);
      const meta = metaPagination({
        page: parsed.page,
        limit: parsed.limit,
        total,
      });
      data = { sites: sites.map((site) => this.transformSiteData(site)), meta };
      await this.cache.set(key, data, seconds(30));
      return responseOk({ data });
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
      await this.cache.set(key, this.transformSiteData(site), seconds(30));
      return responseOk({ data: this.transformSiteData(site) });
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
