import { HasRoleDto, HasRoleQueryDto } from '@/api/has-roles/has-roles.dto';
import {
  ResponseApi,
  responseBadRequest,
  responseConflict,
  responseCreated,
  responseInternalServerError,
  responseNotFound,
  responseOk,
} from '@/common/utils/response-api';
import {
  hasRoleQuerySchema,
  hasRoleSchema,
} from '@/api/has-roles/has-roles.schema';
import { metaPagination, zodErrorParse } from '@/common/utils/lib';

import { HasRoleRepository } from './has-roles.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HasRolesService {
  constructor(private readonly hasRoleRepo: HasRoleRepository) {}

  async index(query: HasRoleQueryDto): Promise<ResponseApi> {
    try {
      const parsed = hasRoleQuerySchema.parse(query);
      const { data, total } = await this.hasRoleRepo.findAll(parsed);
      const meta = metaPagination({
        page: parsed.page,
        limit: parsed.limit,
        total,
      });
      return responseOk({ data: { has_roles: data, meta } });
    } catch (e) {
      const zodErr = zodErrorParse(e);
      if (zodErr.isError) return responseBadRequest({ error: zodErr.errors });
      return responseInternalServerError({
        message: e.message || 'Internal Server Error',
      });
    }
  }

  async show(id: string): Promise<ResponseApi> {
    try {
      const hasRoleUser = await this.hasRoleRepo.findById(id);
      if (!hasRoleUser)
        return responseNotFound({ message: 'Role does not exist' });
      return responseOk({ data: hasRoleUser });
    } catch (e) {
      return responseInternalServerError({
        message: e.message || 'Oops! Something went wrong',
      });
    }
  }

  async store(data: HasRoleDto): Promise<ResponseApi> {
    try {
      const parsed = hasRoleSchema.parse(data);
      const checkDuplicate = await this.hasRoleRepo.findHasRoleUser(
        parsed.role_id,
        parsed.user_id,
      );
      if (checkDuplicate)
        return responseConflict({ message: 'Role already exists' });
      const newHasRole = await this.hasRoleRepo.store(parsed);
      return responseCreated({ data: newHasRole });
    } catch (error) {
      const zodErr = zodErrorParse(error);
      if (zodErr.isError) return responseBadRequest({ error: zodErr.errors });
      return responseInternalServerError({
        message: error.message || 'Internal Server Error',
      });
    }
  }

  async update(id: string, data: HasRoleDto): Promise<ResponseApi> {
    try {
      const parsed = hasRoleSchema.parse(data);
      const [existing, duplicate] = await Promise.all([
        await this.hasRoleRepo.findById(id),
        this.hasRoleRepo.findHasRoleUser(parsed.role_id, parsed.user_id),
      ]);
      if (!existing)
        return responseNotFound({ message: 'Role does not exist' });
      if (duplicate && duplicate.id !== existing.id)
        return responseConflict({ message: 'Role already exist' });
      const updatedData = await this.hasRoleRepo.update(id, parsed);
      return responseOk({ data: updatedData });
    } catch (e) {
      const zodErr = zodErrorParse(e);
      if (zodErr.isError) return responseBadRequest({ error: zodErr.errors });
      return responseInternalServerError({
        message: e?.message || 'Internal Server Error',
      });
    }
  }

  async destroy(id: string): Promise<ResponseApi> {
    try {
      const existing = await this.hasRoleRepo.findById(id);
      if (!existing)
        return responseNotFound({ message: 'Role does not exist' });
      await this.hasRoleRepo.destroy(id);
      return responseOk({ message: 'Role deleted successfully' });
    } catch (error) {
      return responseInternalServerError({
        message: error.message || 'Internal Server Error',
      });
    }
  }
}
