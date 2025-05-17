import {
  responseBadRequest,
  responseCreated,
  responseInternalServerError,
} from '@/common/utils/response-api';

import { Injectable } from '@nestjs/common';
import { SitesDto } from './sites.dto';
import { SitesRepository } from './sites.repository';
import { sitesSchema } from './sites.schema';
import { zodErrorParse } from '@/common/utils/lib';

@Injectable()
export class SitesService {
  constructor(private readonly siteRepo: SitesRepository) {}

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
}
