import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';

import { EventData, JoinTable, Session, SessionEvent, Speaker } from '../interfaces/events';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private endpoint: string = 'https://sessionize.com/api/speaker/json/sto32vrjwf';
  
  public speaker: BehaviorSubject<Speaker> = new BehaviorSubject<Speaker>({
    firstName: '',
    lastName: '',
    tagline: '',
    bio: '',
    speakerProfileUrl: '',
    photoUrl: '',
    photoLargeUrl: '',
  });

  public activeEvents: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);
  public pastEvents: BehaviorSubject<Array<SessionEvent>> = new BehaviorSubject<Array<SessionEvent>>([]);
  public futureEvents: BehaviorSubject<Array<SessionEvent>> = new BehaviorSubject<Array<SessionEvent>>([]);

  public sessions: BehaviorSubject<Array<Session>> = new BehaviorSubject<Array<Session>>([]);
  public pastSessions: BehaviorSubject<Array<Session>> = new BehaviorSubject<Array<Session>>([]);

  public joinTable: BehaviorSubject<JoinTable> = new BehaviorSubject<JoinTable>({});

  constructor(private http: HttpClient) {}

  public getBaseData = async (): Promise<any> => {
    const { speaker, sessions, events }: EventData = await firstValueFrom(this.http.get('./assets/events/sessionize--2024-10-09.json') as Observable<EventData>);
    this.speaker.next(speaker);
    this.sessions.next(sessions);
    this.pastEvents.next(events);

    const { events: futureEvents, sessions: pastSessions }: { events: Array<SessionEvent>, sessions: Array<Session> }
      = await firstValueFrom(this.http.get('./assets/events/sessionize--future-events.json') as Observable<{ events: Array<SessionEvent>, sessions: Array<Session> }>);
    this.futureEvents.next(futureEvents);
    this.pastSessions.next(pastSessions);

    const joinTable: JoinTable
      = await firstValueFrom(this.http.get('./assets/events/sessionize--join-table.json') as Observable<JoinTable>);
    this.joinTable.next(joinTable);

    const activeEvents: Array<any>
      = await firstValueFrom(this.http.get('./assets/events/sessionize--active-events.json') as Observable<Array<any>>);
    this.activeEvents.next(activeEvents);
  };
}
