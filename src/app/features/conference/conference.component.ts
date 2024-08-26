import { Component, Input } from '@angular/core';
import { Session, SessionEvent } from '../../core/interfaces/events';

@Component({
  selector: 'content-conference',
  templateUrl: './conference.component.html',
  styleUrl: './conference.component.scss'
})
export class ConferenceComponent {
  @Input() data: SessionEvent = {
    id: -1,
    name: '',
    eventStartDate: '',
    eventEndDate: '',
    location: '',
    website: '',
  };
  @Input() sessions: Array<Session> = [];

  get includedSessions(): Array<Session> {
    const sessions: Array<Session> = [];
    for (let i = 0, len = this.sessions.length; i < len; i++) {
      if (this.data.joinData!.includes(this.sessions[i].id) === true) {
        sessions.push(this.sessions[i]);
      }
    }
    sessions.sort((a: Session, b: Session) => {
      if (a.title < b.title) return -1;
      if (a.title > b.title) return 1;
      return 0;
    });
    return sessions;
  }

  shortLength: number = 50;
  shortener = (site: string): string => {
    if (site.length <= this.shortLength) return site;
    const short: string =  site.substring(0, this.shortLength) + ' ...';
    return short;
  };

  dateAdjust = (startDate: string, endDate: string): string => {
    const convertedStartDate: Date = new Date(startDate.replace('Z', ''));
    if (startDate === endDate) return this.generateDate(convertedStartDate);

    const convertedEndDate: Date = new Date(endDate.replace('Z', ''));
    return `${this.generateDate(convertedStartDate)} - ${this.generateDate(convertedEndDate)}`;
  };

  private generateDate = (date: Date): string => {
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const weekday: string = weekdays[date.getDay()];

    const day: string = date.getDate().toString().padStart(2, '0');

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const month: string = months[date.getMonth()];

    const year: string = date.getFullYear().toString();

    return `${weekday}, ${day} ${month} ${year}`;
  };
}
