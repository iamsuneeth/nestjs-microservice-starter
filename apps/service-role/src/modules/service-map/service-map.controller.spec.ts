import { Test, TestingModule } from '@nestjs/testing';
import { ServiceMapController } from './service-map.controller';

describe('ServiceMap Controller', () => {
  let controller: ServiceMapController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceMapController],
    }).compile();

    controller = module.get<ServiceMapController>(ServiceMapController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
