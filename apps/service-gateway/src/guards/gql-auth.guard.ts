import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ContextProvider } from '@app/infra';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { req } = GqlExecutionContext.create(context).getContext();
    if (!req.isAuthenticated()) {
      await super.canActivate(context);
    }
    ContextProvider.set('user', req.user);
    return req.isAuthenticated();
  }
}
