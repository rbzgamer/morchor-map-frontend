import { Body, Controller, Get, Post } from '@nestjs/common';
import { LocationService } from '../services/location.service';
import { CreateLocationDTO } from '../dto/CreateLocation.dto';

@Controller('api/location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get('/test')
  getLocationTest(): string {
    return this.locationService.getLocationTest();
  }

  @Get('/')
  async getAllLocation(): Promise<Location[]> {
    return await this.locationService.getAllLocation();
  }

  @Post('/add')
  async addLocation(@Body() locationDetails: CreateLocationDTO) {
    return await this.locationService.addLocation(locationDetails);
  }
}
