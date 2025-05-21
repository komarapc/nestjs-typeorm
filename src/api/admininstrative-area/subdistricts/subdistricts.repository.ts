import { AddressSubdistrictEntity } from '@/database/entity/address-subdistrict.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import {
  SubdistrictQuerySchema,
  SubdistrictSchema,
} from './subdistricts.schema';
import { generateId } from '@/common/utils/lib';

@Injectable()
export class SubdistrictsRepository {
  constructor(
    @InjectRepository(AddressSubdistrictEntity)
    private readonly repo: Repository<AddressSubdistrictEntity>,
  ) {}

  async findAll(query: SubdistrictQuerySchema) {
    const { regency_code, code, name, page, limit } = query;
    const offset = (page - 1) * limit;
    const where: FindOptionsWhere<AddressSubdistrictEntity> = {};
    if (regency_code) where.regency_code = ILike(`%${regency_code}%`);
    if (code) where.code = ILike(`%${code}%`);
    if (name) where.name = ILike(`%${name}%`);
    const [data, total] = await this.repo.findAndCount({
      where,
      relationLoadStrategy: 'join',
      relations: { regency: true },
      skip: offset,
      take: limit,
      order: { name: 'ASC' },
    });
    return { data, total };
  }

  async findById(id: string) {
    return await this.repo.findOne({
      where: { id },
      relationLoadStrategy: 'join',
      relations: { regency: true },
    });
  }

  async findByCode(code: string) {
    return await this.repo.findOne({
      where: { code },
      relationLoadStrategy: 'join',
      relations: { regency: true },
    });
  }

  async store(data: SubdistrictSchema) {
    const id = generateId();
    const subdistrict = this.repo.create({ id, ...data });
    return await this.repo.save(subdistrict);
  }

  async update(id: string, data: SubdistrictSchema) {
    const updated = await this.repo.update({ id }, data);
    if (!updated.affected) return null;
    return await this.findById(id);
  }

  async destroy(id: string) {
    return await this.repo.softDelete({ id });
  }
}
