import { Module } from '@nestjs/common';
import { ProvincesModule } from './provinces/provinces.module';
import { RegenciesModule } from './regencies/regencies.module';
import { SubdistrictsModule } from './subdistricts/subdistricts.module';
import { VillagesModule } from './villages/villages.module';

@Module({
  imports: [
    ProvincesModule,
    RegenciesModule,
    SubdistrictsModule,
    VillagesModule,
  ],
})
export class AdmininstrativeAreaModule {}
