import { Injectable } from '@angular/core';
import { SlidePattern } from '../interfaces/slide-pattern';

@Injectable({
  providedIn: 'root'
})
export class SlidePatternsService {

  patterns: { [key: string]: Array<SlidePattern> } = {
    "cover-slide-01": [
      { key: 'title', title: 'Title', required: true, codeAdjust: false },
      { key: 'type', title: 'Type', required: true, codeAdjust: false },
      { key: 'author', title: 'Author', required: true, codeAdjust: false },
      { key: 'bio1', title: 'Bio 1', required: true, codeAdjust: true },
      { key: 'bio2', title: 'Bio 2', required: true, codeAdjust: true },
    ]
  };

}
