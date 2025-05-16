import { HasRoleRepository } from './has-roles.repository';
import { HasRolesController } from './has-roles.controller';
import { HasRolesEntity } from '@/database/entity/has-roles.entity';
import { HasRolesService } from './has-roles.service';
import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PermissionsEntity } from '@/database/entity/permissions.entity';
import { PermissionsRepository } from '../permissions/permissions.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([HasRolesEntity, PermissionsEntity])],
  controllers: [HasRolesController],
  providers: [
    JwtService,
    HasRolesService,
    HasRoleRepository,
    PermissionsRepository,
  ],
})
export class HasRolesModule {}
