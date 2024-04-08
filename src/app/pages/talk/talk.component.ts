import { ChangeDetectorRef, Component, HostListener, NgZone, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { Structure, StructureType } from 'src/app/core/interfaces/structure';
import { CodeService } from 'src/app/core/services/code.service';
import { StyleService } from 'src/app/core/services/style.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CodeEditorComponent } from '../../slides/code-editor/code-editor.component';
import { PanelTripleComponent } from '../../slides/panel-triple/panel-triple.component';
import { PanelDoubleComponent } from '../../slides/panel-double/panel-double.component';
import { PanelSingleComponent } from '../../slides/panel-single/panel-single.component';
import { TextImageComponent } from '../../slides/text-image/text-image.component';
import { ImageOnlyComponent } from '../../slides/image-only/image-only.component';
import { Cover02Component } from '../../slides/cover-02/cover.component';
import { Cover01Component } from '../../slides/cover-01/cover.component';
import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { BroadcastService } from 'src/app/core/services/broadcast-service.service';
import { BroadcastMessage } from 'src/app/core/interfaces/broadcast';
import { FontsizeService } from 'src/app/core/services/fontsize.service';

@Component({
    selector: 'app-talk',
    templateUrl: './talk.component.html',
    styleUrls: ['./talk.component.scss'],
    standalone: true,
    imports: [
        NgSwitch,
        NgSwitchCase,
        Cover01Component,
        Cover02Component,
        ImageOnlyComponent,
        TextImageComponent,
        PanelSingleComponent,
        PanelDoubleComponent,
        PanelTripleComponent,
        CodeEditorComponent,
        NgSwitchDefault,
        MatButtonModule,
        RouterLink,
        MatIconModule,
    ],
})
export class TalkComponent implements OnDestroy {
  subscription: Subscription;
  triggerCodeFileChange: Subject<string> = new Subject();

  @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
      if (this.control === true) return;

      if (['ArrowRight', 'ArrowUp'].includes(event.key)) {
        this.next();
      } else if (['ArrowLeft', 'ArrowDown'].includes(event.key)) {
        this.previous();
      }
    }

  structure: Structure = { ORDER: [], STYLE: [] };

  slideIndex: number = 0;

  path: string = '';
  slideKey: string = '';
  page: StructureType = { title: '', type: '' };
  title: string = '';
  type: string = '';

  editing: boolean = false;
  control: boolean = false;

  fontsizeSelected: string | undefined;

  constructor(
    private cdr: ChangeDetectorRef,
    private code: CodeService,
    private fonts: FontsizeService,
    private route: ActivatedRoute,
    private router: Router,
    private service: BroadcastService,
    private style: StyleService,
    private zone: NgZone,
  ) {
    this.subscription = this.code.structure.subscribe(this.handleStructure.bind(this));
    this.service.messagesOfType('control').subscribe(this.handleControlMessage.bind(this));
    this.fonts.current.subscribe(this.handleFontsizeChange.bind(this));
    this.init();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  init = (): void => {
    const path: string = this.route.snapshot.paramMap.get('folder') || '';
    this.path = path;
    this.code.getStructure(path);
  };

  handleFontsizeChange = (font: string): void => {
    this.fontsizeSelected = font;
  };

  handleStructure = (structure: Structure): void => {
    this.structure = structure;
    this.setPageByRoute(structure);
  };

  handleControlMessage = (message: BroadcastMessage): void => {
    console.log(message);
    switch (true) {
      case message.payload.type === 'navigate':
        this.slideIndex = message.payload.index;
        this.setPage(message.payload.to, this.structure);
        break;
      case message.payload.type === 'trigger-code':
        this.triggerCodeFileChange.next(message.payload.file);
        break;
      case message.payload.type === 'trigger-fontsize':
        this.fonts.change(message.payload.fontsize);
        break;
      case message.payload.type === 'close':
        this.control = false;
        break;
    }
    this.cdr.detectChanges();
  };

  getTalkStyle = (): string => this.structure.STYLE.join(' ');

  setPageByRoute = (structure: Structure): void => {
    if (this.path === '') return;
    if (structure.ORDER.length === 0) return;

    const routeData: any = this.route.snapshot.data;
    const page = this.route.snapshot.paramMap.get('slideKey') || '';
    switch (true) {
      case routeData.type === 'edit-slide':
        this.editing = true;
        break;
      case routeData.type === 'talk-slide':
        this.editing = false;
        break;
    }
    this.setPage(page, structure);
  };

  setPage = (key: string, structure: Structure): void => {
    if (structure.ORDER.length === 0) return;
    this.slideIndex = structure.ORDER.indexOf(key);

    const page: StructureType = (this.structure[key] as StructureType);
    this.title = page.title;
    this.type = page.type;
    this.page = page;
    this.slideKey = key;

    const style = structure.STYLE;
    this.style.add(style.join('\n'));

    const base: string = this.editing === false ? 'talk' : 'edit';
    this.zone.run(() => this.router.navigate([base, this.path, structure.ORDER[this.slideIndex]]));
  };

  home = (): void => {
    this.slideIndex = 0;
    const page: string = this.structure.ORDER[this.slideIndex];
    this.setPage(page, this.structure);
  };

  next = (): void => {
    if ((this.slideIndex + 1) >= this.structure.ORDER.length) return;

    this.slideIndex++;
    const page: string = this.structure.ORDER[this.slideIndex];
    this.setPage(page, this.structure);
  };

  previous = (): void => {
    if (this.slideIndex === 0) return;
    
    this.slideIndex--;
    const page: string = this.structure.ORDER[this.slideIndex];
    this.setPage(page, this.structure);
  };

  end = (): void => {
    this.slideIndex = this.structure.ORDER.length - 1;
    const page: string = this.structure.ORDER[this.slideIndex];
    this.setPage(page, this.structure);
  };

  handleDataSave = (event: any): void => {
    console.log(event);
  };

  openControlPanel = (): void => {
    this.control = true;
    const url = this.router.createUrlTree(['control-panel', this.path, this.slideKey]);
    window.open(url.toString(), '_blank');
    this.cdr.detectChanges();
  };
}
