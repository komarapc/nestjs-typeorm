import { HasRoleRepository } from './has-roles.repository';
import { HasRolesController } from './has-roles.controller';
import { HasRolesEntity } from '@/database/entity/has-roles.entity';
import { HasRolesService } from './has-roles.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([HasRolesEntity])],
  controllers: [HasRolesController],
  providers: [HasRolesService, HasRoleRepository],
})
export class HasRolesModule {}
