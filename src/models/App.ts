import { Schema, model, Document } from "mongoose";

export interface IApp {
  ownerId: string;
  name: string;
  type: string;
  industry: string;
  domain: string;
  description: string;
}

const userSchema = new Schema<IApp & Document>({
  ownerId: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  industry: { type: String, required: true },
  domain: { type: String, required: true },
  description: { type: String },
});

const App = model<IApp & Document>("App", userSchema);

export default App;
