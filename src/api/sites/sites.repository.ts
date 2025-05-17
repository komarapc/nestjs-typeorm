import { SitesEntity } from '@/database/entity/sites.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { SitesQuerySchema, SitesSchema } from './sites.schema';
import { generateId, zodErrorParse } from '@/common/utils/lib';

@Injectable()
export class SitesRepository {
  constructor(
    @InjectRepository(SitesEntity)
    private readonly repo: Repository<SitesEntity>,
  ) {}

  async findAll(query: SitesQuerySchema) {
    const { name, page, limit } = query;
    const offset = (page - 1) * limit;
    const where: FindOptionsWhere<SitesEntity> = {};
    if (name) where.name = ILike(`%${name}%`);
    const [data, total] = await this.repo.findAndCount({
      where,
      take: limit,
      skip: offset,
    });
    return { data, total };
  }

  async findOne(id: string) {
    return await this.repo.findOne({ where: { id } });
  }

  async store(data: SitesSchema) {
    const id = generateId();
    const site = this.repo.create({
      id,
      ...data,
    });
    return this.repo.save(site);
  }

  async update(id: string, data: SitesSchema) {
    const site = await this.repo.update(id, { name: data.name });
    return await this.findOne(id);
  }

  async destroy(id: string) {
    return await this.repo.softDelete(id);
  }
}
