import { Test, TestingModule } from '@nestjs/testing';
import { SubdistrictsController } from './subdistricts.controller';

describe('SubdistrictsController', () => {
  let controller: SubdistrictsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubdistrictsController],
    }).compile();

    controller = module.get<SubdistrictsController>(SubdistrictsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
