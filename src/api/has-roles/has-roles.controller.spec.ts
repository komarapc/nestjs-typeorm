import { Test, TestingModule } from '@nestjs/testing';
import { HasRolesController } from './has-roles.controller';

describe('HasRolesController', () => {
  let controller: HasRolesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HasRolesController],
    }).compile();

    controller = module.get<HasRolesController>(HasRolesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
