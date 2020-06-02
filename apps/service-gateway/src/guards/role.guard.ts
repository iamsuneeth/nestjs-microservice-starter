import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ContextProvider } from '@app/infra';
import { Reflector } from '@nestjs/core';
import { IResource } from '../interfaces/resource';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();
    const resource = this.reflector.get<IResource>(
      'resource',
      context.getHandler(),
    );
    if (!ctx.req.isAuthenticated()) {
      //check for resource access
      // this.roleService.hasAccess({
      //   name:resource.name
      // });
    } else {
      //check for anonymous explicitly
    }
    return false;
  }
}
