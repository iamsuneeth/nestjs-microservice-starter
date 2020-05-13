import { IsEmail, IsPhoneNumber } from 'class-validator';
import { User } from '../entity/users.entity';

export class UserDto {
  @IsEmail()
  email: string;

  @IsPhoneNumber(null)
  mobile: string;

  firstName: string;

  lastName: string;

  public static fromEntity(user: User) {
    const userDto = new UserDto();
    userDto.email = user.email;
    userDto.firstName = user.firstName;
    userDto.lastName = user.lastName;
    userDto.mobile = user.mobile;
    return userDto;
  }
}
