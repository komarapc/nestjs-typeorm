import { ResourceEntity } from '@/database/entity/resources.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import {
  ResourcesCreateSchema,
  ResourcesQuerySchema,
} from './resources.schema';
import { generateId } from '@/common/utils/lib';

@Injectable()
export class ResourceRepository {
  constructor(
    @InjectRepository(ResourceEntity)
    private readonly repository: Repository<ResourceEntity>,
  ) {}

  async findAll(query: ResourcesQuerySchema) {
    const { name, path, page, limit } = query;
    const skip = (page - 1) * limit;
    const take = limit;

    // Build dynamic where clause
    const where: FindOptionsWhere<ResourceEntity> = {};
    if (name) where.name = ILike(`%${name}%`);
    if (path) where.path = ILike(`%${path}%`);

    // Fetch data and total count
    const [data, total] = await this.repository.findAndCount({
      where,
      skip,
      take,
    });

    return { data, total };
  }

  async store(data: ResourcesCreateSchema) {
    try {
      const id = generateId();
      const resource = this.repository.create({
        ...data,
        id,
      });
      const result = await this.repository.save(resource);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
