import { Trigger } from "./triggers";

export type OrderType = Array<string>;

export type StyleType = Array<string>;

export type StructureType = {
  title: string;
  type: string;
  author?: string;
  bio1?: string;
  bio2?: string;

  html?: string;
  panel?: string;

  tag?: string;
  location?: string;
  data?: any;

  orientation?: string;
  table?: Array<Array<string>>;
  text1?: string;
  text2?: string;
  text3?: string;
  image?: string;
  imageClass?: string;

  notes?: string;
  script?: string;
  folder?: string;
  files?: Array<string>;
  triggers?: Array<Trigger>;
  environment_keys?: Array<string>;
}

export interface Structure {
  ORDER: OrderType;
  STYLE: StyleType;
  [key: string]: OrderType | StructureType | StyleType | string | boolean;
}
