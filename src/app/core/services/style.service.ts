import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StyleService {
  document: any = document;

  add = (css: string): void => {
    const head = this.document.querySelector('head');
    const style = this.document.createElement('style');
    style.type = 'text/css';
    const node = this.document.createTextNode(css);
    style.appendChild(node);
    head?.appendChild(style);
  };
}
