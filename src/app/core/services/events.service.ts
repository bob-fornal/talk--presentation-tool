import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';

import { EventData, Session, SessionEvent, Speaker } from '../interfaces/events';

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

  public pastEvents: BehaviorSubject<Array<SessionEvent>> = new BehaviorSubject<Array<SessionEvent>>([]);
  public futureEvents: BehaviorSubject<Array<SessionEvent>> = new BehaviorSubject<Array<SessionEvent>>([]);

  public sessions: BehaviorSubject<Array<Session>> = new BehaviorSubject<Array<Session>>([]);

  constructor(private http: HttpClient) {}

  public getBaseData = async (): Promise<any> => {
    const { speaker, sessions, events }: EventData = await firstValueFrom(this.http.get('./assets/events/sessionize--2024-08-24.json') as Observable<EventData>);
    this.speaker.next(speaker);
    this.sessions.next(sessions);
    this.pastEvents.next(events);

    const { events: futureEvents }: { events: Array<SessionEvent>}
      = await firstValueFrom(this.http.get('./assets/events/sessionize--future-events.json') as Observable<{ events: Array<SessionEvent> }>);
    this.futureEvents.next(futureEvents);
  };
}
