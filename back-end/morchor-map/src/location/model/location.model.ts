import * as mongoose from 'mongoose';

export const LocationSchema = new mongoose.Schema({
  locationName: {
    type: [String],
    require: true,
  },
  categoryName: {
    type: String,
    require: true,
  },
  img: {
    type: String,
  },
  houseNumber: {
    type: Number,
  },
  villageNumber: {
    type: Number,
  },
  alley: {
    type: String,
  },
  subDistrict: {
    type: String,
  },
  district: {
    type: String,
  },
  postalCode: {
    type: String,
  },
  latitude: {
    type: String,
    require: true,
  },
  longtitude: {
    type: String,
    require: true,
  },
});

export interface Location {
  id: string;
  locationName: string[];
  categoryName: string;
  img: string;
  houseNumber: number;
  villageNumber: number;
  alley: string;
  subDistrict: string;
  district: string;
  postalCode: string;
  latitude: string;
  longtitude: string;
}
