import { BehaviorSubject } from "rxjs"

import { JoinTable, Session, SessionEvent, Speaker } from "../../core/interfaces/events";

const mockSpeaker: BehaviorSubject<Speaker> = new BehaviorSubject<Speaker>({
  firstName: '',
  lastName: '',
  tagline: '',
  bio: '',
  speakerProfileUrl: '',
  photoUrl: '',
  photoLargeUrl: '',
});

const mockActiveEvents: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);
const mockPastEvents: BehaviorSubject<Array<SessionEvent>> = new BehaviorSubject<Array<SessionEvent>>([]);
const mockFutureEvents: BehaviorSubject<Array<SessionEvent>> = new BehaviorSubject<Array<SessionEvent>>([]);

const mockSessions: BehaviorSubject<Array<Session>> = new BehaviorSubject<Array<Session>>([]);
const mockPastSessions: BehaviorSubject<Array<Session>> = new BehaviorSubject<Array<Session>>([]);

const mockJoinTable: BehaviorSubject<JoinTable> = new BehaviorSubject<JoinTable>({});

export const MockEventsService: any = {
  speaker: mockSpeaker,

  activeEvents: mockActiveEvents,
  pastEvents: mockPastEvents,
  futureEvents: mockFutureEvents,

  sessions: mockSessions,
  pastSessions: mockPastSessions,
  joinTable: mockJoinTable,

  getBaseData: async () => ({}),
}