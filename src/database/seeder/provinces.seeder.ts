import * as fs from 'fs';

import { AddressProvincesEntity } from '../entity/address-province.entity';
import { DataSource } from 'typeorm';
import { Logger } from '@nestjs/common';
import { parse } from 'csv-parse/sync';
import { v7 } from 'uuid';

export const seedProvinces = async (dataSource: DataSource) => {
  const repo = dataSource.getRepository(AddressProvincesEntity);
  const logger = new Logger('SeedProvinces');
  // Read CSV file
  const csvFile = fs.readFileSync(
    __dirname + '/../dataset/provinces.csv',
    'utf-8',
  );

  // Parse CSV
  const records = parse(csvFile, {
    columns: true,
    skip_empty_lines: true,
  });

  // Prepare plain objects for bulk insert
  const provinces = records.map((row: any) => ({
    id: v7(), // Uncomment if you must set id manually
    code: row.code,
    name: row.name,
  }));

  try {
    await repo.insert(provinces);
    logger.log('Provinces seeded successfully');
  } catch (error) {
    logger.error('Error seeding provinces:', error);
    throw error;
  }
};
