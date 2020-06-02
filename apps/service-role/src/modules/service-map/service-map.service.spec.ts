import { Test, TestingModule } from '@nestjs/testing';
import { ServiceMapService } from './service-map.service';

describe('ServiceMapService', () => {
  let service: ServiceMapService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceMapService],
    }).compile();

    service = module.get<ServiceMapService>(ServiceMapService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
