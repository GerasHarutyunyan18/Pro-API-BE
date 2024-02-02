import { Schema, model, Document } from 'mongoose';

export interface IUser {
  name: string;
  surname: string;
  nickname: string;
  email: string;
  password: string;
  personalAccessKey?: string
}

const userSchema = new Schema<IUser & Document>({
  name: { type: String, required: true },
  surname: { type: String, require: true },
  nickname: { type: String, require: true, unique: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  personalAccessKey: { type: String, require: false }
});

const User = model<IUser & Document>('User', userSchema);

export default User;
