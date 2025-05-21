import { AddressRegencyEntity } from '@/database/entity/address-regency.entity';
import { AddressSubdistrictEntity } from '@/database/entity/address-subdistrict.entity';
import { CacheRequestService } from '@/common/services/cache-request/cache-request.service';
import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PermissionsEntity } from '@/database/entity/permissions.entity';
import { PermissionsRepository } from '@/api/permissions/permissions.repository';
import { RegenciesRepository } from '../regencies/regencies.repository';
import { SubdistrictsController } from './subdistricts.controller';
import { SubdistrictsRepository } from './subdistricts.repository';
import { SubdistrictsService } from './subdistricts.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PermissionsEntity,
      AddressRegencyEntity,
      AddressSubdistrictEntity,
    ]),
  ],
  controllers: [SubdistrictsController],
  providers: [
    JwtService,
    CacheRequestService,
    SubdistrictsService,
    PermissionsRepository,
    RegenciesRepository,
    SubdistrictsRepository,
  ],
})
export class SubdistrictsModule {}
