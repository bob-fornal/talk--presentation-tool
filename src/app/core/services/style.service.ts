import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StyleService {

  add = (css: string): void => {
    const head = document.querySelector('head');
    const style = document.createElement('style');
    style.type = 'text/css';
    const node = document.createTextNode(css);
    style.appendChild(node);
    head?.appendChild(style);
  };

}
