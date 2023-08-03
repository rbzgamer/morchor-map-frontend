import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
  prefix: String,
  firstName: String,
  lastName: String,
});

export interface Users {
  id: number;
  perfix: string;
  firstName: string;
  lastName: string;
}
