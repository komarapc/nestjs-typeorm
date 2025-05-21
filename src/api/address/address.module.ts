import { AddressController } from './address.controller';
import { AddressEntity } from '@/database/entity/address.entity';
import { AddressProvincesEntity } from '@/database/entity/address-province.entity';
import { AddressRegencyEntity } from '@/database/entity/address-regency.entity';
import { AddressRepository } from './address.repository';
import { AddressService } from './address.service';
import { AddressSubdistrictEntity } from '@/database/entity/address-subdistrict.entity';
import { AddressVillagesEntity } from '@/database/entity/address-villages.entity';
import { CacheRequestService } from '@/common/services/cache-request/cache-request.service';
import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PermissionsEntity } from '@/database/entity/permissions.entity';
import { PermissionsRepository } from '../permissions/permissions.repository';
import { ProvincesRepository } from '../admininstrative-area/provinces/provinces.repository';
import { RegenciesRepository } from '../admininstrative-area/regencies/regencies.repository';
import { SubdistrictsRepository } from '../admininstrative-area/subdistricts/subdistricts.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VillagesRepository } from '../admininstrative-area/villages/villages.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PermissionsEntity,
      AddressEntity,
      AddressProvincesEntity,
      AddressRegencyEntity,
      AddressSubdistrictEntity,
      AddressVillagesEntity,
    ]),
  ],
  controllers: [AddressController],
  providers: [
    JwtService,
    CacheRequestService,
    AddressService,
    AddressRepository,
    ProvincesRepository,
    RegenciesRepository,
    SubdistrictsRepository,
    VillagesRepository,
    PermissionsRepository,
  ],
})
export class AddressModule {}
