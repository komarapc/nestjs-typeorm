import * as fs from 'fs';

import { AddressRegencyEntity } from '../entity/address-regency.entity';
import { DataSource } from 'typeorm';
import { Logger } from '@nestjs/common';
import { parse } from 'csv-parse/sync';
import { v7 } from 'uuid';

export const seedRegency = async (dataSource: DataSource) => {
  const repo = dataSource.getRepository(AddressRegencyEntity);
  const logger = new Logger('SeedRegency');
  // Read CSV file
  const csvFile = fs.readFileSync(
    __dirname + '/../dataset/regencies.csv',
    'utf-8',
  );

  // Parse CSV
  const records = parse(csvFile, {
    columns: true,
    skip_empty_lines: true,
  });

  // Prepare plain objects for bulk insert
  const regencies = records.map((row: any) => ({
    id: v7(),
    province_code: row.province_code,
    code: row.code,
    name: row.name,
  }));
  try {
    await repo.insert(regencies);
    logger.log('Regencies seeded successfully');
  } catch (error) {
    logger.error('Error seeding regencies:', error);
    throw error;
  }
};
