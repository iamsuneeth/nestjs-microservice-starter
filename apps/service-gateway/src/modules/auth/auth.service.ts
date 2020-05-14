import {
  Injectable,
  UnauthorizedException,
  Inject,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GrpcClientProvider } from '@app/grpc';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';
import { ClientService } from '@app/infra';
import { serviceConstants } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserService, UserResponse } from '@app/proto';
@Injectable()
export class AuthService {
  private userProtoService: UserService;
  private redisClient: Redis;
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    clientService: ClientService,
    grpcClientProvider: GrpcClientProvider,
    @Inject(serviceConstants.email.name)
    private emailServiceClient: ClientProxy,
  ) {
    this.redisClient = clientService.getClient('data', 'redis');
    this.userProtoService = grpcClientProvider.getService<UserService>(
      serviceConstants.user.service,
      serviceConstants.user.package,
    );
  }

  private async generateJWT(user: UserResponse) {
    const token = this.jwtService.sign(
      {
        sub: user.id,
      },
      {
        expiresIn: '5m',
      },
    );
    this.redisClient.hset('jwt', user.id, token);
    return token;
  }

  async initiateLogin(email: string): Promise<any> {
    const user = await this.userProtoService
      .findByEmail({
        email,
      })
      .toPromise();
    if (user) {
      //send email link
      const token = await this.generateJWT(user);
      const obs = this.emailServiceClient.send('email', {
        templateId: 'login',
        dictionary: {
          userName: user.firstName,
          validationUrl: this.generateValidationUrl(token),
        },
        to: email,
        subject: 'login',
      });
      obs.subscribe(ob => {
        Logger.log(ob, 'email service response');
      });

      return {
        sent: true,
      };
    }
    throw new UnauthorizedException();
  }

  private generateValidationUrl(token: string): string {
    const url = this.configService.get('login_validation_url');
    return `${url}?token=${token}`;
  }
}
