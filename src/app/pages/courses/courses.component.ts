import { Component } from '@angular/core';
import { Talk } from 'src/app/core/interfaces/talks';
import { CodeService } from 'src/app/core/services/code.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  talks: Array<Talk> = [];

  constructor(
    private code: CodeService
  ) {
    this.code.talks.subscribe(this.handleTalks.bind(this));
  }

  handleTalks = (talks: Array<Talk>): void => {
    this.talks = talks;
    console.log(this.talks);
  };
}
