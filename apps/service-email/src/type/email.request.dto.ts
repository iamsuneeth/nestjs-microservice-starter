import { IsEmail } from 'class-validator';

export class EmailRequest {
  templateId: string;
  dictionary: { [key: string]: string };
  @IsEmail()
  to: string;
  @IsEmail()
  from?: string;
  subject: string;
}
