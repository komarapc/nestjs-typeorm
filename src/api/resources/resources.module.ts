import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PermissionsEntity } from '@/database/entity/permissions.entity';
import { PermissionsRepository } from '../permissions/permissions.repository';
import { ResourceEntity } from '@/database/entity/resources.entity';
import { ResourceRepository } from './resources.repository';
import { ResourcesController } from './resources.controller';
import { ResourcesService } from './resources.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ResourceEntity, PermissionsEntity])],
  controllers: [ResourcesController],
  providers: [
    JwtService,
    ResourcesService,
    ResourceRepository,
    PermissionsRepository,
  ],
})
export class ResourcesModule {}
