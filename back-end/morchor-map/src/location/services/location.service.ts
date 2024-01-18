import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Location } from '../model/location.model';
import { CreateLocationDTO } from '../dto/CreateLocation.dto';
import { UpdateLocationDTO } from '../dto/UpdateLocation.dto';
import { AddLocationNameDTO } from '../dto/AddLocationName.dto';
import { SearchLocationDTO } from '../dto/SearchLocation.dto';
import { CategoriesResponseDTO } from '../dto/CategoriesResponse.dto';
import { RoomResponseDTO } from '../dto/RoomResponse.dto';

@Injectable()
export class LocationService {
  constructor(
    @InjectModel('Location') private readonly locationModel: Model<Location>,
  ) {}

  getLocationTest(): string {
    return 'Hello Location!';
  }

  async getLocation(searchLocationDTO: SearchLocationDTO): Promise<Location[]> {
    if (searchLocationDTO.locationName && searchLocationDTO.category) {
      return await this.locationModel
        .find({
          $and: [
            ...(searchLocationDTO.locationName
              ? [
                  {
                    $or: [
                      {
                        locationName: {
                          $regex: searchLocationDTO.locationName,
                          $options: 'i',
                        },
                      },
                      {
                        room: {
                          $regex: searchLocationDTO.locationName,
                          $options: 'i',
                        },
                      },
                    ],
                  },
                ]
              : []),
            {
              category: {
                $regex: searchLocationDTO.category,
                $options: 'i',
              },
            },
          ],
        })
        .sort({ category: 1 })
        .exec();
    } else if (!searchLocationDTO.locationName && searchLocationDTO.category) {
      return await this.locationModel
        .find({
          category: {
            $regex: searchLocationDTO.category,
            $options: 'i',
          },
        })
        .sort({ category: 1 })
        .exec();
    } else if (searchLocationDTO.locationName && !searchLocationDTO.category) {
      return await this.locationModel
        .find({
          $or: [
            {
              locationName: {
                $regex: searchLocationDTO.locationName,
                $options: 'i',
              },
            },
            {
              room: {
                $regex: searchLocationDTO.locationName,
                $options: 'i',
              },
            },
          ],
        })
        .sort({ category: 1 })
        .exec();
    } else {
      return await this.locationModel.find().sort({ category: 1 }).exec();
    }
  }

  async addLocation(locationDetails: CreateLocationDTO) {
    const exist_location = await this.locationModel.findOne({
      longtitude: locationDetails.longtitude,
      latitude: locationDetails.latitude,
    });

    if (exist_location != null) {
      throw new BadRequestException('You cannot add an exist location.');
    }

    if (
      locationDetails.locationName != null ||
      locationDetails.category != null ||
      locationDetails.latitude != null ||
      locationDetails.longtitude != null
    ) {
      const newLocation = new this.locationModel({
        locationName: locationDetails.locationName,
        category: locationDetails.category,
        img: locationDetails.img,
        latitude: locationDetails.latitude,
        longtitude: locationDetails.longtitude,
        room: locationDetails.room,
      });
      await newLocation.save();
      return { msg: 'Add location successful.', id: newLocation.id };
    } else {
      throw new BadRequestException(
        'You need to put all required fields to add location.',
      );
    }
  }

  async updateLocation(id: string, updateLocationDetails: UpdateLocationDTO) {
    if (updateLocationDetails.locationName) {
      await this.locationModel.updateOne(
        { _id: id },
        { locationName: updateLocationDetails.locationName },
      );
    }

    if (updateLocationDetails.category) {
      await this.locationModel
        .updateOne({ _id: id }, { category: updateLocationDetails.category })
        .exec();
    }

    if (updateLocationDetails.img) {
      await this.locationModel
        .updateOne({ _id: id }, { img: updateLocationDetails.img })
        .exec();
    }

    if (updateLocationDetails.latitude) {
      await this.locationModel
        .updateOne({ _id: id }, { latitude: updateLocationDetails.latitude })
        .exec();
    }

    if (updateLocationDetails.longtitude) {
      await this.locationModel
        .updateOne(
          { _id: id },
          { longtitude: updateLocationDetails.longtitude },
        )
        .exec();
    }

    if (updateLocationDetails.room) {
      await this.locationModel
        .updateOne({ _id: id }, { room: updateLocationDetails.room })
        .exec();
    }

    return {
      msg: 'Update location successful.',
      updatedFields: updateLocationDetails,
    };
  }

  async deleteLocation(id: string) {
    return await this.locationModel.findOneAndDelete({ _id: id }).exec();
  }

  async addLocationName(id: string, nameList: AddLocationNameDTO) {
    const location = await this.locationModel.findById(id).exec();

    if (!location) {
      throw new NotFoundException('Location not found');
    }

    location.locationName = [
      ...location.locationName,
      ...nameList.locationName,
    ];

    return await location.save();
  }

  async getAllCategories(): Promise<CategoriesResponseDTO> {
    const categories = await this.locationModel.distinct('category').exec();
    const dto: CategoriesResponseDTO = {
      categories: categories,
    };
    return dto;
  }

  async getAllRoomsByLocationName(
    locationName: string,
  ): Promise<RoomResponseDTO> {
    const location = await this.locationModel
      .findOne({ locationName: locationName })
      .exec();
    if (!location) {
      throw new NotFoundException(
        'Location name : `' + locationName + '` not found.',
      );
    }
    const rooms = location.room;
    const dto: RoomResponseDTO = {
      rooms: rooms,
    };
    console.log(location);
    return dto;
  }
}
