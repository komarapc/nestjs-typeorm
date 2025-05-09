import { Module } from '@nestjs/common';
import { ResourceEntity } from '@/entity/resources.entity';
import { ResourceRepository } from './resources.repository';
import { ResourcesController } from './resources.controller';
import { ResourcesService } from './resources.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ResourceEntity])],
  controllers: [ResourcesController],
  providers: [ResourcesService, ResourceRepository],
})
export class ResourcesModule {}
