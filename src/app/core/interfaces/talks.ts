import { Tag } from "./tag";

export interface Talk {
  folder: string;
  title: string;
  tags: Array<string>;

  pdf?: string;
  pdfActive?: boolean;
}

export interface Talks {
  STYLE: Array<string>;
  TAGS: Array<Tag>;
  TALKS: Array<Talk>;
}
