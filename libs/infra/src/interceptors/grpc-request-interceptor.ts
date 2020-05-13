import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Metadata } from 'grpc';
import { ContextProvider } from '../providers/context.provider';

@Injectable()
export class RequestInterceptor implements NestInterceptor {
  /**
   *  sets request data and meta information in global RequestContext
   * @param context ExecutionContext
   * @param next CallHandler
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const rpcContext = context.switchToRpc();
    ContextProvider.set('meta', rpcContext.getContext<Metadata>().getMap());
    return next.handle();
  }
}
