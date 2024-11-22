import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsComponent } from './events.component';

import { MockContentSection } from '../../_spec/components/mock-content-section.component.spec';

import { EventsService } from '../../core/services/events.service';
import { MockEventsService } from '../../_spec/services/mock-event.service.spec';

describe('EventsComponent', () => {
  let component: EventsComponent;
  let fixture: ComponentFixture<EventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        EventsComponent,

        MockContentSection,
      ],
      providers: [
        { provide: EventsService, useValue: MockEventsService },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
