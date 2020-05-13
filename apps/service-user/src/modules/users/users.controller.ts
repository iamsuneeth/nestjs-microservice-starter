import { Controller, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/users.entity';
import { UsersService } from './users.service';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { SearchUserRequest } from './dto/search-user.request.dto';
import { UserListResponse } from './dto/user-list.dto';
import { status } from 'grpc';
import { AuthGuard } from '@app/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @GrpcMethod('UserService', 'createUser')
  @UseGuards(AuthGuard)
  create(createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @GrpcMethod('UserService', 'searchUser')
  @UseGuards(AuthGuard)
  findAll(request: SearchUserRequest): Promise<UserListResponse> {
    return this.usersService.searchUser(request);
  }

  @GrpcMethod('UserService', 'findById')
  @UseGuards(AuthGuard)
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
  @UseGuards(AuthGuard)
  getCurrentUser(): Promise<User> {
    return this.usersService.getCurrentUser();
  }

  @GrpcMethod('UserService', 'deleteUser')
  @UseGuards(AuthGuard)
  remove(id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
