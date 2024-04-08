import { TestBed } from '@angular/core/testing';

import { FontsizeService } from './fontsize.service';

describe('FontsizeService', () => {
  let service: FontsizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FontsizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
