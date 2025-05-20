import { Test, TestingModule } from '@nestjs/testing';
import { RegenciesController } from './regencies.controller';

describe('RegenciesController', () => {
  let controller: RegenciesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegenciesController],
    }).compile();

    controller = module.get<RegenciesController>(RegenciesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
