import { AddressVillagesEntity } from '@/database/entity/address-villages.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class VillagesRepository {
  constructor(
    @InjectRepository(AddressVillagesEntity)
    private readonly repo: Repository<AddressVillagesEntity>,
  ) {}

  async findById(id: string): Promise<AddressVillagesEntity | null> {
    return await this.repo.findOne({
      where: { id },
      relationLoadStrategy: 'join',
      relations: { subdistrict: true },
    });
  }
}
