import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { KeyStatuses } from 'src/app/core/interfaces/key-statuses';
import { SlideDataPattern, SlidePattern } from 'src/app/core/interfaces/slide-pattern';
import { Structure, StructureType } from 'src/app/core/interfaces/structure';
import { Talk, Talks } from 'src/app/core/interfaces/talks';
import { CodeService } from 'src/app/core/services/code.service';
import { SlidePatternsService } from 'src/app/core/services/slide-patterns.service';
import { StyleService } from 'src/app/core/services/style.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss'],
    standalone: true,
    imports: [MatButtonModule, RouterLink, MatIconModule, MatCardModule]
})
export class EditComponent implements OnDestroy {
  subscriptions: Array<Subscription> = [];

  structure: Structure = { ORDER: [], STYLE: [] };
  keyStatuses: Array<KeyStatuses> = [];

  path: string = '';

  title: string = '';
  tags: Array<string> = [];

  constructor(
    private code: CodeService,
    private route: ActivatedRoute,
    private router: Router,
    private slidePatterns: SlidePatternsService,
    private style: StyleService
  ) {
    this.subscriptions.push(this.code.structure.subscribe(this.handleStructure.bind(this)));
    this.subscriptions.push(this.code.talks.subscribe(this.handleTalks.bind(this)));
    this.init();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  init = (): void => {
    const path: string = this.route.snapshot.paramMap.get('folder') || '';
    this.path = path;
    console.log('edit init', path);
    this.code.getStructure(path);

    if (this.path !== '') {
      const talk = this.talks.find((item: any) => this.path === item.folder);
      if (talk !== undefined) {
        this.title = talk!.title;
        this.tags = [...talk!.tags];  
      }
    }

  };

  handleChange = (event: any): void => {
    event.target.style.height = 'auto';
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  handleStructure = (structure: Structure): void => {
    this.structure = structure;
    this.keyStatuses = [];
    Object.keys(this.structure).forEach((key: string) => {
      if (['ORDER', 'STYLE'].includes(key) === false) {
        const included: boolean = this.structure.ORDER.includes(key) === true;
        this.keyStatuses.push({ key, included });
      }
    });
  };

  talks: Array<Talk> = [];
  handleTalks = (wrapper: Talks): void => {
    if (this.path !== '') {
      const talk = wrapper.TALKS.find((item: any) => this.path === item.folder);
      if (talk !== undefined) {
        this.title = talk!.title;
        this.tags = [...talk!.tags];  
      }
    } else {
      this.talks = wrapper.TALKS;
    }

    const style = wrapper.STYLE;
    this.style.add(style.join('\n'));
  };

  hasSlidePattern = (key: string): boolean => {
    const pattern: string = (this.structure[key] as StructureType).type;
    return this.slidePatterns.hasPattern(pattern);
  };

  getSlidePatternData = (key: string): Array<SlideDataPattern> => {
    const pattern: string = (this.structure[key] as StructureType).type;
    return this.slidePatterns.getSlidePatternData(pattern);
  };

  getSlidePatternTitle = (key: string): string => {
    const title: string = (this.structure[key] as StructureType).title;
    return title !== '' ? title : 'NO TITLE';
  };

  getStructureType = (key: string): string => {
    return (this.structure[key] as StructureType).type;
  };

  getStyle = (): string => {
    const style = this.structure.STYLE.join('\n');
    return style;
  };

  getValue = (slideKey: string, itemKey: string): any => {
    const struct: any = { ...(this.structure[slideKey] as StructureType) };
    return struct[itemKey];
  };

  getCode = (slideKey: string, itemKey: string): string => {
    const struct: any = { ...(this.structure[slideKey] as StructureType) };
    const code: string = struct[itemKey];

    const pattern01 = /\/>/gm;
    const pattern02 = /<(\/[a-z]*)>/gm;
    const formatted = code.replace(pattern01, '/>\n').replace(pattern02, '<$1>\n');

    return formatted;
  };

  editClasses = (slideKey: string): Array<string> => {
    const base = ['slide-card'];
    base.push(this.getStructureType(slideKey));
    return base;
  };

  editEvent = (slideKey: string): void => {
    const url: string = `/edit/${this.path}/${slideKey}`;
    console.log('edit', url);
    this.router.navigateByUrl(url);
  };
}
