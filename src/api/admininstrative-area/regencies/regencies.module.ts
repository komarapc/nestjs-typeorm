import { AddressProvincesEntity } from '@/database/entity/address-province.entity';
import { AddressRegencyEntity } from '@/database/entity/address-regency.entity';
import { CacheRequestService } from '@/common/services/cache-request/cache-request.service';
import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PermissionsEntity } from '@/database/entity/permissions.entity';
import { PermissionsRepository } from '@/api/permissions/permissions.repository';
import { ProvincesRepository } from '../provinces/provinces.repository';
import { RegenciesController } from './regencies.controller';
import { RegenciesRepository } from './regencies.repository';
import { RegenciesService } from './regencies.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AddressRegencyEntity,
      PermissionsEntity,
      AddressProvincesEntity,
    ]),
  ],
  controllers: [RegenciesController],
  providers: [
    JwtService,
    CacheRequestService,
    RegenciesService,
    RegenciesRepository,
    PermissionsRepository,
    ProvincesRepository,
  ],
})
export class RegenciesModule {}
