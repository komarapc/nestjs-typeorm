import { UnitItemsEntity } from '@/database/entity/unit-items.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { UnitItemQuerySchema, UnitItemSchema } from './unit-items.schema';
import { generateId } from '@/common/utils/lib';

@Injectable()
export class UnitItemsRepository {
  constructor(
    @InjectRepository(UnitItemsEntity)
    private readonly repository: Repository<UnitItemsEntity>,
  ) {}

  async findAll(query: UnitItemQuerySchema) {
    const { limit, page, name, abbreviation } = query;
    const offset = (page - 1) * limit;
    const where: FindOptionsWhere<UnitItemsEntity> = {};
    if (name) where.name = ILike(`%${name}%`);
    if (abbreviation) where.abbreviation = ILike(`%${abbreviation}%`);
    const [data, total] = await this.repository.findAndCount({
      where,
      skip: offset,
      take: limit,
      order: { name: 'ASC' },
    });
    return { data, total };
  }

  async findOneById(id: string) {
    return await this.repository.findOne({ where: { id } });
  }

  async store(data: UnitItemSchema) {
    const id = generateId();
    const unitItem = this.repository.create({ ...data, id });
    return await this.repository.save(unitItem);
  }

  async update(id: string, data: UnitItemSchema) {
    const unitItem = await this.repository.update(id, data);
    if (!unitItem.affected) return null;
    return await this.findOneById(id);
  }

  async destroy(id: string) {
    return await this.repository.softDelete(id);
  }
}
