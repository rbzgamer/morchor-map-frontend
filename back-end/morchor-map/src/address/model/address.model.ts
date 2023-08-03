import * as mongoose from 'mongoose';

export const AddressSchema = new mongoose.Schema({
  houstNumber: Number,
  villageNumber: Number,
  alley: String,
  subDistrict: String,
  district: String,
  postalCode: String,
  latitude: String,
  longtitude: String,
});

export interface Address {
  id: number;
  houseNumber: number;
  villageNumber: number;
  alley: string;
  subDistrict: string;
  district: string;
  postalCode: string;
  latitude: string;
  longtitude: string;
}
