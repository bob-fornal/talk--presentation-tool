import { Tag } from "./tag";

export interface Talk {
  folder: string;
  title: string;
  tags: Array<string>;

  highlight?: boolean;
  pdf?: string;
  pdfActive?: boolean;
}

export interface Talks {
  STYLE: Array<string>;
  TAGS: Array<Tag>;
  TALKS: Array<Talk>;
}
