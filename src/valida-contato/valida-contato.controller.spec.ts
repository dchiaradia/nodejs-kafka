import { Test, TestingModule } from '@nestjs/testing';
import { ValidaContatoController } from './valida-contato.controller';

describe('ValidaContatoController', () => {
  let controller: ValidaContatoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ValidaContatoController],
    }).compile();

    controller = module.get<ValidaContatoController>(ValidaContatoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
