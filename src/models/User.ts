import { Schema, model, Document } from "mongoose";

export interface IUser {
  name: string;
  surname: string;
  nickname: string;
  email: string;
  password: string;
  personalAccessKey?: string;
}

const userSchema = new Schema<IUser & Document>({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  nickname: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  personalAccessKey: { type: String, required: false },
});

const User = model<IUser & Document>("User", userSchema);

export default User;
