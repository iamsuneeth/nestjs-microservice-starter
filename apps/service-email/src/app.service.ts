import { Injectable } from '@nestjs/common';
import { EmailRequest } from './type/email.request.dto';
import { fetchBody } from './templates/templates';
import { EmailAdapter } from './ext-api/email.adapter';

@Injectable()
export class AppService {
  private static SENDER = 'noreply@bitbank.com';
  constructor(private readonly emailAdapter: EmailAdapter) {}

  sendEmail({ templateId, dictionary, from, to, subject }: EmailRequest) {
    const emailBody = fetchBody({ templateId, dictionary });
    return this.emailAdapter.sendMail({
      from: from ?? AppService.SENDER,
      subject,
      to,
      emailBody,
    });
  }
}
