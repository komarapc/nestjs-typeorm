import { HttpException, Inject, Injectable } from '@nestjs/common';
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

import { ResourceRepository } from './resources.repository';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CacheRequestService } from '@/common/services/cache-request/cache-request.service';
import { seconds } from '@nestjs/throttler';

@Injectable()
export class ResourcesService {
  constructor(
    private readonly resourceRepo: ResourceRepository,
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
    private readonly cacheKey: CacheRequestService,
  ) {}

  async index(query: ResourcesQueryDto): Promise<ResponseApi> {
    try {
      const parse = resourceQuerySchema.parse(query);
      const key = this.cacheKey.getCacheKey();
      const cachedData = await this.cache.get(key);
      if (cachedData) return responseOk({ data: cachedData });
      const { data, total } = await this.resourceRepo.findAll(parse);
      const meta = metaPagination({
        page: parse.page,
        limit: parse.limit,
        total,
      });
      const dataResponse = { resources: data, meta };
      await this.cache.set(key, dataResponse, seconds(30));
      return responseOk({ data: dataResponse });
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
      const key = this.cacheKey.getCacheKey();
      const cachedData = await this.cache.get(key);
      if (cachedData) return responseOk({ data: cachedData });
      const resource = await this.resourceRepo.findById(id);
      if (!resource) return responseNotFound({ message: 'Resource not found' });
      await this.cache.set(key, resource, seconds(30));
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

  async update(id: string, data: ResourcesDto): Promise<ResponseApi> {
    try {
      const parsed = resourcesCreateSchema.parse(data);
      const resource = await this.resourceRepo.findById(id);
      if (!resource) return responseNotFound({ message: 'Resource not found' });
      const updatedResource = await this.resourceRepo.update(id, parsed);
      return responseOk({ data: updatedResource });
    } catch (error) {
      const zodErr = zodErrorParse(error);
      if (zodErr.isError) return responseBadRequest({ error: zodErr.errors });
      return responseInternalServerError({
        error: error?.message || 'Internal Server Error',
      });
    }
  }

  async destroy(id: string) {
    try {
      const resource = await this.resourceRepo.findById(id);
      if (!resource) return responseNotFound({ message: 'Resource not found' });
      await this.resourceRepo.destroy(id);
      return responseOk({ message: 'Resource deleted successfully' });
    } catch (error) {
      return responseInternalServerError({
        message: error?.message || 'Internal Server Error',
      });
    }
  }
}
