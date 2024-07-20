import { Injectable } from '@angular/core';

import { LoadedScript, WebComponent } from '../interfaces/web-components';

@Injectable({
  providedIn: 'root'
})
export class WebComponentsService {
  private loaded: LoadedScript = {};

  private document: any = document;
  private setTimeout: any = setTimeout;

  sleep = (ms: number) => new Promise((resolve) => this.setTimeout(resolve, ms));

  private loadingItem: WebComponent | null = null;
  public loadCode = async (script: WebComponent): Promise<any> => {
    this.loadingItem = script;
    return new Promise(this.handleScriptLoad.bind(this));
  };

  private handleScriptLoad = (resolve: any, reject: any) => {
    if (this.loadingItem === null) return;
    const loading: WebComponent = this.loadingItem;

    if (this.loaded[`script:${loading.tag}`] === true) {
      resolve({ script: loading.tag, loaded: true, status: 'Already loaded.' });
    } else {
      let script = this.document.createElement('script');
      script.type = 'module';
      script.src = loading.location;
      script.onload = () => {
        this.loaded[`script:${loading.tag}`] = true;
        resolve({ script: loading.tag, loaded: true, status: 'Loaded' });
      };
      script.onError = (error: any) => {
        reject({ script: loading.tag, loaded: false, status: 'Error Loading.', error });
      }
      this.document.getElementsByTagName('head')[0].appendChild(script);
    }
  };

  public loadComponent = async (component: WebComponent): Promise<any> => {
    this.loadingItem = component;
    return new Promise(this.handleComponentLoad.bind(this));
  };

  private handleComponentLoad = (resolve: any, reject: any) => {
    if (this.loadingItem === null) return;
    this.sleep(20);
    const loading: WebComponent = this.loadingItem;

    const container: any = this.document.querySelector('#web-component-container');
    const template: any = this.document.querySelector('#web-component-template');
    const content: any = JSON.stringify(loading.data);

    if (this.loaded[`component:${loading.tag}`] === true) {
      const oldElement: any = this.document.querySelector(`[data-key="${loading.key}"]`);
      const oldClone = oldElement.cloneNode(true);
      container.appendChild(oldClone);
      resolve({ component: loading.tag, loaded: true, status: 'Already loaded.' });
    } else {
      const element: any = this.document.createElement(loading.tag);
      element.setAttribute('content', content);
      element.setAttribute('data-key', loading.key);
      template.appendChild(element);
      container.appendChild(element);
      resolve({ component: loading.tag, loaded: true, status: 'Loaded.' });
    }
  };
}
