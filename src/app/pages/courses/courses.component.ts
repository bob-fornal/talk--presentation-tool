import { CommonModule, NgFor } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

import { Structure } from 'src/app/core/interfaces/structure';
import { Tag } from 'src/app/core/interfaces/tag';
import { Talk, Talks } from 'src/app/core/interfaces/talks';
import { CodeService } from 'src/app/core/services/code.service';
import { StyleService } from 'src/app/core/services/style.service';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.scss'],
    standalone: true,
    imports: [
      CommonModule,
      
      RouterLink,
      NgFor,

      MatButtonModule,
      MatCheckboxModule,
      MatIconModule
    ]
})
export class CoursesComponent implements OnDestroy {
  subscription: Subscription;
  
  talks: Array<Talk> = [];
  tags: Array<Tag> = [];

  talkData: { [key: string]: any } = {};

  selectedTags: Array<string> = [];
  filteredTalks: Array<Talk> = [];

  showPDF: boolean = false;

  constructor(
    private code: CodeService,
    private router: Router,
    private style: StyleService
  ) {
    this.subscription = this.code.talks.subscribe(this.handleTalks.bind(this));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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

    this.captureTalks(orderedTalks);
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

  clickTalkEvent = async (talk: Talk): Promise<void> => {
    const structure: Structure = await this.code.getStructureImmediate(talk.folder);
    this.router.navigate(['talk', talk.folder, structure.ORDER[0]]);
  };

  captureTalks = async (talks: Array<Talk>): Promise<void> => {
    talks.forEach(async (talk: Talk) => {
      const structure: Structure = await this.code.getStructureImmediate(talk.folder);
      this.talkData[talk.folder] = structure;

      if (talk.hasOwnProperty('pdf') === true && talk.pdf!.length > 0) {
        talk.pdfActive = await this.code.checkLink(talk.pdf!);
        console.log(talk.pdf, talk.pdfActive);
      }
    });
  };

  isComplete = (talk: Talk): boolean => {
    const talkData: any = this.talkData[talk.folder];
    if (talkData === undefined) return false;

    let slides: number = talkData.ORDER.length;
    let notes: number = 0;
    talkData.ORDER.forEach((slide: string) => {
      if (talkData[slide].hasOwnProperty('notes') === true) notes++;
    });

    if (slides === notes) return true;
    return false;
  };

  getStatus = (talk: Talk): string => {
    const talkData: any = this.talkData[talk.folder];
    if (talkData === undefined) return '';

    let slides: number = talkData.ORDER.length;
    let notes: number = 0;
    talkData.ORDER.forEach((slide: string) => {
      if (talkData[slide].hasOwnProperty('notes') === true) notes++;
    });

    if (slides === notes) return 'COMPLETE';
    return `Slides: ${ slides }, Notes: ${ notes }`;
  };
}
