import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Structure } from '../../core/interfaces/structure';
import { Talk, Talks } from '../../core/interfaces/talks';
import { Tag } from '../../core/interfaces/tag';

import { CodeService } from '../../core/services/code.service';
import { StyleService } from '../../core/services/style.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnDestroy {
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
    this.subscriptions.add(this.code.talks.subscribe(this.handleTalks.bind(this)));
  }

  private subscriptions: Subscription = new Subscription();
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  handleTalks = (wrapper: Talks): void => {
    const orderedTalks: Array<Talk> = wrapper.TALKS.sort(this.handleTalksSort);

    this.talks = [...orderedTalks];
    this.filteredTalks = [...orderedTalks];
    this.tags = wrapper.TAGS;

    const style = wrapper.STYLE;
    this.style.add(style.join('\n'));

    this.captureTalks(orderedTalks);
  };

  handleTalksSort = (a: Talk, b: Talk): number => {
    if (a.title > b.title) return 1;
    if (b.title > a.title) return -1;
    return 0;
  }

  filterTalks = (tag: Tag): void => {
    this.handleFilterTags(tag);
    this.handleFilterTalks();
  };

  handleFilterTags = (item: Tag): void => {
    if (this.selectedTags.includes(item.tag) === true) {
      const index: number = this.selectedTags.indexOf(item.tag);
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(item.tag);
    }
  };

  handleFilterTalks = (): void => {
    this.filteredTalks = this.talks.filter((talk: Talk) => {
      if (this.selectedTags.length === 0) return true;
      return this.isTalkSelected(talk.tags);
    });
  };

  isTalkSelected = (tags: Array<string>): boolean => {
    let isSelected = true;
    for (let i = 0, len = this.selectedTags.length; i < len; i++) {
      if (tags.includes(this.selectedTags[i]) === false) {
        isSelected = false;
        break;
      }
    }
    return isSelected;
  };

  selectedTag = (item: Tag): string => {
    if (this.selectedTags.includes(item.tag) === true) return 'primary';
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

    return (slides === notes);
  };

  getStatus = (talk: Talk): string => {
    const talkData: any = this.talkData[talk.folder];
    if (talkData === undefined) return '';

    let slides: number = talkData.ORDER.length;
    let notes: number = 0;
    talkData.ORDER.forEach((slide: string) => {
      if (talkData[slide].hasOwnProperty('notes') === true) notes++;
    });

    return (slides === notes)
      ? 'COMPLETE'
      : `Slides: ${ slides }, Notes: ${ notes }`;
  };

  getColor = (talk: Talk): string => {
    if (talk.hasOwnProperty('highlight') && talk.highlight === true) return 'blue';
    return 'accent';
  };
}
