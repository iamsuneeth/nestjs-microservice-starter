import { User } from './entity/users.entity';

export type userFindOptions = Partial<Pick<User, 'id' | 'email'>>;

export abstract class UserRepo {
  abstract find(options: userFindOptions): Promise<User>;
  abstract delete(id: string): Promise<any>;
  abstract search(query: string): Promise<User[]>;
  abstract create(user: User): Promise<any>;
}
