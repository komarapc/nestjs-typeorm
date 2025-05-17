import { SitesEntity } from '@/database/entity/sites.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SitesSchema } from './sites.schema';
import { generateId } from '@/common/utils/lib';

@Injectable()
export class SitesRepository {
  constructor(
    @InjectRepository(SitesEntity)
    private readonly repo: Repository<SitesEntity>,
  ) {}

  async store(data: SitesSchema) {
    const id = generateId();
    const site = this.repo.create({
      id,
      ...data,
    });
    return this.repo.save(site);
  }
}
