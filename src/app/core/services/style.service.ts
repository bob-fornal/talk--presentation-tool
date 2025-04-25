import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StyleService {
  document: any = document;
  storage: any = localStorage;

  add = (css: string): void => {
    if (css === '') return;

    const head = this.document.querySelector('head');

    const exists = head.querySelector('[data-type="PRIMARY-CSS"]');
    const node = this.document.createTextNode(css);

    if (exists === null) {
      const style = this.document.createElement('style');
      style.type = 'text/css';
      style.setAttribute('data-type', 'PRIMARY-CSS');
      style.appendChild(node);
      head?.appendChild(style);
      } else {
      exists.replaceChildren(node);
    }
  };

  setTemplate = (template: string): void => {
    this.storage.setItem('template', template);
  };

  getTemplate = (): string => {
    return this.storage.getItem('template');
  };
}
