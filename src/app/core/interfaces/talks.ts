import { Tag } from "./tag";

export interface Talk {
  folder: string;
  title: string;
  pdf?: string;
  tags: Array<string>;
}

export interface Talks {
  STYLE: Array<string>;
  TAGS: Array<Tag>;
  TALKS: Array<Talk>;
}
