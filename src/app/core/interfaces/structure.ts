export type OrderType = Array<string>;

export type StyleType = Array<string>;

export type StructureType = {
  title: string;
  type: string;
  author?: string;
  bio1?: string;
  bio2?: string;

  html?: string;

  orientation?: string;
  text?: string;
  textLeft?: string;
  textRight?: string;
  image?: string;

  folder?: string;
  files?: Array<string>;
}

export interface Structure {
  ORDER: OrderType;
  STYLE: StyleType;
  [key: string]: OrderType | StructureType | StyleType;
}
