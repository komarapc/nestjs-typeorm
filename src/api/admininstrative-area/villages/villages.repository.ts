import { AddressVillagesEntity } from '@/database/entity/address-villages.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, FindOptionsWhere, ILike, Repository } from 'typeorm';
import { VillagesQuerySchema, VillagesSchema } from './villages.schema';
import { generateId } from '@/common/utils/lib';

@Injectable()
export class VillagesRepository {
  constructor(
    @InjectRepository(AddressVillagesEntity)
    private readonly repo: Repository<AddressVillagesEntity>,
  ) {}

  async findAll(query: VillagesQuerySchema) {
    const { subdistrict_code, code, name, limit, page } = query;
    const offset = (page - 1) * limit;
    const where: FindOptionsWhere<AddressVillagesEntity> = {};
    if (subdistrict_code) where.subdistrict_code = Equal(subdistrict_code);
    if (code) where.code = Equal(code);
    if (name) where.name = ILike(`%${name}%`);
    const [data, total] = await this.repo.findAndCount({
      where,
      relationLoadStrategy: 'join',
      relations: { subdistrict: true },
      take: limit,
      skip: offset,
      order: { name: 'ASC' },
    });
    return { data, total };
  }

  async findById(id: string): Promise<AddressVillagesEntity | null> {
    return await this.repo.findOne({
      where: { id },
      relationLoadStrategy: 'join',
      relations: { subdistrict: true },
    });
  }

  async findByCode(code: string) {
    return await this.repo.findOne({
      where: { code },
      relationLoadStrategy: 'join',
      relations: { subdistrict: true },
    });
  }

  async store(data: VillagesSchema) {
    const id = generateId();
    const villages = this.repo.create({ id, ...data });
    return await this.repo.save(villages);
  }

  async update(id: string, data: VillagesSchema) {
    const { subdistrict_code, code, name } = data;
    const villages = await this.repo.update(id, {
      subdistrict_code,
      name,
      code,
    });
    if (!villages.affected) return null;
    return await this.findById(id);
  }

  async destroy(id: string) {
    return await this.repo.softDelete({ id });
  }
}
