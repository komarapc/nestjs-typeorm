import {
  responseInternalServerError,
  responseNotFound,
  responseOk,
} from '@/common/utils/response-api';

import { Injectable } from '@nestjs/common';
import { VillagesRepository } from './villages.repository';

@Injectable()
export class VillagesService {
  constructor(private readonly repo: VillagesRepository) {}

  async findById(id: string) {
    try {
      const village = await this.repo.findById(id);
      if (!village) return responseNotFound({ message: 'Village not found' });
      return responseOk({ data: village });
    } catch (error) {
      const message = error.message || 'Internal Server Error';
      return responseInternalServerError({ message });
    }
  }
}
