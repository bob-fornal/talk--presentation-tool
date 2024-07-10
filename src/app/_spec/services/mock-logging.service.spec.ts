import { BehaviorSubject } from "rxjs"

import { Structure } from "src/app/core/interfaces/structure";
import { Talks } from "src/app/core/interfaces/talks"

const mockLogged: BehaviorSubject<String> = new BehaviorSubject<String>('');

export const MockLoggingService: any = {
  logged: '',
  structure: mockLogged,
  old: {},
  replace:  ['debug', 'warn', 'error', 'info'],
  active: false,


  initLogging: () => ({}),
  start: () => ({}),
  clear: () => ({}),
  stop: () => ({}),
  fixLogging: (name: string) => ({}),
  produceOutput: (name: string, args: any) => ({}),
}