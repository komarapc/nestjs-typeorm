import * as fs from 'fs';

import { DataSource } from 'typeorm';
import { UnitItemsEntity } from '../entity/unit-items.entity';
import { parse } from 'csv-parse/sync';
import { v7 } from 'uuid';

type Data = { id: string; name: string; abbreviation: string };
export const seedUnitItem = async (dataSource: DataSource) => {
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
      id: v7().toUpperCase(),
      name,
      abbreviation,
    }),
  );

  await repo.insert(list);
  console.log('Unit item seeded successfully');
};
