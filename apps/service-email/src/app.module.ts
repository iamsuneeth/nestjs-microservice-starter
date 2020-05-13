import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RootModule } from '@app/infra';
import { EmailAdapter } from './ext-api/email.adapter';
import { SendGridAdapter } from './ext-api-impl/sendgrid.adapter';

@Module({
  imports: [RootModule],

  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: EmailAdapter,
      useClass: SendGridAdapter,
    },
  ],
})
export class AppModule {}
