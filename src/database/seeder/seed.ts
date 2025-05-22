import { AppDataSource } from '../../config/database';
import { DataSource } from 'typeorm';
import { seedProvinces } from './provinces.seeder';
import { seedRegency } from './regency.seeder';
import { seedSubdistrict } from './subdistrict.seeder';
import { seedUnitItem } from './unit-item.seeder';
import { seedVillages } from './villages.seeder';

AppDataSource.initialize()
  .then(async (dataSource: DataSource) => {
    await Promise.all([
      // seedProvinces(dataSource),
      // seedRegency(dataSource),
      // seedSubdistrict(dataSource),
      // seedVillages(dataSource),
      // seedUnitItem(dataSource),
    ]);
  })
  .catch((error) => {
    console.log('Error during Data Source initialization', error);
  })
  .finally(async () => {
    await AppDataSource.destroy();
    process.exit(0);
  });
