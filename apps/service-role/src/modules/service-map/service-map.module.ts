import { Module } from '@nestjs/common';
import { ServiceMapService } from './service-map.service';
import { ServiceMapController } from './service-map.controller';

@Module({
  providers: [ServiceMapService],
  controllers: [ServiceMapController]
})
export class ServiceMapModule {}
