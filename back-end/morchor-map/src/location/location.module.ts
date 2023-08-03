import { Module } from '@nestjs/common';
import { LocationController } from './controllers/location/location.controller';
import { LocationService } from './services/location/location.service';

@Module({
  controllers: [LocationController],
  providers: [LocationService]
})
export class LocationModule {}
