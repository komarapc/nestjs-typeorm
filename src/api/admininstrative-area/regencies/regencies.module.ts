import { AddressRegencyEntity } from '@/database/entity/address-regency.entity';
import { Module } from '@nestjs/common';
import { RegenciesController } from './regencies.controller';
import { RegenciesRepository } from './regencies.repository';
import { RegenciesService } from './regencies.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AddressRegencyEntity])],
  controllers: [RegenciesController],
  providers: [RegenciesService, RegenciesRepository],
})
export class RegenciesModule {}
