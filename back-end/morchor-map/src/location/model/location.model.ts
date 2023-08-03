import * as mongoose from 'mongoose';

export const LocationSchema = new mongoose.Schema({
  name: String,
  img: String,
  addrId: Number,
  catId: Number,
});

export interface Location {
  id: number;
  name: string;
  img: string;
  addrId: number;
  catId: number;
}
