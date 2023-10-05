import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class LocationService {
  constructor(
    @InjectModel('Location') private readonly locationModel: Model<Location>,
  ) {}

  getLocationTest(): string {
    return 'Hello Location!';
  }
}
