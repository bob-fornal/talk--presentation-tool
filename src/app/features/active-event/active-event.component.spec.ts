import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveEventComponent } from './active-event.component';

describe('ActiveEventComponent', () => {
  let component: ActiveEventComponent;
  let fixture: ComponentFixture<ActiveEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActiveEventComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
