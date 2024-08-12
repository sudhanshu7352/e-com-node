import mongoose, { Schema, Document } from 'mongoose';

export interface TUser extends Document {
  email: string;
  password: string;
  role: string;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'super-admin'], default: 'user' }
});

export default mongoose.model<TUser>('User', UserSchema);
