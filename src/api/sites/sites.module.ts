import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PermissionsEntity } from '@/database/entity/permissions.entity';
import { PermissionsRepository } from '../permissions/permissions.repository';
import { SitesController } from './sites.controller';
import { SitesEntity } from '@/database/entity/sites.entity';
import { SitesRepository } from './sites.repository';
import { SitesService } from './sites.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SitesEntity, PermissionsEntity])],
  controllers: [SitesController],
  providers: [JwtService, SitesService, SitesRepository, PermissionsRepository],
})
export class SitesModule {}
