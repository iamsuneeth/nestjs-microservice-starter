import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/db';
import { ServiceMapModule } from './modules/service-map/service-map.module';
import { RoleModule } from './modules/role/role.module';

@Module({
  imports: [
    DatabaseModule.forRoot({
      serviceName: 'role',
      type: 'postgres',
    }),
    RoleModule,
    ServiceMapModule,
  ],
})
export class AppModule {}
