import * as mongoose from 'mongoose';

export const LocationSchema = new mongoose.Schema({
  locationName: {
    type: [String],
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  img: {
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
  room: {
    type: [String],
  },
});

export interface Location {
  id: string;
  locationName: string[];
  category: string;
  img: string;
  latitude: string;
  longtitude: string;
  room: string[];
}
