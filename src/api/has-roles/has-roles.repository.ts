import { HasRolesEntity } from '@/database/entity/has-roles.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  HasRoleQuerySchema,
  HasRoleSchema,
} from '@/api/has-roles/has-roles.schema';
import { generateId } from '@/common/utils/lib';

@Injectable()
export class HasRoleRepository {
  constructor(
    @InjectRepository(HasRolesEntity)
    private readonly repository: Repository<HasRolesEntity>,
  ) {}

  async findAll(query: HasRoleQuerySchema) {
    const { user_id, page, limit } = query;
    const offset = (page - 1) * limit;
    const [data, total] = await this.repository.findAndCount({
      where: { user_id },
      relationLoadStrategy: 'join',
      relations: {
        role: true,
      },
      select: {
        id: true,
        created_at: true,
        updated_at: true,
        role: {
          id: true,
          name: true,
        },
      },
      take: limit,
      skip: offset,
    });
    return { data, total };
  }

  async findById(id: string): Promise<HasRolesEntity | null> {
    return await this.repository.findOne({
      where: { id },
      relationLoadStrategy: 'join',
      relations: { role: true, user: true },
      select: {
        id: true,
        created_at: true,
        updated_at: true,
        role: {
          id: true,
          name: true,
        },
        user: {
          id: true,
          name: true,
        },
      },
    });
  }

  async findHasRoleUser(role_id: string, user_id: string) {
    return await this.repository.findOne({ where: { role_id, user_id } });
  }

  async store(data: HasRoleSchema) {
    try {
      const id = generateId();
      const hasRole = this.repository.create({ ...data, id });
      await this.repository.save(hasRole);
      return hasRole;
    } catch (e) {
      throw e;
    }
  }

  async update(id: string, data: HasRoleSchema) {
    const { role_id, user_id } = data;
    const updated = await this.repository.update(id, { role_id, user_id });
    return await this.findById(id);
  }

  async destroy(id: string) {
    try {
      return await this.repository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
