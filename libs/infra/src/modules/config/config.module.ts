import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { ClientService } from '../../../../infra/src/services/client.service';
import { JwtModule, JwtSecretRequestType } from '@nestjs/jwt';
import { Algorithm } from 'jsonwebtoken';
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        PORT: Joi.number().default(3000),
      }),
    }),
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => {
        const algorithm: Algorithm = config.get('jwt_signing_algorithm');
        const audience = config.get('jwt_signing_audience');
        const issuer = config.get('jwt_signing_issuer');
        const secret = config.get('jwt_signing_secret');
        const privateKey = config.get('jwt_signing_private');
        const publicKey = config.get('jwt_signing_public');
        return {
          signOptions: {
            algorithm,
            audience,
            issuer,
          },
          //TODO - implement JWKS after github issue is resolved - https://github.com/nestjs/jwt/issues/235
          secretOrKeyProvider:
            algorithm === 'RS256'
              ? requestType => {
                  switch (requestType) {
                    case JwtSecretRequestType.SIGN:
                      return privateKey;
                    case JwtSecretRequestType.VERIFY:
                      return publicKey;
                    default:
                      return secret;
                  }
                }
              : () => secret,
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [ClientService],
  exports: [JwtModule, ClientService],
})
export class AppConfigModule {}
