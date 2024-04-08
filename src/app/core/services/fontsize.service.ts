import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FontsizeService {

  current: BehaviorSubject<string> = new BehaviorSubject<string>('font-normal');

  change = (size: string): void => {
    this.current.next(size);
  };
}
