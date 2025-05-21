import { Test, TestingModule } from '@nestjs/testing';
import { UnitItemsController } from './unit-items.controller';

describe('UnitItemsController', () => {
  let controller: UnitItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UnitItemsController],
    }).compile();

    controller = module.get<UnitItemsController>(UnitItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
