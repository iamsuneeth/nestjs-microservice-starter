import { Module, Global } from '@nestjs/common';
import { GrpcClientProvider } from '../providers';
@Global()
@Module({
  providers: [GrpcClientProvider],
  exports: [GrpcClientProvider],
})
export class GrpcModule {}
