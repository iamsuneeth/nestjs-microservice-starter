import { User } from '../entity/users.entity';

export class CreateUserDto {
  partyId: number;
  email: string;
  mobile: string;
  firstName: string;
  lastName: string;

  public static toEntity(request: CreateUserDto): User {
    const entity = new User();
    entity.email = request.email;
    entity.firstName = request.firstName;
    entity.lastName = request.lastName;
    entity.mobile = request.mobile;
    return entity;
  }
}
