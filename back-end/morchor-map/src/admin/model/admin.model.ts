import * as mongoose from 'mongoose';

export const AdminSchema = new mongoose.Schema({
  cmuAcc: String,
});

export interface Admin {
  id: string;
  cmuAcc: string;
}
