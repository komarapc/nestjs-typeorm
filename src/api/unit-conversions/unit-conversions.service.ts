import { CacheRequestService } from '@/common/services/cache-request/cache-request.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { UnitConversionRepository } from './unit-conversions.repository';
import { UnitItemsRepository } from '../unit-items/unit-items.repository';
import {
  UnitConversionDto,
  UnitConversionQueryDto,
} from './unit-conversions.dto';
import { getErrorResponse, Meta, metaPagination } from '@/common/utils/lib';
import {
  unitConversionQuerySchema,
  unitConversionsSchema,
} from './unit-conversions.schema';
import { UnitConversionEntity } from '@/database/entity/unit-conversion.entity';
import {
  responseConflict,
  responseCreated,
  responseNotFound,
  responseOk,
} from '@/common/utils/response-api';
import { seconds } from '@nestjs/throttler';

type DataCache = {
  unit_conversion: UnitConversionEntity[];
  meta: Meta;
};
@Injectable()
export class UnitConversionsService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly cacheKey: CacheRequestService,
    private readonly unitConversionRepo: UnitConversionRepository,
    private readonly unitItemsRepo: UnitItemsRepository,
  ) {}

  async findAll(query: UnitConversionQueryDto) {
    try {
      const parsed = unitConversionQuerySchema.parse(query);
      const key = this.cacheKey.getCacheKey();

      // Try to get from cache
      const cached = await this.cacheManager.get<DataCache>(key);
      if (cached) return responseOk({ data: cached });

      // Fetch from DB only if not cached
      const { data: unitConversions, total } =
        await this.unitConversionRepo.findAll(parsed);

      // If nothing found, avoid unnecessary meta calculation and caching
      if (!unitConversions || unitConversions.length === 0) {
        const emptyData: DataCache = {
          unit_conversion: [],
          meta: metaPagination({
            page: parsed.page,
            limit: parsed.limit,
            total: 0,
          }),
        };
        await this.cacheManager.set(key, emptyData, seconds(60));
        return responseOk({ data: emptyData });
      }

      // Only calculate meta and cache if data exists
      const meta = metaPagination({
        page: parsed.page,
        limit: parsed.limit,
        total,
      });
      const data: DataCache = { unit_conversion: unitConversions, meta };
      await this.cacheManager.set(key, data, seconds(60));
      return responseOk({ data });
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  async findOne(id: string) {
    try {
      const key = this.cacheKey.getCacheKey();
      let data = await this.cacheManager.get<UnitConversionEntity>(key);
      if (data) return responseOk({ data });
      data = await this.unitConversionRepo.findOneById(id);
      if (!data)
        return responseNotFound({ message: 'Unit conversion not found' });
      await this.cacheManager.set(key, data, seconds(60));
      return responseOk({ data });
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  async store(data: UnitConversionDto) {
    try {
      const parsed = unitConversionsSchema.parse(data);
      const [unitItemFrom, unitItemTo, existing] = await Promise.all([
        this.unitItemsRepo.findOneById(parsed.from_unit_id),
        this.unitItemsRepo.findOneById(parsed.to_unit_id),
        this.unitConversionRepo.findOneByUnitIds(
          parsed.from_unit_id,
          parsed.to_unit_id,
        ),
      ]);
      if (!unitItemFrom || !unitItemTo)
        return responseNotFound({ message: 'Unit item not found' });
      if (existing)
        return responseConflict({ message: 'Unit conversion already exists' });
      const unitConversion = await this.unitConversionRepo.store(parsed);
      return responseCreated({ data: unitConversion });
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  async update(id: string, data: UnitConversionDto) {
    try {
      const parsed = unitConversionsSchema.parse(data);
      const [unitConversion, unitItemFrom, unitItemTo, existing] =
        await Promise.all([
          this.unitConversionRepo.findOneById(id),
          this.unitItemsRepo.findOneById(parsed.from_unit_id),
          this.unitItemsRepo.findOneById(parsed.to_unit_id),
          this.unitConversionRepo.findOneByUnitIds(
            parsed.from_unit_id,
            parsed.to_unit_id,
          ),
        ]);
      if (!unitConversion)
        return responseNotFound({ message: 'Unit conversion not found' });
      if (!unitItemFrom || !unitItemTo)
        return responseNotFound({ message: 'Unit item not found' });
      if (existing && existing.id !== id)
        return responseConflict({ message: 'Unit conversion already exists' });
      const updatedUnitConversion = await this.unitConversionRepo.update(
        id,
        parsed,
      );
      return responseOk({ data: updatedUnitConversion });
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  async destroy(id: string) {
    try {
      const unitConversion = await this.unitConversionRepo.findOneById(id);
      if (!unitConversion)
        return responseNotFound({ message: 'Unit conversion not found' });
      await this.unitConversionRepo.destroy(id);
      return responseOk({ message: 'Unit conversion deleted successfully' });
    } catch (error) {
      return getErrorResponse(error);
    }
  }
}
