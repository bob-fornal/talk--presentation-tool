import { Component, Input } from '@angular/core';

@Component({
  selector: 'active-event',
  templateUrl: './active-event.component.html',
  styleUrl: './active-event.component.scss'
})
export class ActiveEventComponent {
  @Input() activeEvent: any = {};

  hasUrl = (): boolean => {
    return this.activeEvent.hasOwnProperty('website') === true
      && this.activeEvent.website.length > 0;
  };

  hasAttribute = (attribute: string): boolean => {
    return this.activeEvent.hasOwnProperty(attribute);
  };

  getDateRange = (attribute: string): string => {
    const start: string = this.generateDate(new Date(this.activeEvent[attribute].start));
    const end: string = this.generateDate(new Date(this.activeEvent[attribute].end));
    return `${start} - ${end}`;
  };

  getDateStart = (attribute: string): string => {
    const start: string = this.generateDate(new Date(this.activeEvent[attribute].start));
    return start;
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

