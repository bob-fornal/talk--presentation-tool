import { Injectable } from '@angular/core';

import { SlideItemDetail, SlideStructure, SlideType } from '../interfaces/slide-types';

@Injectable({
  providedIn: 'root'
})
export class SlideInformationService {
  public slideTypes: Array<SlideType> = [
    { title: 'Code Editor', key: 'code-editor' },
    { title: 'Cover', key: 'cover-01' },
    { title: 'Image (only)', key: 'image-only' },
    { title: 'Image & Text', key: 'image-text' },
    { title: 'Panel Double', key: 'panel-double' },
    { title: 'Panel Single', key: 'panel-single' },
    { title: 'Panel Triple', key: 'panel-triple' },
  ];

  commonPatterns: { [key: string]: SlideItemDetail } = {
    title: { title: 'Title', type: 'input' },
    notes: { title: 'Notes', type: 'textarea' },
  };

  blankPatterns: { [key: string]: SlideStructure } = {
    'cover-01': {
      EMPTY: { title: '', type: 'cover-01', author: '', bio1: '', bio2: '', notes: '' },
      ORDER: ['title', 'author', 'bio1', 'bio2', 'notes'],
      title: { ...this.commonPatterns['title'] },
      author: { title: 'Author', type: 'input' },
      bio1: { title: 'Biography 1', type: 'input' },
      bio2: { title: 'Biography 2', type: 'input' },
      notes: { ...this.commonPatterns['notes'] },
    }
  };

  constructor() { }

  getSlideStructure = (key: string): SlideStructure => {
    return this.blankPatterns[key];
  }

}
