import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EmailRequest } from './type/email.request.dto';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly service: AppService) {}
  @MessagePattern('email')
  sendEmail(@Payload() data: EmailRequest) {
    return this.service.sendEmail(data);
  }
}
