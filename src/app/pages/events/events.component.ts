import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Session, SessionEvent, Speaker } from '../../core/interfaces/events';
import { EventsService } from '../../core/services/events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent implements OnDestroy, OnInit {
  speakerActive: boolean = false;

  futureEventsActive: boolean = true;
  pastEventsActive: boolean = false;

  sessionsAction: boolean = false;

  speaker: Speaker = {
    firstName: '',
    lastName: '',
    tagline: '',
    bio: '',
    speakerProfileUrl: '',
    photoUrl: '',
    photoLargeUrl: '',
  };

  futureEvents: Array<SessionEvent> = [];
  pastEvents: Array<SessionEvent> = [];

  sessions: Array<Session> = [];

  constructor(
    private eventService: EventsService
  ) {
    this.subscriptions.add(this.eventService.speaker.subscribe(this.handleSpeaker.bind(this)));

    this.subscriptions.add(this.eventService.pastEvents.subscribe(this.handlePastEvents.bind(this)));
    this.subscriptions.add(this.eventService.futureEvents.subscribe(this.handleFutureEvents.bind(this)));

    this.subscriptions.add(this.eventService.sessions.subscribe(this.handleSessions.bind(this)));
  }

  ngOnInit() {
    this.eventService.getBaseData();
  }

  private subscriptions: Subscription = new Subscription();
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private handleSpeaker(data: Speaker) {
    this.speaker = data;
  }

  private handleSessions(data: Array<Session>) {
    this.sessions = data;
  }

  private handlePastEvents(data: any) {
    this.pastEvents = data;
  }
  private handleFutureEvents(data: any) {
    this.futureEvents = data;
  }

  public toggleSpeaker = (event: any): void => {
    this.speakerActive = !this.speakerActive;
  };

  public toggleFutureEvents = (event: any): void => {
    this.futureEventsActive = !this.futureEventsActive;
  };

  public togglePastEvents = (event: any): void => {
    this.pastEventsActive = !this.pastEventsActive;
  };

  getPastOffset = (index: number): number => {
    return index + this.pastEvents.length;
  };
}
