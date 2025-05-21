import { CacheRequestService } from '@/common/services/cache-request/cache-request.service';
import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PermissionsEntity } from '@/database/entity/permissions.entity';
import { PermissionsRepository } from '../permissions/permissions.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitItemsController } from './unit-items.controller';
import { UnitItemsEntity } from '@/database/entity/unit-items.entity';
import { UnitItemsRepository } from './unit-items.repository';
import { UnitItemsService } from './unit-items.service';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionsEntity, UnitItemsEntity])],
  controllers: [UnitItemsController],
  providers: [
    JwtService,
    CacheRequestService,
    UnitItemsService,
    PermissionsRepository,
    UnitItemsRepository,
  ],
})
export class UnitItemsModule {}
