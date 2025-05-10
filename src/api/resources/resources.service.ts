import { ResourcesDto, ResourcesQueryDto } from './resources.dto';
import {
  ResponseApi,
  responseBadRequest,
  responseCreated,
  responseInternalServerError,
  responseNotFound,
  responseOk,
} from '@/common/utils/response-api';
import { metaPagination, zodErrorParse } from '@/common/utils/lib';
import { resourceQuerySchema, resourcesCreateSchema } from './resources.schema';

import { Injectable } from '@nestjs/common';
import { ResourceRepository } from './resources.repository';

@Injectable()
export class ResourcesService {
  constructor(private readonly resourceRepo: ResourceRepository) {}

  async index(query: ResourcesQueryDto): Promise<ResponseApi> {
    try {
      const parse = resourceQuerySchema.parse(query);
      const { data, total } = await this.resourceRepo.findAll(parse);
      const meta = metaPagination({
        page: parse.page,
        limit: parse.limit,
        total,
      });
      return responseOk({ data: { resources: data, meta } });
    } catch (error) {
      const zodErr = zodErrorParse(error);
      if (zodErr.isError) return responseBadRequest({ error: zodErr.errors });
      return responseInternalServerError({
        message: error?.message || 'Internal Server Error',
      });
    }
  }

  async show(id: string): Promise<ResponseApi> {
    try {
      const resource = await this.resourceRepo.findById(id);
      if (!resource) return responseNotFound({ message: 'Resource not found' });
      return responseOk({ data: resource });
    } catch (error) {
      return responseInternalServerError({
        message: error?.message || 'Internal Server Error',
      });
    }
  }

  async store(data: ResourcesDto): Promise<ResponseApi> {
    try {
      const parsed = resourcesCreateSchema.parse(data);
      const resource = await this.resourceRepo.store(parsed);
      return responseCreated({ data: resource });
    } catch (error) {
      const zodErr = zodErrorParse(error);
      if (zodErr.isError) return responseBadRequest({ error: zodErr.errors });
      return responseInternalServerError({
        message: error?.message || 'Internal Server Error',
      });
    }
  }
}
