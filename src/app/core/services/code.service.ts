import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { Talks } from '../interfaces/talks';
import { Structure } from '../interfaces/structure';

@Injectable({
  providedIn: 'root'
})
export class CodeService {
  talks: BehaviorSubject<Talks> = new BehaviorSubject<Talks>({ STYLE: [], TAGS: [], TALKS: []});
  structure: BehaviorSubject<Structure> = new BehaviorSubject<Structure>({ ORDER: [], STYLE: [] });

  constructor(private http: HttpClient) {}

  init = async (): Promise<void> => {
    const talks: any = await firstValueFrom(this.http.get('./assets/talks.json'));
    this.talks.next(talks);
  };

  getStructure = async (folder: string): Promise<any> => {
    const structure: any = await firstValueFrom(this.http.get(`./assets/${ folder }/structure.json`));
    this.structure.next(structure);
  };

  getStructureImmediate = async (folder: string): Promise<Structure> => {
    const structure: any = await firstValueFrom(this.http.get(`./assets/${ folder }/structure.json`));
    return structure;
  };

  getCode = async (filepath: string): Promise<string> => {
    const file: string = await firstValueFrom(this.http.get(filepath, { responseType: 'text' }));
    return file;
  };

  checkLink = async (url: string): Promise<boolean> => {
    const work: any = new URL(url);
    const hostname = window.location.host;
    let newUrl: string = url.replace(work.host, hostname);
    if (url.includes('localhost') === true) {
      newUrl = newUrl.replace('https://', 'http://');
    }

    try {
      const file = await firstValueFrom(this.http.get(newUrl));
      return true;
    } catch (error: any) {
      console.log('failed', error);
      return error.status === 200;
    }
  }

  // retrieve = async (talkIndex: number, section: string, filename: string): Promise<string> => {
  //   const talkFolder: string = this.talks.value[talkIndex].folder;
  //   const codeFolder: string = this.structures[section].folder;
  //   const file: string = await firstValueFrom(this.http.get(`./assets/${ talkFolder }/${ codeFolder }/${ filename }`, { responseType: 'text' }));
  //   return file;
  // };

}
