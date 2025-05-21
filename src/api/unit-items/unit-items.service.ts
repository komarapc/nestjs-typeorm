import { Injectable } from '@nestjs/common';
import { UnitItemsRepository } from './unit-items.repository';

@Injectable()
export class UnitItemsService {
  constructor(private readonly repository: UnitItemsRepository) {}
}
