import { generateId } from '@/common/utils/lib';
import { UnitConversionEntity } from '@/database/entity/unit-conversion.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, FindOptionsWhere, Repository } from 'typeorm';
import {
  UnitConversionQuerySchema,
  UnitConversionsSchema,
} from './unit-conversions.schema';

@Injectable()
export class UnitConversionRepository {
  constructor(
    @InjectRepository(UnitConversionEntity)
    private readonly repository: Repository<UnitConversionEntity>,
  ) {}

  async findAll(query: UnitConversionQuerySchema) {
    const { from_unit_id, to_unit_id, page, limit } = query;
    const offset = (page - 1) * limit;
    const where: FindOptionsWhere<UnitConversionEntity> = {};
    if (from_unit_id) where.from_unit_id = Equal(from_unit_id);
    if (to_unit_id) where.to_unit_id = Equal(to_unit_id);
    const [data, total] = await this.repository.findAndCount({
      where,
      relationLoadStrategy: 'join',
      relations: { from_unit: true, to_unit: true },
      take: limit,
      skip: offset,
      order: { id: 'DESC' },
    });
    return { data, total };
  }

  async findOneById(id: string) {
    return await this.repository.findOne({
      where: { id },
      relationLoadStrategy: 'join',
      relations: { from_unit: true, to_unit: true },
    });
  }

  async findOneByUnitIds(from_unit_id: string, to_unit_id: string) {
    return await this.repository.findOne({
      where: { from_unit_id, to_unit_id },
      relationLoadStrategy: 'join',
      relations: { from_unit: true, to_unit: true },
    });
  }

  async store(data: UnitConversionsSchema) {
    const { from_unit_id, to_unit_id, conversion_factor } = data;
    const id = generateId();
    const unitConversion = this.repository.create({
      id,
      from_unit_id,
      to_unit_id,
      conversion_factor,
    });
    return await this.repository.save(unitConversion);
  }

  async update(id: string, data: UnitConversionsSchema) {
    const { from_unit_id, to_unit_id, conversion_factor } = data;
    const updatedUnitConversion = await this.repository.update(id, {
      from_unit_id,
      to_unit_id,
      conversion_factor,
    });
    if (!updatedUnitConversion.affected) return null;
    return await this.findOneById(id);
  }

  async destroy(id: string) {
    return await this.repository.softDelete(id);
  }
}
