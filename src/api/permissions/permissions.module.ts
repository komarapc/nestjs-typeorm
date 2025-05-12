import { Module } from '@nestjs/common';
import { PermissionsController } from './permissions.controller';
import { PermissionsEntity } from '@/database/entity/permissions.entity';
import { PermissionsRepository } from './permissions.repository';
import { PermissionsService } from './permissions.service';
import { ResourceEntity } from '@/database/entity/resources.entity';
import { ResourceRepository } from '../resources/resources.repository';
import { RolesEntity } from '@/database/entity/roles.entity';
import { RolesRepository } from '../roles/roles.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([PermissionsEntity, RolesEntity, ResourceEntity]),
  ],
  controllers: [PermissionsController],
  providers: [
    PermissionsService,
    PermissionsRepository,
    RolesRepository,
    ResourceRepository,
  ],
})
export class PermissionsModule {}
