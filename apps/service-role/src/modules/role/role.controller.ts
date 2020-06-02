import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { HasAccessRequest } from './dto/hasAccess.request.dto';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @GrpcMethod('RoleService', 'hasAccess')
  hasAccess(accessReuest: HasAccessRequest): Promise<boolean> {
    return this.roleService.hasAccess(accessReuest);
  }
}
