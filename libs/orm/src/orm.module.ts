import { Module } from '@nestjs/common';
import { OrmService } from './orm.service';

@Module({
  providers: [OrmService],
  exports: [OrmService],
})
export class OrmModule {}
