import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLocationDTO } from '../dto/CreateLocation.dto';

@Injectable()
export class LocationService {
  constructor(
    @InjectModel('Location') private readonly locationModel: Model<Location>,
  ) {}

  getLocationTest(): string {
    return 'Hello Location!';
  }

  async getAllLocation(): Promise<Location[]> {
    return await this.locationModel.find().exec();
  }

  async addLocation(locationDetails: CreateLocationDTO) {
    const exist_location = await this.locationModel.findOne({
      longtitude: locationDetails.longtitude,
      latitude: locationDetails.latitude,
    });

    if (exist_location != null) {
      throw new BadRequestException('You cannot add an exist location.');
    }
    console.log(locationDetails);

    if (
      locationDetails.locationName != null ||
      locationDetails.categoryName != null ||
      locationDetails.latitude != null ||
      locationDetails.longtitude != null
    ) {
      const newLocation = new this.locationModel({
        locationName: locationDetails.locationName,
        categoryName: locationDetails.categoryName,
        img: locationDetails.img,
        houseNumber: locationDetails.houseNumber,
        villageNumber: locationDetails.villageNumber,
        alley: locationDetails.alley,
        subDistrict: locationDetails.subDistrict,
        district: locationDetails.district,
        postalCode: locationDetails.postalCode,
        latitude: locationDetails.latitude,
        longtitude: locationDetails.longtitude,
      });
      await newLocation.save();
      return { msg: 'Add location successful.', id: newLocation.id };
    } else {
      throw new BadRequestException(
        'You need to put all required fields to add location.',
      );
    }
  }
}
