import { ValueTypes } from "./enum";

export type Parameter = {
  name: string;
  type?: ValueTypes;
  description?: string;
};

export type Header = {
  key: string;
  value: string;
};
