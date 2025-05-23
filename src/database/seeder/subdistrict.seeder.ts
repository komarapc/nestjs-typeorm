import * as fs from 'fs';

import { DataSource } from 'typeorm';
import { Logger } from '@nestjs/common';
import { parse } from 'csv-parse/sync';
import { v7 } from 'uuid';

export const seedSubdistrict = async (dataSource: DataSource) => {
  const repo = dataSource.getRepository('address_subdistricts');
  const logger = new Logger('SeedSubdistrict');
  // Read CSV file
  const csvFile = fs.readFileSync(
    __dirname + '/../dataset/subdistricts.csv',
    'utf-8',
  );

  // Parse CSV
  const records = parse(csvFile, {
    columns: true,
    skip_empty_lines: true,
  });

  // Prepare plain objects for bulk insert
  const subdistricts = records.map((row: any) => ({
    id: v7(),
    regency_code: row.regency_code,
    code: row.code,
    name: row.name,
  }));

  try {
    await repo.insert(subdistricts);
    logger.log('Subdistricts seeded successfully');
  } catch (error) {
    logger.error('Error seeding subdistricts:', error);
    throw error;
  }
};
