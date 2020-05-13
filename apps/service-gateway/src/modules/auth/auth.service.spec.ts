import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { RootModule } from '@app/infra';
import { serviceConstants, CommonModule } from '@app/common';
import { GrpcClientProvider } from '@app/grpc';
import { ClientProxy } from '@nestjs/microservices';
import { of } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let emailClient: ClientProxy;
  jest.mock('ioredis');
  jest
    .spyOn(GrpcClientProvider.prototype, 'getService')
    .mockImplementation(() => ({
      findByEmail() {
        return of({
          id: 'someId',
          firstName: 'firstName',
        });
      },
    }));
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [RootModule, CommonModule],
      providers: [GrpcClientProvider, AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    emailClient = module.get<ClientProxy>(serviceConstants.email.name);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should return true for login', async () => {
    const mockFunction = jest.fn(() => of(true));
    jest.spyOn(emailClient, 'send').mockImplementation(mockFunction);
    expect(await service.initiateLogin('a@a.com')).toEqual({ sent: true });
    expect(mockFunction).toBeCalledWith('email', {
      templateId: 'email',
      dictionary: {
        userName: 'firstName',
        validationUrl: expect.any(String),
      },
      to: 'a@a.com',
      subject: 'login',
    });
  });
});
