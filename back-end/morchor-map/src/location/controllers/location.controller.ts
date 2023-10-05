import { Controller, Get } from '@nestjs/common';
import { LocationService } from '../services/location.service';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get('/test')
  getLocationTest(): string {
    return this.locationService.getLocationTest();
  }
}
