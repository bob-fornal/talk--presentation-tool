import { TestBed } from '@angular/core/testing';

import { SlideInformationService } from './slide-information.service';

describe('SlideInformationService', () => {
  let service: SlideInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlideInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
