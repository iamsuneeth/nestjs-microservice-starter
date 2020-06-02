import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from '../../auth/jwt.strategy';
import { Auth0Strategy } from '../../auth/auth0.strategy';
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from '../../auth/session-serializer';
import { APP_GUARD } from '@nestjs/core';
import { GqlAuthGuard } from '../../guards/gql-auth.guard';

@Module({
  imports: [PassportModule],

  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, SessionSerializer, Auth0Strategy],
  exports: [JwtStrategy],
})
export class AuthModule {}
