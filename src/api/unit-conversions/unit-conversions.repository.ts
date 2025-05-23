import { UnitConversionEntity } from '@/database/entity/unit-conversion.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UnitConversionRepository {
  constructor(
    @InjectRepository(UnitConversionEntity)
    private readonly repository: Repository<UnitConversionEntity>,
  ) {}
}
