import { TestBed } from '@angular/core/testing';

import { StyleService } from './style.service';

describe('StyleService', () => {
  let service: StyleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StyleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('expects "add" to append a style string', () => {
    const css: string = 'CSS';
    let headNode;
    let styleNode;
    let attribute;
    const head: any = {
      querySelector: (node: string) => {
        return null;
      },
      appendChild: (node: any) => {
        headNode = node;
      },
    };
    const style: any = {
      type: '',
      setAttribute: (key: string, value: string) => {
        attribute = { [key]: value };
      },
      appendChild: (node: any) => {
        styleNode = node;
      },
    }
    const node: any = { type: 'NODE' };
    spyOn(service.document, 'querySelector').and.returnValue(head);
    spyOn(service.document, 'createElement').and.returnValue(style);
    spyOn(service.document, 'createTextNode').and.returnValue(node);

    service.add(css);
    expect(service.document.querySelector).toHaveBeenCalledWith('head');
    expect(service.document.createElement).toHaveBeenCalledWith('style');
    expect(style.type).toEqual('text/css');
    expect(service.document.createTextNode).toHaveBeenCalledWith(css);
    expect(styleNode).toEqual(node);
    expect(headNode).toEqual(style);
  });
});
