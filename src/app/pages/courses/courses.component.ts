import { Component } from '@angular/core';
import { Tag } from 'src/app/core/interfaces/tag';
import { Talk, Talks } from 'src/app/core/interfaces/talks';
import { CodeService } from 'src/app/core/services/code.service';
import { StyleService } from 'src/app/core/services/style.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  talks: Array<Talk> = [];
  tags: Array<Tag> = [];

  selectedTags: Array<string> = [];
  filteredTalks: Array<Talk> = [];

  constructor(
    private code: CodeService,
    private style: StyleService
  ) {
    this.code.talks.subscribe(this.handleTalks.bind(this));
  }

  handleTalks = (wrapper: Talks): void => {
    const orderedTalks: Array<Talk> = wrapper.TALKS.sort((a: Talk, b: Talk): number => {
      if (a.title > b.title) return 1;
      if (b.title > a.title) return -1;
      return 0;
    });

    this.talks = [...orderedTalks];
    this.filteredTalks = [...orderedTalks];
    this.tags = wrapper.TAGS;

    const style = wrapper.STYLE;
    this.style.add(style.join('\n'));
  };

  filterTalks = (tag: Tag): void => {
    if (this.selectedTags.includes(tag.tag) === true) {
      const index: number = this.selectedTags.indexOf(tag.tag);
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag.tag);
    }

    this.filteredTalks = this.talks.filter((talk: Talk) => {
      if (this.filterTalks.length === 0) return true;

      let isSelected = true;
      for (let i = 0, len = this.selectedTags.length; i < len; i++) {
        const selectedTag = this.selectedTags[i];
        if (talk.tags.includes(selectedTag) === false) {
          isSelected = false;
          break;
        }
      }
      return isSelected;
    });
  };

  selectedTag = (tag: Tag): string => {
    if (this.selectedTags.includes(tag.tag) === true) return 'primary';
    return '';
  };
}
