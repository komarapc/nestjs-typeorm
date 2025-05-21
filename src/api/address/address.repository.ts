import { AddressEntity } from '@/database/entity/address.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddressSchema } from './address.schema';
import { generateId } from '@/common/utils/lib';

@Injectable()
export class AddressRepository {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly repo: Repository<AddressEntity>,
  ) {}

  async findByRefId(ref_id: string): Promise<AddressEntity | null> {
    return this.repo.findOne({
      where: { ref_id },
      relationLoadStrategy: 'join',
      relations: {
        province: true,
        regency: true,
        subdistrict: true,
        village: true,
      },
    });
  }

  async findById(id: string) {
    return this.repo.findOne({
      where: { id },
      relationLoadStrategy: 'join',
      relations: {
        province: true,
        regency: true,
        subdistrict: true,
        village: true,
      },
    });
  }

  async destroy(id: string) {
    return this.repo.delete({ id });
  }

  async store(data: AddressSchema) {
    const id = generateId();
    const address = this.repo.create({ id, ...data });
    return await this.repo.save(address);
  }

  async update(id: string, data: AddressSchema) {
    const address = await this.repo.update(id, data);
    if (!address.affected) return null;
    return await this.findById(id);
  }
}
