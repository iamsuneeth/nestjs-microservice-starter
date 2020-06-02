import { User } from './entity/users.entity';
import { UserRepo, userFindOptions } from './users.repo';
import { Injectable } from '@nestjs/common';
import { ManagementClient } from 'auth0';
import { ConfigService } from '@nestjs/config';
import { authConfig } from '@app/infra';
import { User as Auth0User } from 'auth0';

@Injectable()
export class Auth0UserRepo extends UserRepo {
  private readonly mgmntClient: ManagementClient;
  constructor(config: ConfigService) {
    super();
    this.mgmntClient = new ManagementClient({
      domain: config.get(authConfig.auth0.domain),
      clientId: config.get(authConfig.auth0.clientId),
      clientSecret: config.get(authConfig.auth0.clientSecret),
    });
  }

  async find({ id, email }: userFindOptions): Promise<User> {
    if (id) {
      const user = await this.mgmntClient.getUser({
        id,
      });
      return this.toEntity(user);
    }
    const users = await this.mgmntClient.getUsersByEmail(email);
    return users.length > 0 ? this.toEntity(users[0]) : null;
  }
  delete(id: string): Promise<any> {
    return this.mgmntClient.deleteUser({ id });
  }
  async search(query: string): Promise<User[]> {
    const users = await this.mgmntClient.getUsers({
      q: `name:*${query}* OR email:*${query}* OR nickName:*${query}* OR firstName:*${query}* OR lastName:*${query}*`,
      // eslint-disable-next-line @typescript-eslint/camelcase
      search_engine: 'v3',
    });
    return users.map(user => this.toEntity(user));
  }
  create(user: User): Promise<any> {
    throw new Error('Method not implemented.');
  }

  fromEntity(user: User) {
    throw new Error('Method not implemented.');
  }
  toEntity(data: Auth0User): User {
    const user = new User();
    user.email = data.email;
    user.mobile = data.phone_number;
    user.firstName = data.given_name;
    user.lastName = data.family_name;
    user.isActive = !data.blocked;
    user.id = data.user_id;
    user.createDateTime = new Date(data.created_at);
    user.lastChangedDateTime = new Date(data.updated_at);
    return user;
  }
}
