import { Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { ProfileService } from './profile.service';
import { UserProfile } from './types/profile.model';
import { GqlAuthGuardGuard } from '../../guards/gql-auth.guard';

@Resolver(() => UserProfile)
@UseGuards(GqlAuthGuardGuard)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query(() => UserProfile, { name: 'me' })
  fetchProfile(): Promise<UserProfile> {
    return this.profileService.fetchProfile();
  }
}
