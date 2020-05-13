import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, FindConditions } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/users.entity';
import { SearchUserRequest } from './dto/search-user.request.dto';
import { UserListResponse } from './dto/user-list.dto';
import { ContextProvider } from '@app/infra';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;

    return this.usersRepository.save(user);
  }

  async searchUser(
    userSearchRequest: SearchUserRequest,
  ): Promise<UserListResponse> {
    const whereConditions: FindConditions<User> = {};
    const user = SearchUserRequest.toEntity(userSearchRequest);
    Object.keys(user).forEach(
      key => (whereConditions[key] = Like(`%${user[key]}%`)),
    );
    const users = await this.usersRepository.find({
      where: whereConditions,
    });
    return UserListResponse.fromEntity(users);
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({
      email,
    });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  getCurrentUser(): Promise<User> {
    const userId = ContextProvider.get('user') as string;
    return this.findOne(userId);
  }
}
