import { Test, TestingModule } from '@nestjs/testing';
import { OrmService } from './orm.service';

describe('OrmService', () => {
  let service: OrmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrmService],
    }).compile();

    service = module.get<OrmService>(OrmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
