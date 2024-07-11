import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cover01Component } from './cover.component';

import { ActivatedRoute } from '@angular/router';
import { MockActivatedRoute } from 'src/app/_spec/mock-activated-route.spec';

describe('Cover01Component', () => {
  let component: Cover01Component;
  let fixture: ComponentFixture<Cover01Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [Cover01Component],
    providers: [
      { provide: ActivatedRoute, useValue: MockActivatedRoute },
    ]
});
    fixture = TestBed.createComponent(Cover01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
