import {
  responseBadRequest,
  responseConflict,
  responseCreated,
  responseInternalServerError,
  responseOk,
} from '@/utils/response-api';

import { Injectable } from '@nestjs/common';
import { RolesDto } from './roles.dto';
import { RolesRepository } from './roles.repository';
import { rolesSchema } from './roles.schema';
import { zodErrorParse } from '@/utils/lib';

@Injectable()
export class RolesService {
  constructor(private readonly rolesRepo: RolesRepository) {}

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
}
