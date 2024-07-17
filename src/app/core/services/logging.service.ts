// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  window: any = window;

  logged: string = '';
  logged$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  old: any = {};
  // replace: Array<string> = ['debug', 'warn', 'error', 'info'];
  replace: Array<string> = ['log', 'debug', 'warn', 'error', 'info'];

  active: boolean = false;

  initialized: boolean = false;
  initLogging = (): void => {
    if (this.initialized === true) return;
    this.replace.forEach((item) => this.fixLogging(item));
    this.initialized = true;
  };

  start = (): void => {
    this.active = true;
  };

  clear = (): void => {
    this.logged = '';
    this.logged$.next('');
  };

  stop = (): void => {
    this.active = false;
  };

  fixLogging = (name: any): void => {
    this.old[name] = this.window.console[name];
    this.window.console[name] = (...args) => {
      if (name === 'warn' && args[0] === 'WARNING: sanitizing HTML stripped some content, see https://g.co/ng/security#xss') return;
      this.old[name].apply(undefined, args);

      if (this.active === true) {
        const output = this.produceOutput(name, args);
        this.logged += `${ output }`;
        const history: string = this.logged$.value;
        this.logged$.next(history + output);
      }
    };
  };

  produceOutput = (name: string, args: any): string => {
    let output = '';
    args.forEach((arg: any) => {
      let content = '';
      const isObject = typeof arg === 'object';
      switch (true) {
        case isObject && arg.hasOwnProperty('stack'):
          content = JSON.stringify(arg.stack).replaceAll('\\n', '<br/>').replaceAll('"', '');
          break;
        case isObject:
          content = JSON.stringify(arg, null, 2).replace(' ', '&nbsp;').replace('\n', '<br/>');
          break;
        default:
          content = arg;
          break;
      }
      output += `<span class="type-${ (typeof arg) } log-${ name }">${ content }</span>&nbsp;`;
    });
    return output + '<br/><div class="linebreak"></div>';
  };
}
