import { Strategy } from 'passport-auth0';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { authConfig } from '@app/infra';
import {
  ISubject,
  SubjectType,
} from '../../../../libs/common/src/interfaces/subject';

@Injectable()
export class Auth0Strategy extends PassportStrategy(Strategy, 'auth0') {
  constructor(private configService: ConfigService) {
    super({
      domain: configService.get(authConfig.auth0.domain),
      clientID: configService.get(authConfig.auth0.clientId),
      clientSecret: configService.get(authConfig.auth0.clientSecret),
      callbackURL: configService.get(authConfig.auth0.callbackUrl),
    });
  }

  async validate(
    accessToken,
    refreshToken,
    extraParams,
    profile,
  ): Promise<ISubject> {
    return {
      info: profile,
      type: SubjectType.AUTH0,
      token: undefined,
    };
  }
}
