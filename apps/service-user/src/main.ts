import { NestFactory, NestApplication } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { connectMicroservice } from '@app/infra';
import { serviceConstants } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule);
  await connectMicroservice(app, serviceConstants.user.package, Transport.GRPC);
}
bootstrap();
