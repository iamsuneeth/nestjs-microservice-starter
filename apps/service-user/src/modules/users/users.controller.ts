import { Controller, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/users.entity';
import { UsersService } from './users.service';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { SearchUserRequest } from './dto/search-user.request.dto';
import { UserListResponse } from './dto/user-list.dto';
import { status } from 'grpc';
import { MsAuthGuard } from '@app/common';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @GrpcMethod('UserService', 'createUser')
  @UseGuards(MsAuthGuard)
  create(createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @GrpcMethod('UserService', 'searchUser')
  @UseGuards(MsAuthGuard)
  findAll(request: SearchUserRequest): Promise<UserListResponse> {
    return this.usersService.searchUser(request);
  }

  @GrpcMethod('UserService', 'findById')
  @UseGuards(MsAuthGuard)
  findById({ id }): Promise<User> {
    return this.usersService.findOne(id);
  }

  @GrpcMethod('UserService', 'findByEmail')
  async findByEmail({ email }): Promise<User> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new RpcException({
        code: status.NOT_FOUND,
        message: 'email not found',
      });
    }
    return user;
  }

  @GrpcMethod('UserService', 'currentUser')
  @UseGuards(MsAuthGuard)
  getCurrentUser(): Promise<UserDto> {
    return this.usersService.getCurrentUser();
  }

  @GrpcMethod('UserService', 'deleteUser')
  @UseGuards(MsAuthGuard)
  remove(id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
