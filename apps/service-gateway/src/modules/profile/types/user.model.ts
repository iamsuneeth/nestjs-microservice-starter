import { ObjectType } from '@nestjs/graphql';
import { UserProfile } from './profile.model';

@ObjectType()
export class User {
  profile: UserProfile;
}
