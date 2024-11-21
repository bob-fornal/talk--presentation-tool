import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

import { LoadedScript, WebComponent } from '../interfaces/web-components';
import { Structure, StructureType } from '../interfaces/structure';
import { Talks } from '../interfaces/talks';

@Injectable({
  providedIn: 'root'
})
export class CodeService {
  private loaded: LoadedScript = {};

  private document: any = document;
  private setTimeout: any = setTimeout;

  private loadingItem: WebComponent | null = null;

  talks: BehaviorSubject<Talks> = new BehaviorSubject<Talks>({ STYLE: [], TAGS: [], TALKS: []});
  structure: BehaviorSubject<Structure> = new BehaviorSubject<Structure>({ ORDER: [], STYLE: [] });

  constructor(private http: HttpClient) {}

  sleep = (ms: number) => new Promise((resolve) => this.setTimeout(resolve, ms));

  init = async (): Promise<void> => {
    const talks: any = await firstValueFrom(this.http.get('./assets/talks/talks.json'));
    this.talks.next(talks);
  };

  getStructure = async (folder: string): Promise<any> => {
    const structure: Structure = (await firstValueFrom(this.http.get(`./assets/talks/${ folder }/structure.json`)) as Structure);
    const tempStructure: Structure = { ORDER: [], STYLE: structure.STYLE };

    structure.ORDER.forEach((key: string) => {
      const objValue: StructureType = (structure[key] as StructureType);
      if (objValue.hasOwnProperty('visibility') === false || objValue.visibility === true) {
        tempStructure.ORDER.push(key);
        tempStructure[key] = structure[key];
      }
    });
    
    this.structure.next(tempStructure);
  };

  getStructureImmediate = async (folder: string): Promise<Structure> => {
    const structure: Structure = (await firstValueFrom(this.http.get(`./assets/talks/${ folder }/structure.json`)) as Structure);
    return structure;
  };

  getCode = async (filepath: string): Promise<string> => {
    const file: string = await firstValueFrom(this.http.get(filepath, { responseType: 'text' }));
    return file;
  };

  checkLink = async (url: string): Promise<boolean> => {
    const work: any = new URL(url);
    const hostname = window.location.host;
    const workingUrl: string = this.processUrl(url, work.host, hostname);

    try {
      const file = await firstValueFrom(this.http.get(workingUrl));
      return true;
    } catch (issue: any) {
      return issue.status === 200;
    }
  };

  processUrl = (url: string, host: string, hostname: string): string => {
    let workingUrl: string = url.replace(host, hostname);
    if (hostname === 'localhost:4200') {
      workingUrl = workingUrl.replace('https://', 'http://');
    }
    return workingUrl;
  };

  public loadScript = async (script: WebComponent): Promise<any> => {
    this.loadingItem = script;
    return new Promise(this.handleScriptLoad.bind(this));
  };

  private handleScriptLoad = (resolve: any, reject: any) => {
    if (this.loadingItem === null) {
      reject({ script: 'UNKNOWN', loaded: false, status: 'No component listed.' });
    };

    const loading: WebComponent = this.loadingItem! as WebComponent;

    if (this.loaded[`component-script:${loading.tag}`] === true) {
      this.loadingItem = null;
      resolve({ script: loading.tag, loaded: true, status: 'Already loaded.' });
    } else {
      let script = this.document.createElement('script');
      script.type = loading.type;
      script.setAttribute('data-loaded-script', loading.tag);
      script.src = loading.location;
      script.onload = () => {
        this.loaded[`component-script:${loading.tag}`] = true;
        this.loadingItem = null;
        resolve({ script: loading.tag, loaded: true, status: 'Loaded' });
      };
      script.onError = (error: any) => {
        this.loadingItem = null;
        reject({ script: loading.tag, loaded: false, status: 'Error Loading.', error });
      }
      this.document.getElementsByTagName('head')[0].appendChild(script);
    }
  };
  
  public loadComponent = async (component: WebComponent): Promise<any> => {
    this.loadingItem = component;
    return new Promise(this.handleComponentLoad.bind(this));
  };

  private handleComponentLoad = async (resolve: any, reject: any) => {
    if (this.loadingItem === null) {
      this.loadingItem = null;
      reject({ script: 'UNKNOWN', loaded: false, status: 'No component listed.' });
    };

    const loading: WebComponent = this.loadingItem! as WebComponent;
 
    const template: any = this.document.querySelector('#web-component-template');
    const content: any = JSON.stringify(loading.data);

    const container = await this.getContainer();

    if (this.loaded[`component:${loading.tag}`] === true) {
      const oldElement: any = this.document.querySelector(`[data-key="${loading.key}"]`);
      const oldClone = oldElement.cloneNode(true);

      container.appendChild(oldClone);
      this.loadingItem = null;
      resolve({ component: loading.tag, loaded: true, status: 'Already loaded.' });
    } else {
      const element: any = this.document.createElement(loading.tag);
      element.setAttribute('content', content);
      element.setAttribute('data-key', loading.key);

      template.appendChild(element);
      const newClone = element.cloneNode(true);
      container.appendChild(newClone);

      this.loaded[`component:${loading.tag}`] = true;
      this.loadingItem = null;
      resolve({ component: loading.tag, loaded: true, status: 'Loaded.' });
    }
  };

  private getContainer = async (): Promise<any> => {
    const container: any = this.document.querySelector('#web-component-container');
    if (container !== null) return container;

    await this.sleep(20);
    return this.getContainer();
  };
}
