import { NestApplication } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { serviceConstants } from '@app/common';
import { RequestInterceptor } from '../interceptors/grpc-request-interceptor';
import { externalConfig, serviceConfig } from '../constants';
import { join } from 'path';

const pathToProto = '../../proto/';

const getOptions = (
  type: Transport,
  config: ConfigService,
  serviceName: string,
) => {
  switch (type) {
    case Transport.RMQ:
      const urls = config.get(externalConfig.rmq.url);
      const queue = config.get(externalConfig.rmq.queueName);
      return {
        urls: urls.split(','),
        queue,
        queueOptions: {
          durable: false,
        },
      };
    default:
      const url = config.get(serviceConfig[serviceName].url);
      return {
        url,
        package: serviceConstants[serviceName].package,
        protoPath: join(__dirname, `${pathToProto}/${serviceName}.proto`),
      };
  }
};

export const connectMicroservice = async (
  app: NestApplication,
  serviceName: string,
  type: Transport,
) => {
  const config = app.get(ConfigService);
  const options = getOptions(type, config, serviceName);
  app.connectMicroservice({
    transport: type,
    options,
  });
  if (type === Transport.GRPC) {
    app.useGlobalInterceptors(new RequestInterceptor());
  }
  await app.startAllMicroservicesAsync();
  if (type === Transport.GRPC) {
    Logger.log(
      `GRPC ${serviceName} service running on ${options.url}`,
      'Bootstrap',
    );
  } else {
    Logger.log(`${type} service is running`);
  }
};
