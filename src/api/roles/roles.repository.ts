import { RolesEntity } from '@/entity/roles.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolesSchema } from './roles.schema';
import { generateId } from '@/utils/lib';

@Injectable()
export class RolesRepository {
  constructor(
    @InjectRepository(RolesEntity)
    private readonly repo: Repository<RolesEntity>,
  ) {}

  async store(data: RolesSchema) {
    try {
      const id = generateId();
      const newRole = this.repo.create({
        id,
        code: data.code,
        name: data.name,
      });
      const savedRole = await this.repo.save(newRole);
      return savedRole;
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string) {
    try {
      return await this.repo.findOne({ where: { id } });
    } catch (error) {
      throw error;
    }
  }
  async findByCode(code: string) {
    try {
      return await this.repo.findOne({ where: { code } });
    } catch (error) {
      throw error;
    }
  }
}
