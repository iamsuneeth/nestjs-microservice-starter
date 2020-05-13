import { Test } from '@nestjs/testing';
import { ClientService } from './client.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Redis from 'ioredis';

jest.mock('ioredis');

describe('ClientService', () => {
  let clientService: ClientService;
  let configService: ConfigService;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [ClientService],
    }).compile();

    clientService = moduleRef.get<ClientService>(ClientService);
    configService = moduleRef.get<ConfigService>(ConfigService);
  });

  it('should return same client object for same inputs', async () => {
    jest.spyOn(configService, 'get').mockImplementation(arg => {
      if (arg === 'redis_url') {
        return 'redisUrl';
      }
    });
    const result = new Redis({
      keyPrefix: 'prefix',
      host: 'redisUrl',
    });

    const clientObj = clientService.getClient('prefix', 'redis');
    expect(JSON.stringify(clientObj)).toEqual(JSON.stringify(result));
    expect(clientService.getClient('prefix', 'redis')).toBe(clientObj);
  });
});
