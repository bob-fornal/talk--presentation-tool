export interface LoadedScript {
  [tag: string]: boolean;
}

export interface WebComponent {
  tag: string;
  location: string;

  key?: string;
  data?: string;
}