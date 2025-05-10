import { Module } from '@nestjs/common';
import { PermissionsController } from './permissions.controller';
import { PermissionsEntity } from '@/database/entity/permissions.entity';
import { PermissionsRepository } from './permissions.repository';
import { PermissionsService } from './permissions.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionsEntity])],
  controllers: [PermissionsController],
  providers: [PermissionsService, PermissionsRepository],
})
export class PermissionsModule {}
