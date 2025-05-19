import { CacheRequestService } from '@/common/services/cache-request/cache-request.service';
import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PermissionsEntity } from '@/database/entity/permissions.entity';
import { PermissionsRepository } from '../permissions/permissions.repository';
import { RolesController } from './roles.controller';
import { RolesEntity } from '@/database/entity/roles.entity';
import { RolesRepository } from './roles.repository';
import { RolesService } from './roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RolesEntity, PermissionsEntity])],
  controllers: [RolesController],
  providers: [
    JwtService,
    CacheRequestService,
    RolesService,
    RolesRepository,
    PermissionsRepository,
  ],
})
export class RolesModule {}
