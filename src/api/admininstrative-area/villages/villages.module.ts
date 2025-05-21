import { AddressSubdistrictEntity } from '@/database/entity/address-subdistrict.entity';
import { AddressVillagesEntity } from '@/database/entity/address-villages.entity';
import { CacheRequestService } from '@/common/services/cache-request/cache-request.service';
import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PermissionsEntity } from '@/database/entity/permissions.entity';
import { PermissionsRepository } from '@/api/permissions/permissions.repository';
import { SubdistrictsRepository } from '../subdistricts/subdistricts.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VillagesController } from './villages.controller';
import { VillagesRepository } from './villages.repository';
import { VillagesService } from './villages.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AddressVillagesEntity,
      PermissionsEntity,
      AddressSubdistrictEntity,
    ]),
  ],
  controllers: [VillagesController],
  providers: [
    JwtService,
    CacheRequestService,
    VillagesService,
    VillagesRepository,
    PermissionsRepository,
    SubdistrictsRepository,
  ],
})
export class VillagesModule {}
