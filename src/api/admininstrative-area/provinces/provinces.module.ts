import { AddressProvincesEntity } from '@/database/entity/address-province.entity';
import { CacheRequestService } from '@/common/services/cache-request/cache-request.service';
import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PermissionsEntity } from '@/database/entity/permissions.entity';
import { PermissionsRepository } from '@/api/permissions/permissions.repository';
import { ProvincesController } from './provinces.controller';
import { ProvincesRepository } from './provinces.repository';
import { ProvincesService } from './provinces.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([PermissionsEntity, AddressProvincesEntity]),
  ],
  controllers: [ProvincesController],
  providers: [
    JwtService,
    CacheRequestService,
    ProvincesService,
    PermissionsRepository,
    ProvincesRepository,
  ],
})
export class ProvincesModule {}
