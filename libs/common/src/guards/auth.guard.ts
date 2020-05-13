import {
  Injectable,
  ExecutionContext,
  CanActivate,
  Logger,
} from '@nestjs/common';
import { Metadata } from 'grpc';
import { JwtService } from '@nestjs/jwt';
import { ContextProvider } from '@app/infra';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const rpcContext = context.switchToRpc();
    const map = rpcContext.getContext<Metadata>().getMap();
    const token = map.authorization as string;
    try {
      const { sub } = await this.jwtService.verify(
        token.replace('Bearer ', ''),
      );
      if (sub) {
        ContextProvider.set('user', sub);
        return true;
      }
    } catch (error) {
      Logger.error(error);
    }

    return false;
  }
}
