import { TestBed } from '@angular/core/testing';

import { LoggingService } from './logging.service';

describe('LoggingService', () => {
  let service: LoggingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('expects "initLogging" to not capture logging', () => {
    service.initialized = true;
    spyOn(service, 'fixLogging').and.stub();

    service.initLogging();
    expect(service.fixLogging).not.toHaveBeenCalled();
  });

  it('expects "initLogging" to capture logging', () => {
    service.initialized = false;
    spyOn(service, 'fixLogging').and.stub();

    service.initLogging();
    expect(service.fixLogging).toHaveBeenCalled();
    expect(service.initialized).toEqual(true);
  });

  it('expects "start" to set logging active', () => {
    service.active = false;

    service.start();
    expect(service.active).toEqual(true);
    service.active = false;
  });

  it('expects "clear" to clear logged', () => {
    service.logged = 'LOGGED';
    spyOn(service.logged$, 'next').and.stub();

    service.clear();
    expect(service.logged).toEqual('');
    expect(service.logged$.next).toHaveBeenCalledWith('');
  });

  it('expects "stop" to set logging inactive', () => {
    service.active = true;

    service.stop();
    expect(service.active).toEqual(false);
  });

  it('expects "fixLogging" to store and wrap the console element', () => {
    const name: string = 'test';
    service.window = {
      console: {
        [name]: (...args: any) => ({}),
      },
    };
    service.old = {};

    service.fixLogging(name);
    expect(service.old[name]).toEqual(jasmine.any(Function));
  });

  it('expects "fixLogging" wrapped element to fire', () => {
    const name: string = 'test';
    service.window = {
      console: {
        [name]: (...args: any) => ({}),
      },
    };
    service.old = {};
    service.fixLogging(name);
    spyOn(service.old, name).and.stub();

    service.window.console[name]('TEST')
    expect(service.old[name]).toHaveBeenCalledWith('TEST');
  });

  it('expects "fixLogging" wrapped element to fire (warn abort)', () => {
    const name: string = 'warn';
    service.window = {
      console: {
        [name]: (...args: any) => ({}),
      },
    };
    service.old = {};
    service.fixLogging(name);
    spyOn(service.old, name).and.stub();

    service.window.console[name]('WARNING: sanitizing HTML stripped some content, see https://g.co/ng/security#xss')
    expect(service.old[name]).not.toHaveBeenCalled();
  });

  it('expects "fixLogging" wrapped element to fire (active)', () => {
    const name: string = 'test';
    service.window = {
      console: {
        [name]: (...args: any) => ({}),
      },
    };
    service.old = {};
    service.fixLogging(name);
    spyOn(service.old, name).and.stub();
    service.active = true;

    service.window.console[name]('TEST')
    expect(service.old[name]).toHaveBeenCalledWith('TEST');
    expect(service.logged).toEqual('<span class="type-string log-test">TEST</span>&nbsp;<br/><div class="linebreak"></div>')
  });

  it('expects "produceOutput" to handle a stack object', () => {
    const name: string = 'NAME';
    const arg: any = [{
      stack: ['"TEST1"\n"TEST2"']
    }];
    const stringified: string = JSON.stringify(arg[0].stack).replaceAll('\\n', '<br/>').replaceAll('"', '');
    const expected = `<span class="type-${ (typeof arg) } log-${ name }">${ stringified }</span>&nbsp;`
      + '<br/><div class="linebreak"></div>';

    const result: string = service.produceOutput(name, arg);
    expect(result).toEqual(expected);
  });

  it('expects "produceOutput" to handle a standard object', () => {
    const name: string = 'NAME';
    const arg: any = [{
      test: ['"TEST1"\n"TEST2"']
    }];
    const stringified: string = JSON.stringify(arg[0], null, 2).replace(' ', '&nbsp;').replace('\n', '<br/>');
    const expected = `<span class="type-${ (typeof arg) } log-${ name }">${ stringified }</span>&nbsp;`
      + '<br/><div class="linebreak"></div>';

    const result: string = service.produceOutput(name, arg);
    expect(result).toEqual(expected);
  });

  it('expects "produceOutput" to handle a default object', () => {
    const name: string = 'NAME';
    const arg: any = ['TEST'];
    const expected = `<span class="type-string log-${ name }">${ arg }</span>&nbsp;`
      + '<br/><div class="linebreak"></div>';

    const result: string = service.produceOutput(name, arg);
    expect(result).toEqual(expected);
  });
});
