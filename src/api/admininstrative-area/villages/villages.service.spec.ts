import { Test, TestingModule } from '@nestjs/testing';
import { VillagesService } from './villages.service';

describe('VillagesService', () => {
  let service: VillagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VillagesService],
    }).compile();

    service = module.get<VillagesService>(VillagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
