import { UnitItemsEntity } from '@/database/entity/unit-items.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UnitItemsRepository {
  constructor(
    @InjectRepository(UnitItemsEntity)
    private readonly repository: Repository<UnitItemsEntity>,
  ) {}
}
