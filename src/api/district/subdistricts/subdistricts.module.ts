import { Module } from '@nestjs/common';
import { SubdistrictsController } from './subdistricts.controller';
import { SubdistrictsService } from './subdistricts.service';

@Module({
  controllers: [SubdistrictsController],
  providers: [SubdistrictsService]
})
export class SubdistrictsModule {}
