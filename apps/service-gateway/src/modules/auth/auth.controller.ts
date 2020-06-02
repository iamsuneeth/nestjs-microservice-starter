import {
  Controller,
  Get,
  Body,
  Post,
  UseGuards,
  HttpCode,
  Req,
  Res,
} from '@nestjs/common';
import { LoginRequest } from './types/login.request.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { Auth0Guard } from '../../guards/auth0.guard';

@Controller('auth/v1')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  login(@Body() { email }: LoginRequest) {
    return this.authService.initiateLogin(email);
  }

  @Get('auth0')
  @UseGuards(Auth0Guard)
  auth(@Body() { email }: LoginRequest) {
    return this.authService.initiateLogin(email);
  }
  @UseGuards(Auth0Guard)
  @Get('auth0/validate')
  redirect(@Req() request, @Res() response) {
    console.log(request.user);
    response.redirect('/graphql');
  }

  @UseGuards(JwtAuthGuard)
  @Get('validate')
  validate() {
    return true;
  }
}
