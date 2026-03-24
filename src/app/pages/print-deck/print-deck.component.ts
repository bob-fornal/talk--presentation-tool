import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { CodeService } from '../../core/services/code.service';
import { Talk, Talks } from '../../core/interfaces/talks';

import { Structure, StructureType } from '../../core/interfaces/structure';
import { StyleService } from '../../core/services/style.service';
import { SlideStructure } from '../../core/interfaces/slide-types';

@Component({
  selector: 'app-print-deck',
  standalone: false,
  
  templateUrl: './print-deck.component.html',
  styleUrl: './print-deck.component.scss'
})
export class PrintDeckComponent {
  @Input() path: string = '';

  structure: Structure = { ORDER: [], STYLE: [] };

  constructor(
    private code: CodeService,
    private route: ActivatedRoute,
    private router: Router,
    private style: StyleService,
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

  init = (): void => {
    this.initPath();
  };

  initPath = (): void => {
    const path: string = this.route.snapshot.paramMap.get('folder')!;
    this.path = path;
    this.code.getStructure(path);
  };

  handleStructure = async(structure: Structure): Promise<void> => {
    this.structure = structure;
    console.log('structure', structure);
    await this.getCodeFromFiles();
    console.log('storedCode', this.storedCode);
  };

  talks: Array<Talk> = [];
  handleTalks = (wrapper: Talks): void => {
    this.talks = wrapper.TALKS;

    const style = wrapper.STYLE;
    this.style.add(style.join('\n'));
  };

  getStructure = (): Array<string> => {
    const order = this.structure.ORDER;
    const structure = order.filter((key: string) => {
      const slide: any = this.structure[key];
      if (slide.hasOwnProperty('visibility') === false && slide.title !== '') return true;
      return slide.title !== '' && slide.visibility === true;
    });
    return structure;
  }

  getTitle = (key: string): string => {
    const slide: any = this.structure[key];
    return slide.title;
  }

  getType = (key: string): string => {
    const slide: any = this.structure[key];
    return slide.type;
  }

  getNotes = (key: string): string => {
    const slide: any = this.structure[key];
    return slide.notes;
  }

  getAuthor = (key: string): string => {
    const slide: any = this.structure[key];
    return slide.author;
  }

  getBio1 = (key: string): string => {
    const slide: any = this.structure[key];
    return this.fixBioContent(slide.bio1);
  }

  getBio2 = (key: string): string => {
    const slide: any = this.structure[key];
    return this.fixBioContent(slide.bio2);
  }

  getImage = (key: string): string => {
    const slide: any = this.structure[key];
    return slide.image;
  }

  getText1 = (key: string): string => {
    const slide: any = this.structure[key];
    return slide.text1;
  }

  getText2 = (key: string): string => {
    const slide: any = this.structure[key];
    return slide.text2;
  }

  getText3 = (key: string): string => {
    const slide: any = this.structure[key];
    return slide.text3;
  }

  getCodeFiles = (key: string): Array<string> => {
    const slide: any = this.structure[key];
    return slide.files;
  }

  getCodeKey = (key: string, file: string): string => {
    return `${key}-${file}`;
  }

  storedCode: { [key: string]: string } = {};
  getCodeFromFiles = async () => {
    for (let slideKey in this.structure.ORDER) {
      const key: string = this.structure.ORDER[slideKey];
      const slide: StructureType = this.structure[key] as StructureType;
      const files: Array<string> = slide.files!;
      for (let file in files) {
        const fileName: string = files[file];
        const fileAndPath: string = `./assets/talks/${ this.path }/${slide.folder }/${ fileName }`;
        this.storedCode[`${key}-${fileName}`] = 'loading';
        this.storedCode[`${key}-${fileName}`] = await this.code.getCode(fileAndPath);
      }
    }
  }
 
  fixBioContent = (content: string): string => {
    const imageMatch = /<img class=bio-logo src=([^\s]+) \/?>/;
    const fixed: string = content
      .replace(imageMatch, '')
      .replace(/$<br\/>/, '');
    return fixed;
  }
}