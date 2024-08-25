import { Component, Input } from '@angular/core';
import { SessionEvent } from '../../core/interfaces/events';

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

  shortLength: number = 50;
  shortener = (site: string): string => {
    if (site.length <= this.shortLength) return site;
    const short: string =  site.substring(0, this.shortLength) + ' ...';
    return short;
  };

  dateAdjust = (startDate: string, endDate: string): string => {
    const format: string = 'DD MMM YYYY'
    const convertedStartDate: Date = new Date(startDate);
    if (startDate === endDate) return this.generateDate(convertedStartDate);

    const convertedEndDate: Date = new Date(endDate);
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
