import { EmailAdapter } from '../ext-api/email.adapter';
import * as Mailgen from 'mailgen';
import * as sgMail from '@sendgrid/mail';
import { Injectable, Logger } from '@nestjs/common';
import { EmailAdapterRequest } from '../ext-api/email.request';
import { ConfigService } from '@nestjs/config';

const mailGenerator = new Mailgen({
  theme: 'salted',
  product: {
    // Appears in header & footer of e-mails
    name: 'BitBank',
    link: 'https://mailgen.js/',
    // Optional product logo
    // logo: 'https://mailgen.js/img/logo.png'
  },
});

@Injectable()
export class SendGridAdapter extends EmailAdapter {
  constructor(private readonly config: ConfigService) {
    super();
    sgMail.setApiKey(config.get('SENDGRID_API_KEY'));
  }
  async sendMail(data: EmailAdapterRequest) {
    const emailText = mailGenerator.generate(data.emailBody);
    try {
      delete data.emailBody;
      const [response] = await sgMail.send({
        ...data,
        html: emailText,
      });
      if (response.statusCode === 202) {
        Logger.log('success');
        return {
          sent: true,
        };
      }
      Logger.log('failed');
      return {
        sent: false,
      };
    } catch (error) {
      Logger.log('failed');
      return {
        sent: false,
      };
    }
  }
}
