import { ChangeDetectorRef, Component, HostListener, NgZone, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';

import { BroadcastMessage } from '../../core/interfaces/broadcast';
import { Structure, StructureType } from '../../core/interfaces/structure';
import { WebComponent } from '../../core/interfaces/web-components';

import { BroadcastService } from '../../core/services/broadcast-service.service';
import { CodeService } from '../../core/services/code.service';
import { FontsizeService } from '../../core/services/fontsize.service';
import { StyleService } from '../../core/services/style.service';
import { WebComponentsService } from '../../core/services/web-components.service';

@Component({
  selector: 'app-talk',
  templateUrl: './talk.component.html',
})
export class TalkComponent implements OnDestroy {
  sendExternal: Subject<any> = new Subject();

  control: boolean = false;
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

  fontsizeSelected: string | undefined;

  window: any = window;

  constructor(
    private cdr: ChangeDetectorRef,
    private code: CodeService,
    private fonts: FontsizeService,
    private route: ActivatedRoute,
    private router: Router,
    private service: BroadcastService,
    private style: StyleService,
    private webComponentService: WebComponentsService,
    private zone: NgZone,
  ) {
    this.subscriptions.add(this.code.structure.subscribe(this.handleStructure.bind(this)));
    this.subscriptions.add(this.service.messagesOfType('control').subscribe(this.handleControlMessage.bind(this)));
    this.subscriptions.add(this.fonts.current.subscribe(this.handleFontsizeChange.bind(this)));
    this.init();
  }

  private subscriptions: Subscription = new Subscription();
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  init = (): void => {
    const path: string = this.route.snapshot.paramMap.get('folder')!;
    this.path = path;
    this.code.getStructure(path);
  };

  loadWebComponents = (): void => {
  };

  document: any = document;
  setTimeout: any = setTimeout;
  handleWebComponent = async (): Promise<void> => {
    const component: WebComponent = {
      tag: this.page.tag!,
      location: this.page.location!,
      key: this.slideKey,
      data: this.page.data
    };

    try {
      const codeStatus: any = await this.webComponentService.loadCode(component);
      await this.webComponentService.loadComponent(component);
    } catch (error) {
      // do nothing
    } finally {
      // this.setTimeout(this.handleWebComponentLoad.bind(this), 20);
    }
  };

  handleWebComponentLoad = (): void => {
    const content: any = JSON.stringify(this.page.data);
    const container: any = this.document.querySelector('#web-component-container');
    const element: any = this.document.createElement(this.page.tag);
    element.setAttribute('content', content);
    container.appendChild(element);
  };

  handleFontsizeChange = (font: string): void => {
    this.fontsizeSelected = font;
  };

  handleStructure = (structure: Structure): void => {
    this.structure = structure;
    this.setPageByRoute(structure);
  };

  handleControlMessage = (message: BroadcastMessage): void => {
    const codeEditor: Array<string> = [
      'toggle-console',
      'trigger-clear',
      'trigger-code',
      'trigger-file',
    ];
    switch (true) {
      case message.payload.type === 'navigate':
        this.slideIndex = message.payload.index;
        this.setPage(message.payload.to, this.structure);
        break;
      case codeEditor.includes(message.payload.type):
        this.sendExternal.next(message.payload)
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

    const page = this.route.snapshot.paramMap.get('slideKey')!;
    this.setPage(page, structure);
  };

  setPage = (key: string, structure: Structure): void => {
    if (structure.ORDER.length === 0) return;
    this.slideIndex = structure.ORDER.indexOf(key);

    const page: StructureType = (structure[key] as StructureType);
    this.title = page.title;
    this.type = page.type;
    this.page = page;
    this.slideKey = key;

    const style = structure.STYLE;
    this.style.add(style.join('\n'));

    this.zone.run(this.zoneRun.bind(this, key));

    if (this.type === 'external') {
      this.handleWebComponent();
    }
  };

  zoneRun = (key: string): void => {
    this.router.navigate(['talk', this.path, key]);
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

  openControlPanel = (): void => {
    this.control = true;
    const url = this.router.createUrlTree(['control-panel', this.path, this.slideKey]);
    this.window.open(url.toString(), '_blank');
    this.cdr.detectChanges();
  };
}
