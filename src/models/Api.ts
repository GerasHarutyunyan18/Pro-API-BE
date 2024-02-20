import { Schema, model, Document } from "mongoose";
import { HttpRequestMethods, ValueTypes } from "../constants/enum";
import { Header, Parameter } from "../constants/types";

export interface IApi {
  method: HttpRequestMethods;
  appId: string;
  endpoint: string;
  params: Parameter[];
  body: string;
  headers: Header[];
}

const parameterSchema = new Schema<Parameter>({
  name: { type: String, required: true },
  type: { type: String },
  description: { type: String },
});

const headerSchema = new Schema<Header>({
  key: { type: String, required: true },
  value: { type: String, required: true },
});

const apiSchema = new Schema<IApi & Document>({
  method: { type: String, required: true },
  appId: { type: String, required: true },
  endpoint: { type: String, required: true },
  params: { type: [parameterSchema] },
  body: { type: String },
  headers: { type: [headerSchema] },
});

const Api = model<IApi & Document>("Api", apiSchema);

export default Api;
