import * as fs from 'fs';

import { DataSource } from 'typeorm';
import { Logger } from '@nestjs/common';
import { parse } from 'csv-parse/sync';
import { v7 } from 'uuid';

export const seedVillages = async (dataSource: DataSource) => {
  const repo = dataSource.getRepository('address_villages');
  const logger = new Logger('SeedVillages');
  // Read and parse CSV file
  const csvFile = fs.readFileSync(
    __dirname + '/../dataset/villages.csv',
    'utf-8',
  );
  const records = parse(csvFile, {
    columns: true,
    skip_empty_lines: true,
  });

  // Prepare plain objects for bulk insert
  const villages = records.map((row: any) => ({
    id: v7(),
    subdistrict_code: row.subdistrict_code,
    code: row.code,
    name: row.name,
  }));

  // Insert in chunks of 1000
  const chunkSize = 1000;
  const insertPromises: Promise<any>[] = [];
  for (let i = 0; i < villages.length; i += chunkSize) {
    const chunk = villages.slice(i, i + chunkSize);
    insertPromises.push(repo.insert(chunk));
  }
  try {
    await Promise.all(insertPromises);
    logger.log('Villages seeded successfully');
  } catch (error) {
    logger.error('Error seeding villages:', error);
    throw error;
  }
};
