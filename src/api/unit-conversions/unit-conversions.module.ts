import { CacheRequestService } from '@/common/services/cache-request/cache-request.service';
import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PermissionsEntity } from '@/database/entity/permissions.entity';
import { PermissionsRepository } from '../permissions/permissions.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitConversionEntity } from '@/database/entity/unit-conversion.entity';
import { UnitConversionRepository } from './unit-conversions.repository';
import { UnitConversionsController } from './unit-conversions.controller';
import { UnitConversionsService } from './unit-conversions.service';
import { UnitItemsEntity } from '@/database/entity/unit-items.entity';
import { UnitItemsRepository } from '../unit-items/unit-items.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PermissionsEntity,
      UnitItemsEntity,
      UnitConversionEntity,
    ]),
  ],
  controllers: [UnitConversionsController],
  providers: [
    JwtService,
    CacheRequestService,
    UnitConversionsService,
    PermissionsRepository,
    UnitConversionRepository,
    UnitItemsRepository,
  ],
})
export class UnitConversionsModule {}
