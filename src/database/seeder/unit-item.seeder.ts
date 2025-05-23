import * as fs from 'fs';

import { DataSource } from 'typeorm';
import { Logger } from '@nestjs/common';
import { UnitItemsEntity } from '../entity/unit-items.entity';
import { parse } from 'csv-parse/sync';
import { v7 } from 'uuid';

type Data = { id: string; name: string; abbreviation: string };
export const seedUnitItem = async (dataSource: DataSource) => {
  const logger = new Logger('SeedUnitItem');
  const repo = dataSource.getRepository(UnitItemsEntity);

  // Read CSV file
  const csvFile = fs.readFileSync(
    __dirname + '/../dataset/unit-item.csv',
    'utf-8',
  );

  // Parse CSV
  const records = parse(csvFile, {
    columns: true,
    skip_empty_lines: true,
  });

  // Prepare plain objects for bulk insert
  const list: Data[] = records.map(
    ({ name, abbreviation }: Data): Data => ({
      id: v7(),
      name,
      abbreviation,
    }),
  );

  try {
    await repo.insert(list);
    logger.log('Unit item seeded successfully');
  } catch (error) {
    logger.error('Error seeding unit items:', error);
    throw error;
  }
};
