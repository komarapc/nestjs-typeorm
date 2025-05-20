import {
  responseInternalServerError,
  responseNotFound,
  responseOk,
} from '@/common/utils/response-api';

import { Injectable } from '@nestjs/common';
import { RegenciesRepository } from './regencies.repository';

@Injectable()
export class RegenciesService {
  constructor(private readonly repo: RegenciesRepository) {}

  async findById(id: string) {
    try {
      const regency = await this.repo.findById(id);
      if (!regency) return responseNotFound({ message: 'Regency not found' });
      return responseOk({ data: regency });
    } catch (error) {
      return responseInternalServerError({
        message: error.message || 'Internal Server Error',
      });
    }
  }
}
