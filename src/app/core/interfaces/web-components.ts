export interface LoadedScript {
  [tag: string]: boolean;
}

export interface WebComponent {
  tag: string;
  location: string;
  type: 'module' | 'text/javascript';

  key?: string;
  data?: string;
}
