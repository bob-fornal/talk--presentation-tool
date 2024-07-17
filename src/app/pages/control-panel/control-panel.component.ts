import { ChangeDetectorRef, Component, HostListener, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { BroadcastMessage } from '../../core/interfaces/broadcast';
import { Structure, StructureType } from '../../core/interfaces/structure';
import { Trigger } from '../../core/interfaces/triggers';

import { BroadcastService } from '../../core/services/broadcast-service.service';
import { CodeService } from '../../core/services/code.service';
import { StyleService } from '../../core/services/style.service';

import { SidenavWidthService } from './sidenav-width.service';

@Component({
  selector: 'control-panel',
  templateUrl: './control-panel.component.html',
  styleUrl: './control-panel.component.scss'
})
export class ControlPanelComponent implements OnDestroy {
  @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
      if (['ArrowRight', 'ArrowUp'].includes(event.key)) {
        // this.next();
      } else if (['ArrowLeft', 'ArrowDown'].includes(event.key)) {
        // this.previous();
      }
    }

  structure: Structure = { ORDER: [], STYLE: [] };

  deckTitle: string = '';
  deckSlide: StructureType = { title: '', type: '' };
  path: string = '';
  slideKey: string = '';
  selectedFile: string = '';

  resizingEvent = {
    isResizing: false,
    startingCursorX: 0,
    startingWidth: 0,
  };

  constructor(
    private cdr: ChangeDetectorRef,
    private code: CodeService,
    private route: ActivatedRoute,
    private router: Router,
    private service: BroadcastService,
    public sidenav: SidenavWidthService,
    private style: StyleService,
    private title: Title,
  ) {
    this.subscriptions.add(this.code.structure.subscribe(this.handleStructure.bind(this)));
    this.subscriptions.add(this.service.messagesOfType('file-update').subscribe(this.handleFileUpdate.bind(this)));
    this.init();
  }

  private subscriptions: Subscription = new Subscription();
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  init = (): void => {
    this.title.setTitle('Presentation Control');
    const path: string = this.route.snapshot.paramMap.get('folder') || '';
    const slideKey: string = this.route.snapshot.paramMap.get('slideKey') || '';
    this.path = path;
    this.slideKey = slideKey;
    this.code.getStructure(path);
  };

  @HostListener('window:mousemove', ['$event'])
  updateSidenavWidth(event: MouseEvent) {
    if (!this.resizingEvent.isResizing) return;

    const cursorDeltaX = event.clientX - this.resizingEvent.startingCursorX;
    const newWidth = this.resizingEvent.startingWidth + cursorDeltaX;
    this.sidenav.setSidenavWidth(document, newWidth);
  }

  @HostListener('window:mouseup')
  stopResizing() {
    this.resizingEvent.isResizing = false;
  }

  startResizing(event: MouseEvent): void {
    this.resizingEvent = {
      isResizing: true,
      startingCursorX: event.clientX,
      startingWidth: this.sidenav.sidenavWidth,
    };
  }

  handleStructure = (structure: Structure): void => {
    this.structure = structure;
    this.getDeckTitle(structure);
    this.getDeckSlide(this.slideKey);
    this.setDeckStyle(structure);
  };

  handleFileUpdate = (message: BroadcastMessage): void => {
    this.selectedFile = message.payload.file;
    this.cdr.detectChanges();
  };

  close = (): void => {
    const message: BroadcastMessage = { type: 'control', payload: { type: 'close' } };
    this.service.publish(message);
    window.self.close();
  };

  getDeckTitle = (structure: Structure): void => {
    if (structure.ORDER.length === 0) return;
    this.deckTitle = (structure[structure.ORDER[0]] as StructureType).title;
  };

  getDeckSlide = (key: string): void => {
    if (this.structure.ORDER.length === 0) return;
    this.deckSlide = this.structure[key] as StructureType;
  };

  setDeckStyle = (structure: Structure): void => {
    const style = structure.STYLE;
    this.style.add(style.join('\n'));
  };

  getActive = (key: string): boolean => {
    return key === this.slideKey;
  };

  getTitle = (key: string, index: number): string => {
    if (index === 0) return '1. Title Slide';
    if (key === 'time-for-questions') return `${ index + 1 }. Questions`;
    const title = this.stripHTML((this.structure[key] as StructureType).title);
    return `${ index + 1 }. ${ title.length > 0 ? title : key }`;
  };

  changePage = (key: string): void => {
    const index: number = this.structure.ORDER.indexOf(key);
    const message: BroadcastMessage = { type: 'control', payload: { type: 'navigate', to: key, index } };
    this.service.publish(message);
    this.router.navigate(['control-panel', this.path, key]);
    this.slideKey = key;
    this.getDeckSlide(key);
    // this.cdr.detectChanges();
  };

  triggerConsole = (type: string): void => {
    let message: BroadcastMessage = { type: 'control', payload: {} };
    switch (true) {
      case type === 'toggle-open':
        message.payload = { type: 'toggle-console' };
        break;
      case type === 'clear':
        message.payload = { type: 'trigger-clear' };
        break;
    }
    this.service.publish(message);
  };

  triggerFileChange = (file: string): void => {
    const message: BroadcastMessage = { type: 'control', payload: { type: 'trigger-file', file } };
    this.service.publish(message);
  };

  triggerFileSelection = (trigger: Trigger): void => {
    const message: BroadcastMessage = { type: 'control', payload: { type: 'trigger-code', trigger } };
    this.service.publish(message);
  };

  triggerFontsizeChange = (fontsize: string): void => {
    const message: BroadcastMessage = { type: 'control', payload: { type: 'trigger-fontsize', fontsize } };
    this.service.publish(message);
  };

  stripHTML = (html: string): string => {
    let doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };
}
