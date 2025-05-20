import { Test, TestingModule } from '@nestjs/testing';
import { SubdistrictsService } from './subdistricts.service';

describe('SubdistrictsService', () => {
  let service: SubdistrictsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubdistrictsService],
    }).compile();

    service = module.get<SubdistrictsService>(SubdistrictsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
