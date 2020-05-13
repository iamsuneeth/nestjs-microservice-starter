import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { v4 } from 'uuid';
import { ClientGrpcProxy, ClientGrpc } from '@nestjs/microservices';
import { InvalidGrpcServiceException } from '@nestjs/microservices/errors/invalid-grpc-service.exception';
import { setRpcMetadata } from './grpc-context-helper';

export class GrpcClient extends ClientGrpcProxy implements ClientGrpc {
  public getService<T extends {}>(name: string): T {
    const grpcClient = this.createClientByServiceName(name);
    const clientRef = this.getClient(name);
    if (!clientRef) {
      throw new InvalidGrpcServiceException();
    }
    const protoMethods = Object.keys(clientRef[name].prototype);
    const grpcService = {} as T;
    protoMethods.forEach(m => {
      const key = m[0].toLowerCase() + m.slice(1, m.length);
      const serviceMethod = this.createServiceMethod(grpcClient, m);
      grpcService[key] = this.wrap.bind(this, serviceMethod, name, m);
    });
    return grpcService;
  }

  private wrap(
    fn: Function,
    serviceName: string,
    methodName: string,
    ...args: any[]
  ): any {
    const start = Date.now();
    const id = v4();
    this.logger.debug({
      message: `GRPC Requests: started`,
      service: serviceName,
      method: methodName,
      id,
    });

    args = setRpcMetadata(args);

    const ret: Observable<unknown> = fn.apply(this, args);
    return ret.pipe(
      tap(() => {
        this.logger.debug({
          message: `GRPC Requests: finished`,
          service: serviceName,
          method: methodName,
          id,
          duration: Date.now() - start,
        });
      }),
      catchError(err => {
        this.logger.error({
          message: `GRPC Requests: error`,
          service: serviceName,
          method: methodName,
          id,
          duration: Date.now() - start,
          err,
        });
        return throwError(err);
      }),
    );
  }
}

// {
//   provide: MyGrpcService,
//   useFactory: (GrpcClient: ClientGrpc) => {
//     return GrpcClient.getService<MyGrpcService>('MyGrpcService')
//   },
//   inject: ['GrpcClient'],
// },
