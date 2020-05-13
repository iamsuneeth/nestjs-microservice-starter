import * as fs from 'fs';
import * as dotenv from 'dotenv';
import { DBConfigService } from '@app/db';
import { join } from 'path';
dotenv.config();

const ormConfig = new DBConfigService().getTypeOrmConfig({
  serviceName: 'user',
  type: 'postgres',
});
fs.writeFileSync(
  join(__dirname, '../ormconfig.json'),
  JSON.stringify(ormConfig, null, 2),
);
