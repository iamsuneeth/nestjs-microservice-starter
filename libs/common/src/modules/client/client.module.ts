import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { serviceConstants } from '../../constants/services';
import { externalConfig } from '@app/infra';

@Module({
  providers: [
    {
      provide: serviceConstants.email.name,
      useFactory: (configService: ConfigService) => {
        const urls = configService.get(externalConfig.rmq.url);
        const queue = configService.get(externalConfig.rmq.queueName);
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: urls.split(','),
            queue,
            queueOptions: {
              durable: false,
            },
          },
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [serviceConstants.email.name],
})
export class ClientModule {}
