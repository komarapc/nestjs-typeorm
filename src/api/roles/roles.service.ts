import { RolesDto, RolesQueryDto } from './roles.dto';
import { metaPagination, zodErrorParse } from '@/common/utils/lib';
import {
  responseBadRequest,
  responseConflict,
  responseCreated,
  responseInternalServerError,
  responseOk,
} from '@/common/utils/response-api';
import { rolesQuerySchema, rolesSchema } from './roles.schema';

import { Injectable } from '@nestjs/common';
import { RolesRepository } from './roles.repository';

@Injectable()
export class RolesService {
  constructor(private readonly rolesRepo: RolesRepository) {}

  async index(query: RolesQueryDto) {
    try {
      const parsed = rolesQuerySchema.parse(query);
      const { data, total } = await this.rolesRepo.findAll(parsed);
      const meta = metaPagination({
        limit: parsed.limit,
        page: parsed.page,
        total,
      });
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
      const role = await this.rolesRepo.findById(id);
      if (!role) return responseBadRequest({ message: 'Role not found' });
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
