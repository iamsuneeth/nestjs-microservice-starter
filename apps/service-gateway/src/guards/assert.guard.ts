import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlAuthGuard } from './gql-auth.guard';
import { RoleGuard } from './role.guard';

@Injectable()
export class AssertGuard implements CanActivate {
  constructor(
    private gqlAuthGuard: GqlAuthGuard,
    private roleGuard: RoleGuard,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    await this.gqlAuthGuard.canActivate(context);
    await this.roleGuard.canActivate(context);
    return false;
  }
}
