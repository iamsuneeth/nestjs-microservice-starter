import { IsEmail } from 'class-validator';

export class LoginRequest {
  @IsEmail()
  email: string;
}
