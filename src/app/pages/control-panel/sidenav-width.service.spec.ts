import { TestBed } from '@angular/core/testing';

import { SidenavWidthService } from './sidenav-width.service';

describe('SidenavWidthService', () => {
  let service: SidenavWidthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SidenavWidthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
