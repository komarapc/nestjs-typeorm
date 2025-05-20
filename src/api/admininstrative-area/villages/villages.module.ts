import { AddressVillagesEntity } from '@/database/entity/address-villages.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VillagesController } from './villages.controller';
import { VillagesRepository } from './villages.repository';
import { VillagesService } from './villages.service';

@Module({
  imports: [TypeOrmModule.forFeature([AddressVillagesEntity])],
  controllers: [VillagesController],
  providers: [VillagesService, VillagesRepository],
})
export class VillagesModule {}
