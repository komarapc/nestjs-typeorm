import { LocationsEntity } from '@/database/entity/locations.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { LocationQuerySchema, LocationsSchema } from './locations.schema';
import { generateId } from '@/common/utils/lib';

@Injectable()
export class LocationsRepository {
  constructor(
    @InjectRepository(LocationsEntity)
    private readonly repo: Repository<LocationsEntity>,
  ) {}

  async store(data: LocationsSchema) {
    const id = generateId();
    const location = this.repo.create({
      id,
      ...data,
    });
    return await this.repo.save(location);
  }

  async findById(id: string) {
    return await this.repo.findOne({
      where: { id },
      relationLoadStrategy: 'join',
      relations: { site: true, parent: true },
    });
  }

  async findAll(query: LocationQuerySchema) {
    const { name, page, limit } = query;
    const skip = (page - 1) * limit;
    const where: FindOptionsWhere<LocationsEntity> = {};
    if (name) where.name = ILike(`%${name}%`);
    const [data, total] = await this.repo.findAndCount({
      where,
      relationLoadStrategy: 'join',
      relations: { site: true, parent: true },
      skip,
      take: limit,
    });
    return { data, total };
  }

  async update(id: string, data: LocationsSchema) {
    const { name, site_id, description, parent_id } = data;
    await this.repo.update(id, { name, site_id, description, parent_id });
    return await this.repo.findOne({ where: { id } });
  }

  async destroy(id: string) {
    const deleted = await this.repo.softDelete(id);
    return !!deleted.affected;
  }
}
