import { CacheRequestService } from '@/common/services/cache-request/cache-request.service';
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
    CacheRequestService,
    ResourcesService,
    ResourceRepository,
    PermissionsRepository,
  ],
})
export class ResourcesModule {}
