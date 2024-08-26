import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { JoinTable, Session, SessionEvent, Speaker } from '../../core/interfaces/events';
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
  pastSessions: Array<Session> = [];

  joinTable: JoinTable = {};

  constructor(
    private eventService: EventsService
  ) {
    this.subscriptions.add(this.eventService.speaker.subscribe(this.handleSpeaker.bind(this)));

    this.subscriptions.add(this.eventService.pastEvents.subscribe(this.handlePastEvents.bind(this)));
    this.subscriptions.add(this.eventService.futureEvents.subscribe(this.handleFutureEvents.bind(this)));

    this.subscriptions.add(this.eventService.sessions.subscribe(this.handleSessions.bind(this)));
    this.subscriptions.add(this.eventService.pastSessions.subscribe(this.handlePastSessions.bind(this)));

    this.subscriptions.add(this.eventService.joinTable.subscribe(this.handleJoinTable.bind(this)));
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

  private handlePastSessions(data: Array<Session>): void {
    this.pastSessions = data;
  }

  private handlePastEvents(data: any) {
    this.pastEvents = data;
  }
  private handleFutureEvents(data: any) {
    this.futureEvents = data;
  }

  private handleJoinTable(data: JoinTable): void {
    this.joinTable = data;
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

  getData = (event: SessionEvent): SessionEvent => {
    const sessionEvent: SessionEvent = {
      ...event,
      joinData: this.getJoinData(event.id),
    };
    return sessionEvent;
  };

  getPastOffset = (index: number): number => {
    return index + this.futureEvents.length;
  };

  private getJoinData = (eventId: number): Array<number> => {
    if (this.joinTable.hasOwnProperty(eventId.toString()) === false) return [];
    return this.joinTable[eventId.toString()];
  };

  getSessions(eventId: number): Array<Session> {
    const allSessions: Array<Session> = [ ...this.sessions, ...this.pastSessions ];
    const joinData: Array<number> = this.getJoinData(eventId);
    const usedSessions: Array<Session> = allSessions.filter((session: Session) => {
      return joinData.includes(session.id);
    });
    return usedSessions;
  };
}
