import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesEntity } from '@/database/entity/roles.entity';
import { RolesRepository } from './roles.repository';
import { RolesService } from './roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RolesEntity])],
  controllers: [RolesController],
  providers: [RolesService, RolesRepository],
})
export class RolesModule {}
