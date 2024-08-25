export interface Speaker {
  firstName: string;
  lastName: string;
  tagline: string;
  bio: string;
  speakerProfileUrl: string;
  photoUrl: string;
  photoLargeUrl: string;
}

export interface Session {
  id: number;
  title: string;
  description: string;
  sessionUrl: string;
}

export interface SessionEvent {
  id: number;
  name: string;
  eventStartDate: string;
  eventEndDate: string;
  location: string;
  website: string;
}

export interface EventData {
  speaker: Speaker;
  sessions: Array<Session>;
  events: Array<SessionEvent>;
}
