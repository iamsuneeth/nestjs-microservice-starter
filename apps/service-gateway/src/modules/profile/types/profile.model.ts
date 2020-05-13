import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class UserProfile {
  @Field(() => ID)
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: number;
}
