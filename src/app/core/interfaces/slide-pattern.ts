export interface SlidePattern {
  title: string;
  data: Array<SlideDataPattern>;
}

export interface SlideDataPattern {
  key: string;
  title: string;
  required: boolean;
  codeAdjust: boolean;
}
