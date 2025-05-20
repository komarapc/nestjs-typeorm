import * as fs from 'fs';

import { AddressRegencyEntity } from '../entity/address-regency.entity';
import { DataSource } from 'typeorm';
import { parse } from 'csv-parse/sync';
import { v7 } from 'uuid';

export const seedRegency = async (dataSource: DataSource) => {
  const repo = dataSource.getRepository(AddressRegencyEntity);

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
    id: v7().toUpperCase(),
    province_code: row.province_code,
    code: row.code,
    name: row.name,
  }));

  await repo.insert(regencies);
  console.log('Regencies seeded successfully');
};
