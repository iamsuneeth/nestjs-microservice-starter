import { Injectable, NotImplementedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IDatabaseModuleForRoot } from './db.module';

@Injectable()
export class DBConfigService {
  private configMap;
  private isCli = false;
  constructor(config?: ConfigService) {
    if (config) {
      this.configMap = config;
    } else {
      this.isCli = true;
      this.configMap = {
        get: (key: string) => process.env[key],
      };
    }
  }

  getTypeOrmConfig({
    serviceName,
    type,
    configOverrides,
  }: IDatabaseModuleForRoot) {
    if (type === 'postgres') {
      return {
        type: 'postgres',
        ...(!this.isCli && { autoLoadEntities: true }),
        host: this.configMap.get(`${serviceName}_db_postgres_host`),
        port: parseInt(this.configMap.get(`${serviceName}_db_postgres_port`)),
        username: this.configMap.get(`${serviceName}_db_postgres_username`),
        password: this.configMap.get(`${serviceName}_db_postgres_password`),
        database: this.configMap.get(`${serviceName}_db_postgres_database`),
        ...(this.isCli && {
          entities: [`apps/service-${serviceName}/src/**/*.entity.ts`],
          migrations: [`apps/service-${serviceName}/src/migrations/*.ts`],
          cli: {
            migrationsDir: `apps/service-${serviceName}/src/migrations`,
          },
          seeds: [`apps/service-${serviceName}/src/seeding/seed/**/*.seed.ts`],
          factories: [
            'apps/service-${serviceName}/src/seeding/factory/**/*.factory.ts',
          ],
        }),
        ...(configOverrides as any),
      };
    }
    throw new NotImplementedException('Other databases are not implemented');
  }
}
