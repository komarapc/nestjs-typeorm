import { Module } from '@nestjs/common';
import { ProvincesController } from './provinces.controller';
import { ProvincesService } from './provinces.service';

@Module({
  controllers: [ProvincesController],
  providers: [ProvincesService]
})
export class ProvincesModule {}
