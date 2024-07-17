import { TestBed } from '@angular/core/testing';

import { SlideInformationService } from './slide-information.service';
import { SlideStructure } from '../interfaces/slide-types';

describe('SlideInformationService', () => {
  let service: SlideInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlideInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('expects "getSlideStructure" to return a blank pattern', () => {
    const key: string = 'test-pattern'
    service.blankPatterns[key] = {
      EMPTY: { title: '', type: 'test-pattern-type', notes: '' },
      ORDER: [],
      title: { title: 'Test Pattern', type: 'input' },
      notes: { title: 'Notes', type: 'textarea' },
    };
    const expected: SlideStructure = {
      EMPTY: { title: '', type: 'test-pattern-type', notes: '' },
      ORDER: [],
      title: { title: 'Test Pattern', type: 'input' },
      notes: { title: 'Notes', type: 'textarea' },
    };

    const result: SlideStructure = service.getSlideStructure(key);
    expect(result).toEqual(expected);
  });
});
