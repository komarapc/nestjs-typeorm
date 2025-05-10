import { ResourceEntity } from '@/database/entity/resources.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findById(id: string) {
    return await this.repository.findOne({ where: { id } });
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

  async update(id: string, data: ResourcesCreateSchema) {
    try {
      await this.repository.update(id, data);
      return await this.findById(id);
    } catch (error) {
      throw error;
    }
  }

  async destroy(id: string) {
    try {
      const deleted = await this.repository.softDelete(id);
      if (!deleted.affected) throw new NotFoundException('Resource not found');
      return deleted;
    } catch (error) {
      throw error;
    }
  }
}
