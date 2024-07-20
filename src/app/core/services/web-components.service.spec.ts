import { TestBed } from '@angular/core/testing';

import { WebComponentsService } from './web-components.service';

describe('WebComponentsService', () => {
  let service: WebComponentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebComponentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
