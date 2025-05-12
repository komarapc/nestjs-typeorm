import {
  ResponseApi,
  responseBadRequest,
  responseCreated,
  responseInternalServerError,
  responseNotFound,
  responseOk,
} from '@/common/utils/response-api';

import { Injectable } from '@nestjs/common';
import { PermissionsCreateDto } from './permissions.dto';
import { PermissionsRepository } from './permissions.repository';
import { ResourceRepository } from '../resources/resources.repository';
import { RolesRepository } from '../roles/roles.repository';
import { permissionsCreateSchema } from './permissions.schema';
import { zodErrorParse } from '@/common/utils/lib';

@Injectable()
export class PermissionsService {
  constructor(
    private readonly repo: PermissionsRepository,
    private readonly roleRepo: RolesRepository,
    private readonly resourceRepo: ResourceRepository,
  ) {}

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
      const data = await this.repo.findById(id);
      if (!data) return responseNotFound({ message: 'Permission Not Found' });
      return responseOk({ data });
    } catch (error) {
      return responseInternalServerError({
        message: error.message || 'Internal Server Error',
      });
    }
  }
}
