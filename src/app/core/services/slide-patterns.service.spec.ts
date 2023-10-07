import { TestBed } from '@angular/core/testing';

import { SlidePatternsService } from './slide-patterns.service';

describe('SlidePatternsService', () => {
  let service: SlidePatternsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlidePatternsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
