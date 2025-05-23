import { AppDataSource } from '../../config/database';
import { DataSource } from 'typeorm';
import { Logger } from '@nestjs/common';
import { seedProvinces } from './provinces.seeder';
import { seedRegency } from './regency.seeder';
import { seedSubdistrict } from './subdistrict.seeder';
import { seedUnitItem } from './unit-item.seeder';
import { seedUsersFactory } from './users-factory.seeder';
import { seedVillages } from './villages.seeder';

AppDataSource.initialize()
  .then(async (dataSource: DataSource) => {
    const logger = new Logger('Seed');
    logger.log('Seeding started...');
    await Promise.all([seedUsersFactory(dataSource), seedUnitItem(dataSource)]);
    await seedProvinces(dataSource);
    await seedRegency(dataSource);
    await seedSubdistrict(dataSource);
    await seedVillages(dataSource);
    logger.log('Seeding completed');
  })
  .catch((error) => {
    console.log('Error during Data Source initialization', error);
  })
  .finally(async () => {
    await AppDataSource.destroy();
    process.exit(0);
  });
