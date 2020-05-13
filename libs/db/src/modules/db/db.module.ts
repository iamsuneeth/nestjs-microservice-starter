import { Module, DynamicModule, Global } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DatabaseType } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { DBConfigService } from './db.service';

export interface IDatabaseModuleForRoot {
  serviceName: string;
  type?: DatabaseType;
  configOverrides?: Partial<Omit<TypeOrmModuleOptions, 'type'>>;
}

@Global()
@Module({})
export class DatabaseModule {
  static forRoot(props: IDatabaseModuleForRoot): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRootAsync({
          inject: [ConfigService],
          useFactory: (config: ConfigService) =>
            new DBConfigService(config).getTypeOrmConfig(props),
        }),
      ],
    };
  }
}
