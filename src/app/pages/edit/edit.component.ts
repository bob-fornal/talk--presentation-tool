import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import slideTypeIcons from '../../core/constants/slide-type-icons.json';

import { KeyStatuses } from '../../core/interfaces/key-statuses';
import { Structure, StructureType } from '../../core/interfaces/structure';
import { Talk, Talks } from '../../core/interfaces/talks';

import { CodeService } from '../../core/services/code.service';
import { StyleService } from '../../core/services/style.service';

import { EditService } from './edit.service';

import { saveAs } from 'file-saver';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent implements OnDestroy, OnInit {
  icons: { [key: string]: { type: string, icon: string } } = slideTypeIcons;

  localStorage: any = localStorage;

  keyStatuses: Array<KeyStatuses> = [];

  path: string = '';
  slideKey: string | null = null;
  page: StructureType = { title: '', type: '' };
  title: string = '';
  type: string = '';

  _displayAs: string = 'cards';
  get displayAs() {
    return this._displayAs;
  }
  set displayAs(value) {
    this._displayAs = value;
    this.localStorage.setItem('displayAs', value);
  }
  displayAsOptions: Array<string> = ['Cards', 'List'];
  editing: boolean = false;

  fontsizeSelected: string | undefined;

  tags: Array<string> = [];

  get dataChanged(): boolean {
    let changed: boolean = false;
    for (let slide of this.keyStatuses) {
      if (this.isNotOriginal(slide.key) === true) {
        changed = true;
      }
    }
    return changed;
  };

  constructor(
    private cdr: ChangeDetectorRef,
    private code: CodeService,
    private route: ActivatedRoute,
    private router: Router,
    private service: EditService,
    private style: StyleService
  ) {
    this.subscriptions.add(this.code.structure.subscribe(this.handleStructure.bind(this)));
    this.subscriptions.add(this.code.talks.subscribe(this.handleTalks.bind(this)));
  }

  ngOnInit(): void {
    this.init();
  }

  private subscriptions: Subscription = new Subscription();
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  displayOptions: Array<string> = ['cards', 'list'];
  init = (): void => {
    this.initDisplayAs();
    this.initPath();
    this.initSlideKey();

    if (this.path !== '') {
      const talk = this.talks.find((item: any) => this.path === item.folder);
      if (talk !== undefined) {
        this.title = talk!.title;
        this.tags = [...talk!.tags];
      }
    }
  };

  initDisplayAs = (): void => {
    const displayAs: string = this.localStorage.getItem('displayAs') || 'cards';
    this.displayAs = displayAs;
    this.cdr.detectChanges();
  };

  initPath = (): void => {
    const path: string = this.route.snapshot.paramMap.get('folder')!;
    this.path = path;
    this.code.getStructure(path);
  };

  initSlideKey = (): void => {
    const slideKey: string | null = this.route.snapshot.paramMap.get('slideKey');
    this.slideKey = slideKey;
    this.editing = slideKey !== null;
  };

  handleChange = (event: any): void => {
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  handleStructure = (structure: Structure): void => {
    if (this.isProcessedAndMatches(structure.ORDER) === true) return;

    this.service.structure = structure;
    if (this.slideKey !== null) {
      this.handleSlideKeyData(this.slideKey);
      return;
    }

    this.handleKeyStatuses();
  };

  isProcessedAndMatches = (order: Array<string>): boolean => {
    const processed: boolean = this.service.structure.hasOwnProperty('PROCESSED') === true;
    const match: boolean = JSON.stringify(this.service.structure.ORDER) === JSON.stringify(order);
    const slideKey: boolean = this.slideKey === null;
    return processed && match && slideKey;
  };

  handleSlideKeyData = (key: string): void => {
    const slideEdited: boolean = this.service.edited.hasOwnProperty(key);
    const slide = (
      slideEdited === true
        ? this.service.edited[key]
        : this.service.structure[key]
      ) as StructureType;
    this.title = slide.title;
    this.type = slide.type;
    this.page = slide;
  };

  handleKeyStatuses = (): void => {
    this.keyStatuses = [];
    Object.keys(this.service.structure).forEach((key: string) => {
      if (['ORDER', 'STYLE'].includes(key) === false) {
        const included: boolean = this.service.structure.ORDER.includes(key) === true;
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

  getSlideIcon = (key: string): { type: string; icon: string } => {
    const type: string = this.getStructureType(key);
    if (this.icons.hasOwnProperty(type) === true) {
      return { type: this.icons[type].type, icon: this.icons[type].icon };
    } else {
      return { type: 'icon', icon: 'image' };
    }
  };

  getSlidePatternTitle = (key: string): string => {
    const title: string = (this.service.structure[key] as StructureType).title;
    return title !== '' ? title : 'NO TITLE';
  };

  getStructureType = (key: string): string => {
    return (this.service.structure[key] as StructureType).type;
  };

  getStyle = (): string => {
    const style = this.service.structure.STYLE.join('\n');
    return style;
  };

  getValue = (slideKey: string, itemKey: string): any => {
    const struct: any = { ...(this.service.structure[slideKey] as StructureType) };
    return struct[itemKey];
  };

  getCode = (slideKey: string, itemKey: string): string => {
    const struct: any = { ...(this.service.structure[slideKey] as StructureType) };
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
    this.router.navigate(['edit', this.path, slideKey]);
  };

  handleDataSave = (event: any): void => {
    if (event.ACTION === 'save') {
      const data: any = { ...this.service.structure[event.slideKey] as StructureType };
      const matchStringOrignal: string = JSON.stringify(data);
      const keys: Array<string> = event.ITEMS;
      keys.forEach((key: string) => {
        data[key] = event[key];
      });

      const matchStringNew: string = JSON.stringify(data);
      const changed: boolean = matchStringOrignal !== matchStringNew;
      
      if (changed === true) {
        this.service.edited[event.slideKey] = { ...data };
      } else if (this.service.edited.hasOwnProperty(event.slideKey) === true) {
        delete this.service.edited[event.slideKey];
      }
    }
  };

  isNotOriginal = (slideKey: string): boolean => {
    return this.service.edited.hasOwnProperty(slideKey) || false;
  };

  saveAs = saveAs;
  saveFile = (): void => {
    const data: any = { ...this.service.structure, ...this.service.edited };
    const stringify: string = JSON.stringify(data, null, 2);
    const blob = new Blob([stringify], { type: 'application/json' });

    this.saveAs(blob, 'structure.json');

    this.service.structure = data;
    this.service.edited = {};
  };
}
