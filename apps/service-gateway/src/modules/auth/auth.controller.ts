import {
  Controller,
  Get,
  Body,
  Post,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { LoginRequest } from './types/login.request.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@Controller('auth/v1')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  login(@Body() { email }: LoginRequest) {
    return this.authService.initiateLogin(email);
  }

  @UseGuards(JwtAuthGuard)
  @Get('validate')
  validate(): boolean {
    return true;
  }
}
