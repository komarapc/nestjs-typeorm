import { Module } from '@nestjs/common';
import { SitesController } from './sites.controller';
import { SitesEntity } from '@/database/entity/sites.entity';
import { SitesRepository } from './sites.repository';
import { SitesService } from './sites.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SitesEntity])],
  controllers: [SitesController],
  providers: [SitesService, SitesRepository],
})
export class SitesModule {}
