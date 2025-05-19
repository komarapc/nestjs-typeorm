import { PermissionQueryDto, PermissionsCreateDto } from './permissions.dto';
import {
  ResponseApi,
  responseBadRequest,
  responseCreated,
  responseInternalServerError,
  responseNotFound,
  responseOk,
} from '@/common/utils/response-api';
import { Meta, metaPagination, zodErrorParse } from '@/common/utils/lib';
import {
  permissionsCreateSchema,
  permissionsQuerySchema,
} from './permissions.schema';

import { Inject, Injectable } from '@nestjs/common';
import { PermissionsRepository } from './permissions.repository';
import { ResourceRepository } from '../resources/resources.repository';
import { RolesRepository } from '../roles/roles.repository';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CacheRequestService } from '@/common/services/cache-request/cache-request.service';
import { seconds } from '@nestjs/throttler';
import { PermissionsEntity } from '@/database/entity/permissions.entity';

type CachePermissions = {
  permissions: PermissionsEntity[];
  meta: Meta;
};
@Injectable()
export class PermissionsService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
    private readonly cacheKey: CacheRequestService,
    private readonly repo: PermissionsRepository,
    private readonly roleRepo: RolesRepository,
    private readonly resourceRepo: ResourceRepository,
  ) {}
  async index(query: PermissionQueryDto) {
    try {
      const parsed = permissionsQuerySchema.parse(query);
      const cacheKey = this.cacheKey.getCacheKey();
      const cacheData = await this.cache.get<CachePermissions>(cacheKey);
      if (cacheData) return responseOk({ data: cacheData });
      const { data: permissions, total } = await this.repo.findAll(parsed);
      const meta = metaPagination({
        page: parsed.page,
        limit: parsed.limit,
        total,
      });
      await this.cache.set(cacheKey, { permissions, meta }, seconds(30));
      return responseOk({ data: { permissions, meta } });
    } catch (error) {
      const zodErr = zodErrorParse(error);
      if (zodErr.isError) return responseBadRequest({ error: zodErr.errors });
      return responseInternalServerError({
        message: error.message || 'Internal Server Error',
      });
    }
  }
  async store(data: PermissionsCreateDto) {
    try {
      const parsed = permissionsCreateSchema.parse(data);
      const [role, resource] = await Promise.all([
        this.roleRepo.findById(parsed.role_id),
        this.resourceRepo.findById(parsed.resource_id),
      ]);
      if (!role) return responseNotFound({ message: 'Role not found' });
      if (!resource) return responseNotFound({ message: 'Resource not found' });
      const permission = await this.repo.store(parsed);
      return responseCreated({ data: permission });
    } catch (error) {
      const zodErr = zodErrorParse(error);
      if (zodErr.isError) return responseBadRequest({ error: zodErr.errors });
      return responseInternalServerError({
        message: error.message || 'Internal Server Error',
      });
    }
  }
  async show(id: string): Promise<ResponseApi> {
    try {
      const cacheKey = this.cacheKey.getCacheKey();
      let data = await this.cache.get<PermissionsCreateDto>(cacheKey);
      if (data) return responseOk({ data });
      data = await this.repo.findById(id);
      if (!data) return responseNotFound({ message: 'Permission Not Found' });
      await this.cache.set(cacheKey, data, seconds(30));
      return responseOk({ data });
    } catch (error) {
      return responseInternalServerError({
        message: error.message || 'Internal Server Error',
      });
    }
  }

  async update(id: string, data: PermissionsCreateDto) {
    try {
      const parsed = permissionsCreateSchema.parse(data);
      const [permission, role, resource] = await Promise.all([
        this.repo.findById(id),
        this.roleRepo.findById(parsed.role_id),
        this.resourceRepo.findById(parsed.resource_id),
      ]);
      if (!permission)
        return responseNotFound({ message: 'Permission Not Found' });
      if (!role) return responseNotFound({ message: 'Role not found' });
      if (!resource) return responseNotFound({ message: 'Resource not found' });
      const updated = await this.repo.update(id, parsed);
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
      const permission = await this.repo.findById(id);
      if (!permission)
        return responseNotFound({ message: 'Permission Not Found' });
      await this.repo.destroy(id);
      return responseOk({ message: 'Permission Deleted' });
    } catch (error) {
      return responseInternalServerError({
        message: error.message || 'Internal Server Error',
      });
    }
  }
}
