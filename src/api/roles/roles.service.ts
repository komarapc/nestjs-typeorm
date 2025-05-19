import { RolesDto, RolesQueryDto } from './roles.dto';
import { Meta, metaPagination, zodErrorParse } from '@/common/utils/lib';
import {
  responseBadRequest,
  responseConflict,
  responseCreated,
  responseInternalServerError,
  responseOk,
} from '@/common/utils/response-api';
import { rolesQuerySchema, rolesSchema } from './roles.schema';

import { Inject, Injectable } from '@nestjs/common';
import { RolesRepository } from './roles.repository';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CacheRequestService } from '@/common/services/cache-request/cache-request.service';
import { RolesEntity } from '@/database/entity/roles.entity';
import { seconds } from '@nestjs/throttler';

type CacheRoles = {
  roles: RolesEntity[];
  meta: Meta;
};
@Injectable()
export class RolesService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
    private readonly cacheKey: CacheRequestService,
    private readonly rolesRepo: RolesRepository,
  ) {}

  async index(query: RolesQueryDto) {
    try {
      const parsed = rolesQuerySchema.parse(query);
      const key = this.cacheKey.getCacheKey();
      const cachedDdata = await this.cache.get<CacheRoles>(key);
      if (cachedDdata) return responseOk({ data: cachedDdata });
      const { data, total } = await this.rolesRepo.findAll(parsed);
      const meta = metaPagination({
        limit: parsed.limit,
        page: parsed.page,
        total,
      });
      await this.cache.set<CacheRoles>(key, { roles: data, meta }, seconds(30));
      return responseOk({
        data: { roles: data, meta },
      });
    } catch (error) {
      const zodErr = zodErrorParse(error);
      if (zodErr.isError) return responseBadRequest({ error: zodErr.errors });
      return responseInternalServerError({
        message: error?.message || 'Internal Server Error',
      });
    }
  }

  async store(data: RolesDto) {
    try {
      const parsed = rolesSchema.parse(data);
      const existingRole = await this.rolesRepo.findByCode(parsed.code);
      if (existingRole)
        return responseConflict({ message: 'Role already exists' });
      const newRole = await this.rolesRepo.store(parsed);
      return responseCreated({ data: newRole });
    } catch (error) {
      const zodErr = zodErrorParse(error);
      if (zodErr.isError) return responseBadRequest({ error: zodErr.errors });
      return responseInternalServerError({
        message: error?.message || 'Internal Server Error',
      });
    }
  }

  async show(id: string) {
    try {
      const key = this.cacheKey.getCacheKey();
      const cachedData = await this.cache.get<RolesEntity>(key);
      if (cachedData) return responseOk({ data: cachedData });
      const role = await this.rolesRepo.findById(id);
      if (!role) return responseBadRequest({ message: 'Role not found' });
      await this.cache.set<RolesEntity>(key, role, seconds(30));
      return responseOk({ data: role });
    } catch (error) {
      return responseInternalServerError({
        message: error?.message || 'Internal Server Error',
      });
    }
  }

  async update(id: string, data: RolesDto) {
    try {
      const parsed = rolesSchema.parse(data);
      const [roles, existingRole] = await Promise.all([
        this.rolesRepo.findById(id),
        this.rolesRepo.findByCode(parsed.code),
      ]);
      if (!roles) return responseBadRequest({ message: 'Role not found' });
      if (existingRole && existingRole.id !== id)
        return responseConflict({ message: 'Role already exists' });
      const updatedRole = await this.rolesRepo.update(id, parsed);
      return responseOk({ data: updatedRole });
    } catch (error) {
      const zodErr = zodErrorParse(error);
      if (zodErr.isError) return responseBadRequest({ error: zodErr.errors });
      return responseInternalServerError({
        message: error?.message || 'Internal Server Error',
      });
    }
  }

  async destroy(id: string) {
    try {
      const role = await this.rolesRepo.findById(id);
      if (!role) return responseBadRequest({ message: 'Role not found' });
      await this.rolesRepo.destroy(id);
      return responseOk({ message: 'Role deleted successfully' });
    } catch (error) {
      const zodErr = zodErrorParse(error);
      if (zodErr.isError) return responseBadRequest({ error: zodErr.errors });
      return responseInternalServerError({
        message: error?.message || 'Internal Server Error',
      });
    }
  }
}
