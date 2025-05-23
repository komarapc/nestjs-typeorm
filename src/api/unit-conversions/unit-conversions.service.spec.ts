import { Test, TestingModule } from '@nestjs/testing';
import { UnitConversionsService } from './unit-conversions.service';

describe('UnitConversionsService', () => {
  let service: UnitConversionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UnitConversionsService],
    }).compile();

    service = module.get<UnitConversionsService>(UnitConversionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
