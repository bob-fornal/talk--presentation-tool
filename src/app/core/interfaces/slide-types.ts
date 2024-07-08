export interface SlideType {
  title: string;
  key: string;
}

export interface SlideItemDetail {
  title: string;
  type: string;
}

export interface SlideStructure {
  EMPTY: {
    title: string;
    type: string;
    notes: string;

    author?: string;

    bio1?: string;
    bio2?: string;
  },
  ORDER: Array<string>,

  title: SlideItemDetail,
  notes: SlideItemDetail,

  author?: SlideItemDetail,
  bio1?: SlideItemDetail,
  bio2?: SlideItemDetail,
}
