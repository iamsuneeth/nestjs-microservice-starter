import { User } from './entity/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindConditions, Like } from 'typeorm';
import { UserRepo, userFindOptions } from './users.repo';

export class LocalUserRepo extends UserRepo {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {
    super();
  }

  find(options: userFindOptions): Promise<User> {
    return this.usersRepository.findOne({
      ...options,
    });
  }
  delete(id: string): Promise<any> {
    return this.usersRepository.delete(id);
  }
  search(query: string): Promise<User[]> {
    const whereConditions: FindConditions<User> = {};
    Object.keys(User).forEach(
      key => (whereConditions[key] = Like(`%${query}%`)),
    );
    return this.usersRepository.find({
      where: whereConditions,
    });
  }
  create(user: User): Promise<any> {
    return this.usersRepository.save(user);
  }
}
