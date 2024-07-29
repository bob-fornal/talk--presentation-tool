import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackPollingComponent } from './track-polling.component';

describe('TrackPollingComponent', () => {
  let component: TrackPollingComponent;
  let fixture: ComponentFixture<TrackPollingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrackPollingComponent]
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
