import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/users.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserRepo } from './users.repo';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    {
      provide: UserRepo,
      useFactory: (config: ConfigService) => {
        return import(`users.repo.${config.get('authconfig_type')}`);
      },
    },
    UsersService,
  ],
  controllers: [UsersController],
})
export class UsersModule {}
