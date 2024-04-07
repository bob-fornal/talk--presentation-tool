import { TestBed } from '@angular/core/testing';

import { BroadcastServiceService } from './broadcast-service.service';

describe('BroadcastServiceService', () => {
  let service: BroadcastServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BroadcastServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
