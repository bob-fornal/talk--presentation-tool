import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackPollingComponent } from './track-polling.component';

import { ActivatedRoute } from '@angular/router';
import { MockActivatedRoute } from '../../_spec/mock-activated-route.spec';

import { MockQrCodeComponent } from '../../_spec/components/mock-qr-code.component.spec';

describe('TrackPollingComponent', () => {
  let component: TrackPollingComponent;
  let fixture: ComponentFixture<TrackPollingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TrackPollingComponent,

        MockQrCodeComponent,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: MockActivatedRoute },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackPollingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
