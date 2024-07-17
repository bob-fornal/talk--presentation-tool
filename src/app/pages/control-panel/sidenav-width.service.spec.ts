import { TestBed } from '@angular/core/testing';

import { SidenavWidthService } from './sidenav-width.service';

describe('SidenavWidthService', () => {
  let service: SidenavWidthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SidenavWidthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('expects "get sidenavWidth" to get the value and parse the string to an integer', () => {
    function getComputedStyle() {
      return {
        getPropertyValue: () => '120',
      };
    }
    service.getComputedStyle = getComputedStyle;

    const result: number = service.sidenavWidth;
    expect(result).toEqual(120);
  });

  it('expects "setSidenavWidth" to set the width (min)', () => {
    let attr: string = '';
    let value: string = '';
    const _document: any = {
      body: {
        style: {
          setProperty: (_attr: string, _value: string) => {
            attr = _attr;
            value = _value;
          },
        },
      },
    };
    const width: number = 100;

    service.setSidenavWidth(_document, width);
    expect(attr).toEqual('--navigation-width');
    expect(value).toEqual('300px');
  });

  it('expects "setSidenavWidth" to set the width (mid)', () => {
    let attr: string = '';
    let value: string = '';
    const _document: any = {
      body: {
        style: {
          setProperty: (_attr: string, _value: string) => {
            attr = _attr;
            value = _value;
          },
        },
      },
    };
    const width: number = 400;

    service.setSidenavWidth(_document, width);
    expect(attr).toEqual('--navigation-width');
    expect(value).toEqual('400px');
  });

  it('expects "setSidenavWidth" to set the width (max)', () => {
    let attr: string = '';
    let value: string = '';
    const _document: any = {
      body: {
        style: {
          setProperty: (_attr: string, _value: string) => {
            attr = _attr;
            value = _value;
          },
        },
      },
    };
    const width: number = 1200;

    service.setSidenavWidth(_document, width);
    expect(attr).toEqual('--navigation-width');
    expect(value).toEqual('800px');
  });
});
