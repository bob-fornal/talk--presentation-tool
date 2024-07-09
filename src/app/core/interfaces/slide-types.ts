import { Trigger } from "./triggers";

export interface SlideType {
  title: string;
  key: string;
}

export interface SlideItemDetail {
  title: string;
  type: string;
}

export interface SlideEmpty {
  title: string;
  type: string;
  notes: string;

  author?: string;
  bio1?: string;
  bio2?: string;
  files?: Array<string>;
  folder?: string;
  fontsize?: string | undefined;
  image?: string;
  imageClass?: string;
  keys?: Array<string>;
  orientation?: string;
  panel?: string | undefined;
  path?: string;
  text1?: string;
  text2?: string;
  text3?: string;
  triggers?: Array<Trigger>;
}

export interface SlideStructure {
  EMPTY: SlideEmpty,
  ORDER: Array<string>,

  title: SlideItemDetail,
  notes: SlideItemDetail,

  author?: SlideItemDetail,
  bio1?: SlideItemDetail,
  bio2?: SlideItemDetail,
  files?: SlideItemDetail;
  folder?: SlideItemDetail;
  fontsize?: SlideItemDetail;
  image?: SlideItemDetail;
  imageClass?: SlideItemDetail;
  keys?: SlideItemDetail;
  orientation?: SlideItemDetail;
  panel?: SlideItemDetail;
  path?: SlideItemDetail;
  text1?: SlideItemDetail;
  text2?: SlideItemDetail;
  text3?: SlideItemDetail;
  triggers?: SlideItemDetail;
}
