import {
  Action,
  PermissionsEntity,
} from '@/database/entity/permissions.entity';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  PermissionsCreateSchema,
  PermissionsQuerySchema,
} from './permissions.schema';
import { generateId } from '@/common/utils/lib';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { seconds } from '@nestjs/throttler';

@Injectable()
export class PermissionsRepository {
  constructor(
    @InjectRepository(PermissionsEntity)
    private readonly repository: Repository<PermissionsEntity>,
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
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

  async findByRoleId(role_id: string) {
    const chacheKey = `permissions:role:${role_id}`;
    const cacheData = await this.cache.get<PermissionsEntity[]>(chacheKey);
    if (cacheData?.length) return cacheData;
    const data = await this.repository.find({
      where: { role_id },
      relationLoadStrategy: 'join',
      relations: { resource: true },
    });
    if (!data?.length) return [];
    await this.cache.set(chacheKey, data, seconds(30));
    return data;
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
      return this.repository.findOne({
        where: { id },
        relationLoadStrategy: 'join',
        relations: { role: true, resource: true },
      });
    } catch (error) {
      throw error;
    }
  }

  async destroy(id: string) {
    return !!(await this.repository.softDelete(id)).affected;
  }
}
