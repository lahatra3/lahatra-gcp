import { Test, TestingModule } from '@nestjs/testing';
import { MembresController } from './membres.controller';
import { MembresService } from './membres.service';

describe('MembresController', () => {
  let controller: MembresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MembresController],
      providers: [MembresService]
    }).compile();

    controller = module.get<MembresController>(MembresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
