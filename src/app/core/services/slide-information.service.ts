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
    'code-editor': {
      EMPTY: { title: '', type: 'code-editor', notes: '' },
      ORDER: ['title', 'path', 'folder', 'files', 'triggers', 'keys', 'panel', 'notes'],
      title: { ...this.commonPatterns['title'] },
      path: { title: 'Path', type: 'input' },
      folder: { title: 'Folder', type: 'input' },
      files: { title: 'Files', type: 'files' },
      triggers: { title: 'Triggers', type: 'triggers' },
      keys: { title: 'Keys', type: 'keys' },
      panel: { title: 'Panel', type: 'input' },
      notes: { ...this.commonPatterns['notes'] },
    },
    'cove-slide-01': {
      EMPTY: { title: '', type: 'cover-01', author: '', bio1: '', bio2: '', notes: '' },
      ORDER: ['title', 'author', 'bio1', 'bio2', 'notes'],
      title: { ...this.commonPatterns['title'] },
      author: { title: 'Author', type: 'input' },
      bio1: { title: 'Biography 1', type: 'textarea' },
      bio2: { title: 'Biography 2', type: 'textarea' },
      notes: { ...this.commonPatterns['notes'] },
    },
    'image-only': {
      EMPTY: { title: '', type: 'image-only', image: '', imageClass: '', notes: '' },
      ORDER: ['title', 'image', 'imageClass', 'notes'],
      title: { ...this.commonPatterns['title'] },
      image: { title: 'Image', type: 'input' },
      imageClass: { title: 'Image Class', type: 'input' },
      notes: { ...this.commonPatterns['notes'] },
    },
    'image-text': {
      EMPTY: { title: '', type: 'image-text', orientation: 'left', text1: '', image: '', notes: '' },
      ORDER: ['title', 'orientation', 'text1', 'image', 'notes'],
      title: { ...this.commonPatterns['title'] },
      orientation: { title: 'Orientation', type: 'input' },
      text1: { title: 'Text', type: 'textarea' },
      image: { title: 'Image', type: 'input' },
      notes: { ...this.commonPatterns['notes'] },
    },
    'panel-double': {
      EMPTY: { title: '', type: 'panel-double', text1: '', text2: '', notes: '' },
      ORDER: ['title', 'text1', 'text2', 'notes'],
      title: { ...this.commonPatterns['title'] },
      text1: { title: 'Text 1', type: 'textarea' },
      text2: { title: 'Text 2', type: 'textarea' },
      notes: { ...this.commonPatterns['notes'] },
    },
    'panel-single': {
      EMPTY: { title: '', type: 'panel-single', text1: '', notes: '' },
      ORDER: ['title', 'text1', 'notes'],
      title: { ...this.commonPatterns['title'] },
      text1: { title: 'Text', type: 'textarea' },
      notes: { ...this.commonPatterns['notes'] },
    },
    'panel-triple': {
      EMPTY: { title: '', type: 'panel-triple', text1: '', text2: '', text3: '', notes: '' },
      ORDER: ['title', 'text1', 'text2', 'text3', 'notes'],
      title: { ...this.commonPatterns['title'] },
      text1: { title: 'Text 1', type: 'textarea' },
      text2: { title: 'Text 2', type: 'textarea' },
      text3: { title: 'Text 3', type: 'textarea' },
      notes: { ...this.commonPatterns['notes'] },
    },
  };

  constructor() { }

  getSlideStructure = (key: string): SlideStructure => {
    return this.blankPatterns[key];
  }

}
