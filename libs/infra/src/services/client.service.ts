import { Injectable, NotImplementedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Redis from 'ioredis';

@Injectable()
export class ClientService {
  constructor(private readonly configService: ConfigService) {}
  private _clientMap = {};

  getClient(name: string, type: 'redis'): Redis.Redis;
  getClient(name: string, type: 'redis' | 'rest') {
    if (name in this._clientMap) {
      return this._clientMap[name];
    }
    switch (type) {
      case 'redis':
        this._clientMap[name] = new Redis({
          keyPrefix: name,
          host: this.configService.get('redis_host'),
          port: this.configService.get('redis_port'),
        });
        break;
      case 'rest':
      default:
        throw new NotImplementedException();
    }
    return this._clientMap[name];
  }
}
