import { Test, TestingModule } from '@nestjs/testing';
import { ProvincesController } from './provinces.controller';

describe('ProvincesController', () => {
  let controller: ProvincesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProvincesController],
    }).compile();

    controller = module.get<ProvincesController>(ProvincesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
