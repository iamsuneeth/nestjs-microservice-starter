import { User } from '../entity/users.entity';

export class SearchUserRequest {
  email: string;
  firstName: string;
  lastName: string;

  public static toEntity(request: SearchUserRequest): User {
    const entity = new User();
    entity.email = request.email;
    entity.firstName = request.firstName;
    entity.lastName = request.lastName;
    return entity;
  }
}
