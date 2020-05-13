import { Module, Global } from '@nestjs/common';
import { ClientModule } from './client/client.module';
@Global()
@Module({
  imports: [ClientModule],
  exports: [ClientModule],
})
export class CommonModule {}
