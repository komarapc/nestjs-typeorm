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

import { Injectable } from '@nestjs/common';
import { SitesRepository } from './sites.repository';

@Injectable()
export class SitesService {
  constructor(private readonly siteRepo: SitesRepository) {}

  async index(query: SitesQueryDto) {
    try {
      const parsed = sitesQuerySchema.parse(query);
      const { data, total } = await this.siteRepo.findAll(parsed);
      const meta = metaPagination({
        page: parsed.page,
        limit: parsed.limit,
        total,
      });
      return responseOk({ data: { sites: data, meta } });
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
      const site = await this.siteRepo.findOne(id);
      if (!site) return responseNotFound({ message: 'Site not found' });
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
