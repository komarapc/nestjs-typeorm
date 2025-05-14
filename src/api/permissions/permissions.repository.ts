import {
  Action,
  PermissionsEntity,
} from '@/database/entity/permissions.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  PermissionsCreateSchema,
  PermissionsQuerySchema,
} from './permissions.schema';
import { generateId } from '@/common/utils/lib';

@Injectable()
export class PermissionsRepository {
  constructor(
    @InjectRepository(PermissionsEntity)
    private readonly repository: Repository<PermissionsEntity>,
  ) {}

  async findAll(query: PermissionsQuerySchema) {
    const { role_id, page, limit } = query;
    const offset = (page - 1) * limit;
    const [data, total] = await this.repository.findAndCount({
      where: { role_id },
      relationLoadStrategy: 'join',
      relations: {
        role: true,
        resource: true,
      },
      take: limit,
      skip: offset,
      order: { created_at: 'DESC' },
    });
    return { data, total };
  }

  async findById(id: string) {
    return await this.repository.findOne({
      where: { id },
      relationLoadStrategy: 'join',
      relations: {
        role: true,
        resource: true,
      },
    });
  }

  async store(data: PermissionsCreateSchema) {
    return this.repository.save(
      this.repository.create({
        id: generateId(),
        role_id: data.role_id,
        resource_id: data.resource_id,
        action: data.action as Action[],
      }),
    );
  }

  async update(id: string, data: PermissionsCreateSchema) {
    try {
      await this.repository.update(id, {
        role_id: data.role_id,
        resource_id: data.resource_id,
        action: data.action as Action[],
      });
      return this.findById(id);
    } catch (error) {
      throw error;
    }
  }

  async destroy(id: string) {
    return !!(await this.repository.softDelete(id)).affected;
  }
}
