import { Test, TestingModule } from '@nestjs/testing';
import { RegenciesService } from './regencies.service';

describe('RegenciesService', () => {
  let service: RegenciesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegenciesService],
    }).compile();

    service = module.get<RegenciesService>(RegenciesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
