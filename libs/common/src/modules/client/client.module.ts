import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { serviceConstants } from '../../constants/services';

@Module({
  providers: [
    {
      provide: serviceConstants.email.name,
      useFactory: (configService: ConfigService) => {
        const urls = configService.get(`rmq.url`);
        const queue = configService.get(`rmq.queueName`);
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls,
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
