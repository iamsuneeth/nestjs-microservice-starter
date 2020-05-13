import { NestFactory, NestApplication } from '@nestjs/core';
import { AppModule } from './app.module';
import { connectMicroservice } from '@app/infra';
import { serviceConstants } from '@app/common';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule);
  await connectMicroservice(app, serviceConstants.email.package, Transport.RMQ);
}
bootstrap();
