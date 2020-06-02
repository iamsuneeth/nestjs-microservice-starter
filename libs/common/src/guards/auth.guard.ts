import {
  Injectable,
  ExecutionContext,
  CanActivate,
  Logger,
} from '@nestjs/common';
import { Metadata } from 'grpc';
import { JwtService } from '@nestjs/jwt';
import { ContextProvider } from '@app/infra';
import { ISubject } from '../interfaces/subject';

@Injectable()
export class MsAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const rpcContext = context.switchToRpc();
    const map = rpcContext.getContext<Metadata>().getMap();
    const subject = JSON.parse(map.subject.toString()) as ISubject;
    ContextProvider.set('subject', subject);
    try {
      const { sub } = await this.jwtService.verify(subject.token);
      if (sub) {
        return true;
      }
    } catch (error) {
      Logger.error(error);
    }

    return false;
  }
}
