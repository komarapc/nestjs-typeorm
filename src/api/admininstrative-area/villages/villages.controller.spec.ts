import { Test, TestingModule } from '@nestjs/testing';
import { VillagesController } from './villages.controller';

describe('VillagesController', () => {
  let controller: VillagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VillagesController],
    }).compile();

    controller = module.get<VillagesController>(VillagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
