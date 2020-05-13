import { NestFactory, NestApplication } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { authSetup } from '@app/infra';
import { ConfigService } from '@nestjs/config';
async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  authSetup(app);
  const config = app.get(ConfigService);
  await app.listen(parseInt(config.get('gateway_port')), () =>
    Logger.log(
      `Gateway application running on port ${config.get('gateway_port')}`,
    ),
  );
}
bootstrap();
