import { Test, TestingModule } from '@nestjs/testing';
import { UnitItemsService } from './unit-items.service';

describe('UnitItemsService', () => {
  let service: UnitItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UnitItemsService],
    }).compile();

    service = module.get<UnitItemsService>(UnitItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
