import { UserDto } from './user.dto';
import { User } from '../entity/users.entity';

export class UserListResponse {
  users: UserDto[];
  public static fromEntity(users: User[]) {
    const userListResponse = new UserListResponse();

    userListResponse.users = users.map(user => UserDto.fromEntity(user));
    return userListResponse;
  }
}
