import { LocationQueryDto, LocationsDto } from './locations.dto';
import { locationQuerySchema, locationsSchema } from './locations.schema';
import { metaPagination, zodErrorParse } from '@/common/utils/lib';
import {
  responseBadRequest,
  responseCreated,
  responseInternalServerError,
  responseNotFound,
  responseOk,
} from '@/common/utils/response-api';

import { Injectable } from '@nestjs/common';
import { LocationsRepository } from './locations.repository';
import { SitesRepository } from '../sites/sites.repository';

@Injectable()
export class LocationsService {
  constructor(
    private readonly locationRepo: LocationsRepository,
    private readonly siteRepo: SitesRepository,
  ) {}

  async findAll(query: LocationQueryDto) {
    try {
      const parsed = locationQuerySchema.parse(query);
      const { data, total } = await this.locationRepo.findAll(parsed);
      const meta = metaPagination({
        limit: parsed.limit,
        page: parsed.page,
        total,
      });
      return responseOk({ data: { locations: data, meta } });
    } catch (error) {
      const message = error.message || 'Internal Server Error';
      const zodErr = zodErrorParse(error);
      if (zodErr.isError) return responseBadRequest({ error: zodErr.errors });
      return responseInternalServerError({ message });
    }
  }

  async store(data: LocationsDto) {
    try {
      const parsed = locationsSchema.parse(data);
      const site = await this.siteRepo.findOne(parsed.site_id);
      if (!site) return responseNotFound({ message: 'Site not found' });
      const location = await this.locationRepo.store(parsed);
      return responseCreated({ data: location });
    } catch (error) {
      const zodErr = zodErrorParse(error);
      const errMessage = error.message || 'Internal Server Error';
      if (zodErr.isError) return responseBadRequest({ error: zodErr.errors });
      return responseInternalServerError({ message: errMessage });
    }
  }

  async findOne(id: string) {
    try {
      const location = await this.locationRepo.findById(id);
      if (!location) return responseNotFound({ message: 'Location not found' });
      return responseOk({ data: location });
    } catch (error) {
      const message = error.message || 'Internal Server Error';
      return responseInternalServerError({ message });
    }
  }

  async update(id: string, data: LocationsDto) {
    try {
      const parsed = locationsSchema.parse(data);
      const [location, site] = await Promise.all([
        this.locationRepo.findById(id),
        this.siteRepo.findOne(parsed.site_id),
      ]);
      if (!location) return responseNotFound({ message: 'Location not found' });
      if (!site) return responseNotFound({ message: 'Site not found' });
      const updatedLocation = await this.locationRepo.update(id, parsed);
      return responseOk({ data: updatedLocation });
    } catch (error) {
      const message = error.message || 'Internal Server Error';
      const zodErr = zodErrorParse(error);
      if (zodErr.isError) return responseBadRequest({ error: zodErr.errors });
      return responseInternalServerError({ message });
    }
  }

  async destroy(id: string) {
    try {
      const location = await this.locationRepo.findById(id);
      if (!location) return responseNotFound({ message: 'Location not found' });
      await this.locationRepo.destroy(id);
      return responseOk({ message: 'Location deleted successfully' });
    } catch (error) {
      const message = error.message || 'Internal Server Error';
      return responseInternalServerError({ message });
    }
  }
}
