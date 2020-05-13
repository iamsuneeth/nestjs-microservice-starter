import { EmailAdapterRequest } from './email.request';
import { EmailResponse } from './email.response';

export abstract class EmailAdapter {
  abstract sendMail(req: EmailAdapterRequest): Promise<EmailResponse>;
}
