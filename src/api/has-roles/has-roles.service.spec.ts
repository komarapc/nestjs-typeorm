import { Test, TestingModule } from '@nestjs/testing';
import { HasRolesService } from './has-roles.service';

describe('HasRolesService', () => {
  let service: HasRolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HasRolesService],
    }).compile();

    service = module.get<HasRolesService>(HasRolesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
