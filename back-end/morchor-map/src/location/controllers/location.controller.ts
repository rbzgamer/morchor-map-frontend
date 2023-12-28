import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { Location } from '../model/location.model';
import { LocationService } from '../services/location.service';
import { CreateLocationDTO } from '../dto/CreateLocation.dto';
import { UpdateLocationDTO } from '../dto/UpdateLocation.dto';
import { AddLocationNameDTO } from '../dto/AddLocationName.dto';
import { SearchLocationDTO } from '../dto/SearchLocation.dto';

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

  @Get('/:id')
  async getById(@Param('id') id: string): Promise<Location> {
    return await this.locationService.getLocationById(id);
  }

  @Post('/add')
  async addLocation(@Body() locationDetails: CreateLocationDTO) {
    return await this.locationService.addLocation(locationDetails);
  }

  @Patch('/:id/update')
  async updateLocation(
    @Param('id') id: string,
    @Body() UpdateLocationDetails: UpdateLocationDTO,
  ) {
    return await this.locationService.updateLocation(id, UpdateLocationDetails);
  }

  @Delete('/:id')
  async deleteLocation(@Param('id') id: string) {
    return await this.locationService.deleteLocation(id);
  }

  @Patch('/:id/add-location-name')
  async addLocationName(
    @Param('id') id: string,
    @Body() nameList: AddLocationNameDTO,
  ) {
    return await this.locationService.addLocationName(id, nameList);
  }

  @Get()
  async searchLocaiton(@Body() searchLocationDTO: SearchLocationDTO) {
    return await this.locationService.searchLocation(searchLocationDTO);
  }
}
