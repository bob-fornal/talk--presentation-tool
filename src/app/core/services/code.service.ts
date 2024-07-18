import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

import { Structure } from '../interfaces/structure';
import { Talks } from '../interfaces/talks';

@Injectable({
  providedIn: 'root'
})
export class CodeService {
  talks: BehaviorSubject<Talks> = new BehaviorSubject<Talks>({ STYLE: [], TAGS: [], TALKS: []});
  structure: BehaviorSubject<Structure> = new BehaviorSubject<Structure>({ ORDER: [], STYLE: [] });

  constructor(private http: HttpClient) {}

  init = async (): Promise<void> => {
    const talks: any = await firstValueFrom(this.http.get('./assets/talks/talks.json'));
    this.talks.next(talks);
  };

  getStructure = async (folder: string): Promise<any> => {
    const structure: Structure = (await firstValueFrom(this.http.get(`./assets/talks/${ folder }/structure.json`)) as Structure);
    this.structure.next(structure);
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
}
