import { Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { GrpcClient } from '../helpers/grpc-client';
import { ConfigService } from '@nestjs/config';
import { grpcServiceList } from '../config/services';

@Injectable()
export class GrpcClientProvider {
  private _clientPool: { [key: string]: ClientGrpc } = {};
  constructor(private readonly configService: ConfigService) {}

  getService<T>(serviceId: string, packageId: string): T {
    if (packageId in this._clientPool) {
      return this._clientPool[packageId].getService<T>(serviceId);
    }
    const clientConf = grpcServiceList[packageId];
    const client = new GrpcClient({
      ...clientConf.options,
      url: this.configService.get(`${packageId}_url`),
    });
    this._clientPool[packageId] = client;
    return client.getService<T>(serviceId);
  }
}
