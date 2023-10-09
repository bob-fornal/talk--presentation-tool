import { Injectable } from '@angular/core';
import { SlideDataPattern, SlidePattern } from '../interfaces/slide-pattern';

@Injectable({
  providedIn: 'root'
})
export class SlidePatternsService {

  patterns: { [key: string]: SlidePattern } = {
    'code-editor': {
      title: 'Code Editor',
      data: [
        { key: 'title', title: 'Title', required: true, codeAdjust: false },
        { key: 'type', title: 'Type', required: true, codeAdjust: false },
        { key: 'folder', title: 'Folder', required: true, codeAdjust: false },
        { key: 'files', title: 'Files', required: true, codeAdjust: false },
        { key: 'triggers', title: 'Triggers', required: true, codeAdjust: false },
      ]
    },

    'cover-slide-01': {
      title: 'Cover Slide 01',
      data: [
        { key: 'title', title: 'Title', required: true, codeAdjust: false },
        { key: 'type', title: 'Type', required: true, codeAdjust: false },
        { key: 'author', title: 'Author', required: true, codeAdjust: false },
        { key: 'bio1', title: 'Bio 1', required: true, codeAdjust: true },
        { key: 'bio2', title: 'Bio 2', required: true, codeAdjust: true },
      ]
    },
    'cover-slide-02': {
      title: 'Cover Slide 02',
      data: [
        { key: 'title', title: 'Title', required: true, codeAdjust: false },
        { key: 'type', title: 'Type', required: true, codeAdjust: false },
        { key: 'author', title: 'Author', required: true, codeAdjust: false },
      ]
    },

    'image-only': {
      title: 'Image Only',
      data: [
        { key: 'title', title: 'Title', required: true, codeAdjust: false },
        { key: 'type', title: 'Type', required: true, codeAdjust: false },
        { key: 'background', title: 'Background Color (behind image)', required: true, codeAdjust: false },
        { key: 'image', title: 'Image (and Path)', required: true, codeAdjust: false },
      ]
    },

    "panel-double": {
      title: 'Panel: Double',
      data: [
        { key: 'title', title: 'Title', required: true, codeAdjust: false },
        { key: 'type', title: 'Type', required: true, codeAdjust: false },
        { key: 'textLeft', title: 'Content Left', required: true, codeAdjust: true },
        { key: 'textRight', title: 'Content Right', required: true, codeAdjust: true },
      ]
    },
    "panel-single": {
      title: 'Panel: Single',
      data: [
        { key: 'title', title: 'Title', required: true, codeAdjust: false },
        { key: 'type', title: 'Type', required: true, codeAdjust: false },
        { key: 'text', title: 'Content', required: true, codeAdjust: true },
      ]
    },

    "text-image": {
      title: 'Text and Image',
      data: [
        { key: 'title', title: 'Title', required: true, codeAdjust: false },
        { key: 'type', title: 'Type', required: true, codeAdjust: false },
        { key: 'orientation', title: 'orientation (left / right)', required: true, codeAdjust: false },
        { key: 'text', title: 'Content', required: true, codeAdjust: true },
        { key: 'image', title: 'Image (and Path)', required: true, codeAdjust: false },
      ]
    },
  };

  hasPattern = (pattern: string): boolean => {
    return this.patterns.hasOwnProperty(pattern) === true;
  };

  getSlidePattern = (pattern: string): SlidePattern => {
    return this.patterns[pattern];
  };

  getSlidePatternData = (pattern: string): Array<SlideDataPattern> => {
    return this.patterns[pattern].data;
  };

  getSlidePatternTitle = (pattern: string): string => {
    return this.patterns[pattern].title;
  };
}
