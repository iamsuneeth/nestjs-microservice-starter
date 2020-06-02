import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/users.entity';
import { SearchUserRequest } from './dto/search-user.request.dto';
import { UserListResponse } from './dto/user-list.dto';
import { ContextProvider } from '@app/infra';
import { ISubject } from '@app/common/interfaces/subject';
import { UserDto } from './dto/user.dto';
import { UserRepo } from './users.repo';

@Injectable()
export class UsersService {
  constructor(private readonly userRepo: UserRepo) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepo.create(CreateUserDto.toEntity(createUserDto));
    return user;
  }

  async searchUser({ query }: SearchUserRequest): Promise<UserListResponse> {
    const users = await this.userRepo.search(query);
    return UserListResponse.fromEntity(users);
  }

  findOne(id: string): Promise<User> {
    return this.userRepo.find({ id });
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepo.find({ email });
  }

  async remove(id: string): Promise<void> {
    await this.userRepo.delete(id);
  }

  async getCurrentUser(): Promise<UserDto> {
    const { info } = ContextProvider.get('subject') as ISubject;
    const user = await this.findOne(info.id);
    return UserDto.fromEntity(user);
  }
}
