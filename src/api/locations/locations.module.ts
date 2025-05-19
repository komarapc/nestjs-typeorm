import { CacheRequestService } from '@/common/services/cache-request/cache-request.service';
import { JwtService } from '@nestjs/jwt';
import { LocationsController } from './locations.controller';
import { LocationsEntity } from '@/database/entity/locations.entity';
import { LocationsRepository } from './locations.repository';
import { LocationsService } from './locations.service';
import { Module } from '@nestjs/common';
import { PermissionsEntity } from '@/database/entity/permissions.entity';
import { PermissionsRepository } from '../permissions/permissions.repository';
import { SitesEntity } from '@/database/entity/sites.entity';
import { SitesRepository } from '../sites/sites.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([LocationsEntity, PermissionsEntity, SitesEntity]),
  ],
  controllers: [LocationsController],
  providers: [
    JwtService,
    CacheRequestService,
    LocationsService,
    LocationsRepository,
    PermissionsRepository,
    SitesRepository,
  ],
})
export class LocationsModule {}
