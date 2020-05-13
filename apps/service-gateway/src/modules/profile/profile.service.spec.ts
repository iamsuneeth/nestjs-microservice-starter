import { Test, TestingModule } from '@nestjs/testing';
import { ProfileService } from './profile.service';
import { GrpcModule, GrpcClientProvider } from '@app/grpc';
import { RootModule } from '@app/infra';
import { of } from 'rxjs';

describe('ProfileService', () => {
  let service: ProfileService;
  jest
    .spyOn(GrpcClientProvider.prototype, 'getService')
    .mockImplementation(() => ({
      currentUser() {
        return of({
          id: 'someId',
          firstName: 'firstName',
        });
      },
    }));
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [RootModule, GrpcModule],
      providers: [ProfileService],
    }).compile();

    service = module.get<ProfileService>(ProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return current user', async () => {
    expect(await service.fetchProfile()).toEqual({
      id: 'someId',
      firstName: 'firstName',
    });
  });
});
