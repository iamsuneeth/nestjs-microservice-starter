import { Controller, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/users.entity';
import { UsersService } from './users.service';
import { RpcException } from '@nestjs/microservices';
import { SearchUserRequest } from './dto/search-user.request.dto';
import { UserListResponse } from './dto/user-list.dto';
import { status } from 'grpc';
import { MsAuthGuard } from '@app/common';
import { UserDto } from './dto/user.dto';
import {
  UserServiceController,
  UserServiceControllerMethods,
} from '@app/proto';

@Controller('users')
@UserServiceControllerMethods()
export class UsersController implements UserServiceController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(MsAuthGuard)
  create(createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(MsAuthGuard)
  searchUser(request: SearchUserRequest): Promise<UserListResponse> {
    return this.usersService.searchUser(request);
  }

  @UseGuards(MsAuthGuard)
  findById({ id }) {
    return this.usersService.findOne(id);
  }

  async findByEmail({ email }) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new RpcException({
        code: status.NOT_FOUND,
        message: 'email not found',
      });
    }
    return user;
  }

  @UseGuards(MsAuthGuard)
  currentUser(): Promise<UserDto> {
    return this.usersService.getCurrentUser();
  }

  @UseGuards(MsAuthGuard)
  remove(id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
