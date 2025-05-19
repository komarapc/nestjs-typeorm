import { Test, TestingModule } from '@nestjs/testing';
import { CacheRequestService } from './cache-request.service';

describe('CacheRequestService', () => {
  let service: CacheRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CacheRequestService],
    }).compile();

    service = module.get<CacheRequestService>(CacheRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
