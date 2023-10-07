import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { KeyStatuses } from 'src/app/core/interfaces/key-statuses';
import { SlidePattern } from 'src/app/core/interfaces/slide-pattern';
import { Structure, StructureType } from 'src/app/core/interfaces/structure';
import { Talks } from 'src/app/core/interfaces/talks';
import { CodeService } from 'src/app/core/services/code.service';
import { SlidePatternsService } from 'src/app/core/services/slide-patterns.service';
import { StyleService } from 'src/app/core/services/style.service';

@Component({
  selector: 'edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnDestroy {
  subscriptions: Array<Subscription> = [];

  structure: Structure = { ORDER: [], STYLE: [] };
  keyStatuses: Array<KeyStatuses> = [];

  path: string = '';

  constructor(
    private code: CodeService,
    private route: ActivatedRoute,
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
    this.code.getStructure(path);
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

  handleTalks = (wrapper: Talks): void => {
    const style = wrapper.STYLE;
    this.style.add(style.join('\n'));
  };

  getSlidePattern = (type: string): Array<SlidePattern> => {
    return this.slidePatterns.patterns[type];
  };

  getStructureType = (slide: KeyStatuses): string => {
    return (this.structure[slide.key] as StructureType).type;
  };

  getStyle = (): string => {
    const style = this.structure.STYLE.join('\n');
    return style;
  };

  getValue = (slide: KeyStatuses, key: string): string => {
    const struct: any = { ...(this.structure[slide.key] as StructureType) };
    return struct[key];
  };

  getCode = (slide: KeyStatuses, key: string): string => {
    const struct: any = { ...(this.structure[slide.key] as StructureType) };
    const code: string = struct[key];

    const pattern01 = /\/>/gm;
    const pattern02 = /<(\/[a-z]*)>/gm;
    const formatted = code.replace(pattern01, '/>\n').replace(pattern02, '<$1>\n');

    return formatted;
  };
}
