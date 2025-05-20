import { AddressRegencyEntity } from '@/database/entity/address-regency.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { RegencyQuerySchema, RegencySchema } from './regencies.schema';
import { generateId } from '@/common/utils/lib';

@Injectable()
export class RegenciesRepository {
  constructor(
    @InjectRepository(AddressRegencyEntity)
    private readonly repo: Repository<AddressRegencyEntity>,
  ) {}

  async findAll(query: RegencyQuerySchema) {
    const { province_code, name, code, limit, page } = query;
    const offset = (page - 1) * limit;
    const where: FindOptionsWhere<AddressRegencyEntity> = {};
    if (province_code) where.province_code = ILike(`%${province_code}%`);
    if (name) where.name = ILike(`%${name}%`);
    if (code) where.code = ILike(`%${code}%`);
    const [data, total] = await this.repo.findAndCount({
      where,
      order: { name: 'ASC' },
      cache: true,
      take: limit,
      skip: offset,
      relations: { province: true },
    });
    return { data, total };
  }

  async findByCode(code: string) {
    return await this.repo.findOne({
      where: { code },
      relationLoadStrategy: 'join',
      relations: { province: true },
    });
  }

  async findById(id: string): Promise<AddressRegencyEntity | null> {
    return await this.repo.findOne({
      where: { id },
      relationLoadStrategy: 'join',
      relations: { province: true },
    });
  }

  async store(data: RegencySchema) {
    const id = generateId();
    const regency = this.repo.create({ id, ...data });
    return await this.repo.save(regency);
  }
  async update(id: string, data: RegencySchema) {
    const update = await this.repo.update(id, data);
    if (!update.affected) return null;
    return await this.findById(id);
  }
  async destroy(id: string) {
    return await this.repo.softDelete({ id });
  }
}
