import { Injectable } from '@angular/core';

import { LoadedScript, WebComponent } from '../interfaces/web-components';

@Injectable({
  providedIn: 'root'
})
export class WebComponentsService {
  private loaded: LoadedScript = {};

  private document: any = document;

  private loadingScript: WebComponent | null = null;
  public load = async (script: WebComponent) => {
    this.loadingScript = script;
    return new Promise(this.handleComponentLoad.bind(this));
  };

  private handleComponentLoad = (resolve: any, reject: any) => {
    if (this.loadingScript === null) return;
    const loading: WebComponent = this.loadingScript;

    if (this.loaded[loading.tag] === true) {
      reject({ script: loading.tag, loaded: true, status: 'Already loaded.' });
    } else {
      let script = this.document.createElement('script');
      script.type = 'module';
      script.src = loading.location;
      script.onload = () => {
        this.loaded[loading.tag] = true;
        resolve({ script: loading.tag, loaded: true, status: 'Loaded' });
      };
      script.onError = (error: any) => {
        reject({ script: loading.tag, loaded: false, status: 'Error Loading.', error });
      }
      this.document.getElementsByTagName('head')[0].appendChild(script);
    }
  };
}
