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

  orientation?: string;
  text?: string;
  textLeft?: string;
  textRight?: string;
  text1?: string;
  text2?: string;
  text3?: string;
  image?: string;

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
  [key: string]: OrderType | StructureType | StyleType;
}
