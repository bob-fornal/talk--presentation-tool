import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CodeService {
  talks: Array<any> = [];
  structures: any;

  constructor(private http: HttpClient) {}

  init = async (): Promise<void> => {
    const talks: any = await firstValueFrom(this.http.get('/assets/talks.json'));
    this.talks = talks;
    console.log(talks);
  };

  getStructure = async (talkIndex: number): Promise<any> => {
    const folder: string = this.talks[talkIndex].folder;
    const structure: any = await firstValueFrom(this.http.get(`/assets/${ folder }/structure.json`));
    this.structures = structure;
    return structure;
  };

  retrieve = async (talkIndex: number, section: string, filename: string): Promise<string> => {
    const talkFolder: string = this.talks[talkIndex].folder;
    const codeFolder: string = this.structures[section].folder;
    const file: string = await firstValueFrom(this.http.get(`/assets/${ talkFolder }/${ codeFolder }/${ filename }`, { responseType: 'text' }));
    return file;
  };

}
