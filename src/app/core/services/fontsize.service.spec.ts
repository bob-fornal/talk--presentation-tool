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

  it('expects "change" to update the subject', () => {
    const size: string = 'font-xxl';
    spyOn(service.current, 'next').and.stub();

    service.change(size);
    expect(service.current.next).toHaveBeenCalledWith(size);
  });
});
