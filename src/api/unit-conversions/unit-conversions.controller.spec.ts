import { Test, TestingModule } from '@nestjs/testing';
import { UnitConversionsController } from './unit-conversions.controller';

describe('UnitConversionsController', () => {
  let controller: UnitConversionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UnitConversionsController],
    }).compile();

    controller = module.get<UnitConversionsController>(UnitConversionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
