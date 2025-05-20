import { AddressRegencyEntity } from '@/database/entity/address-regency.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RegenciesRepository {
  constructor(
    @InjectRepository(AddressRegencyEntity)
    private readonly repo: Repository<AddressRegencyEntity>,
  ) {}

  async findById(id: string): Promise<AddressRegencyEntity | null> {
    return await this.repo.findOne({
      where: { id },
      relationLoadStrategy: 'join',
      relations: { province: true },
    });
  }
}
