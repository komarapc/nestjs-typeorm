import { AddressProvincesEntity } from '@/database/entity/address-province.entity';
import { Injectable } from '@nestjs/common';
import { seconds } from '@nestjs/throttler';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { ProvinceQuerySchema, ProvinceSchema } from './provinces.schema';
import { generateId } from '@/common/utils/lib';

@Injectable()
export class ProvincesRepository {
  constructor(
    @InjectRepository(AddressProvincesEntity)
    private readonly repo: Repository<AddressProvincesEntity>,
  ) {}

  async findAll(query: ProvinceQuerySchema) {
    const { code, name, page, limit } = query;
    const offset = (page - 1) * limit;
    const where: FindOptionsWhere<AddressProvincesEntity> = {};
    if (code) where.code = ILike(`%${code}%`);
    if (name) where.name = ILike(`%${name}%`);
    const [data, total] = await this.repo.findAndCount({
      where,
      take: limit,
      skip: offset,
      order: { name: 'ASC' },
    });
    return { data, total };
  }

  async findOneByCode(code: string): Promise<AddressProvincesEntity | null> {
    return await this.repo.findOne({ where: { code } });
  }

  async findOneById(id: string): Promise<AddressProvincesEntity | null> {
    return await this.repo.findOne({ where: { id } });
  }

  async store(data: ProvinceSchema) {
    const id = generateId();
    const newProvince = this.repo.create({
      id,
      code: data.code,
      name: data.name,
    });
    return await this.repo.save(newProvince);
  }

  async update(id: string, data: ProvinceSchema) {
    const province = await this.findOneById(id);
    if (!province) return null;
    province.code = data.code;
    province.name = data.name;
    return await this.repo.save(province);
  }

  async destroy(id: string) {
    return !!(await this.repo.softDelete({ id }));
  }
}
