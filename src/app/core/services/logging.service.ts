// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  logged: string = '';
  logged$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  // #log-container { overflow: auto; height: 100%; }

  // .log-warn { color: orange; }
  // .log-error { color: red; }
  // .log-info { color: skyblue; }
  // .log-log { color: grey; }
  // .log-warn, .log-error { font-weight: bold; }

  // .linebreak {
  //   border-top: 1px solid silver;
  //   margin-top: 5px;
  //   margin-bottom: 5px;
  // }
  
  // <div id="log-container">
  //   <pre id="log"></pre>
  // </div>

  old: any = {};
  replace: Array<string> = ['log', 'debug', 'warn', 'error', 'info'];

  active: boolean = false;

  initLogging = (): void => {
    this.replace.forEach((item) => this.fixLogging(item));
  };

  start = (): void => {
    this.active = true;
  };

  stop = (): void => {
    this.active = false;
    this.logged = '';
    this.logged$.next('');
  };

  fixLogging = (name: any): void => {
    this.old[name] = globalThis.console[name];
    globalThis.console[name] = (...args) => {
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
          content = JSON.stringify(arg, null, 2)
            .replace(' ', '&nbsp;')
            .replace('\n', '<br/>');;
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
