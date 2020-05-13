import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from '@app/db';
import { RootModule } from '@app/infra';

@Module({
  imports: [
    RootModule,
    DatabaseModule.forRoot({
      serviceName: 'user',
      type: 'postgres',
    }),
    UsersModule,
  ],
})
export class AppModule {}
