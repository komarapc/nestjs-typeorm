import { Module } from '@nestjs/common';
import { VillagesController } from './villages.controller';
import { VillagesService } from './villages.service';

@Module({
  controllers: [VillagesController],
  providers: [VillagesService]
})
export class VillagesModule {}
