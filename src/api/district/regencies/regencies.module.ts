import { Module } from '@nestjs/common';
import { RegenciesController } from './regencies.controller';
import { RegenciesService } from './regencies.service';

@Module({
  controllers: [RegenciesController],
  providers: [RegenciesService]
})
export class RegenciesModule {}
