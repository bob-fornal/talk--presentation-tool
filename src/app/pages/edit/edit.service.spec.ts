import { TestBed } from '@angular/core/testing';

import { EditServiceService } from './edit.service';

describe('EditServiceService', () => {
  let service: EditServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
