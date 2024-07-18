import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { CodeService } from './code.service';
import { of } from 'rxjs';
import { Structure } from '../interfaces/structure';

describe('CodeService', () => {
  let service: CodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ]
    });
    service = TestBed.inject(CodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('expects "init" to get and set the talk data', async () => {
    const talks: any = { STYLE: [], TAGS: [], TALKS: [] };
    spyOn(service['http'], 'get').and.returnValue(of(talks));
    spyOn(service.talks, 'next').and.stub();

    await service.init();
    expect(service.talks.next).toHaveBeenCalledWith(talks);
  });

  it('expects "getStructure" to set a talk structure', async () => {
    const folder: string = 'FOLDER';
    const talk: Structure = { ORDER: [], STYLE: [] };
    spyOn(service['http'], 'get').and.returnValue(of(talk));
    spyOn(service.structure, 'next').and.stub();

    await service.getStructure(folder);
    expect(service.structure.next).toHaveBeenCalledWith(talk);
  });

  it('expects "getStructureImmediate" to set a talk structure', async () => {
    const folder: string = 'FOLDER';
    const talk: Structure = { ORDER: [], STYLE: [] };
    spyOn(service['http'], 'get').and.returnValue(of(talk));

    const result: Structure = await service.getStructureImmediate(folder);
    expect(result).toEqual(talk);
  });

  it('expects "getCode" to get code', async () => {
    const filepath: string = 'FILEPATH';
    const file: string = 'FILE';
    spyOn(service['http'], 'get').and.returnValue(of(file));

    const result: string = await service.getCode(filepath);
    expect(result).toEqual(file);
  });

  it('expects "checkLink" to return true', async () => {
    const url: string = 'http://testing.com';
    const workingUrl: string = 'WORKING-URL';
    const file: any = {};
    spyOn(service, 'processUrl').and.returnValue(workingUrl);
    spyOn(service['http'], 'get').and.returnValue(of(file));

    const result: boolean = await service.checkLink(url);
    expect(result).toEqual(true);
  });

  it('expects "checkLink" to return false', async () => {
    const url: string = 'http://testing.com';
    const workingUrl: string = 'WORKING-URL';
    const error: Error = new Error('TEST ERROR');
    spyOn(service, 'processUrl').and.returnValue(workingUrl);
    spyOn(service['http'], 'get').and.throwError(error);

    const result: boolean = await service.checkLink(url);
    expect(result).toEqual(false);
  });

  it('expects "processUrl" to fix an http URL', () => {
    const url: string = 'http://www.testing.com/name=bob';
    const host: string = 'www.testing.com';
    const hostname: string = 'testing.com';

    const result: string = service.processUrl(url, host, hostname);
    expect(result).toEqual('http://testing.com/name=bob')
  });

  it('expects "processUrl" to fix an https URL', () => {
    const url: string = 'https://www.testing.com/name=bob';
    const host: string = 'www.testing.com';
    const hostname: string = 'localhost:4200';

    const result: string = service.processUrl(url, host, hostname);
    expect(result).toEqual('http://localhost:4200/name=bob')
  });
});
