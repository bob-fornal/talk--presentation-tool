import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, Input, OnChanges, OnDestroy, ViewChild } from '@angular/core';
import { NavigationEnd, NavigationSkipped, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { BroadcastMessage } from '../../../core/interfaces/broadcast';
import { Trigger } from '../../../core/interfaces/triggers';

import { BroadcastService } from '../../../core/services/broadcast-service.service';
import { CodeService } from '../../../core/services/code.service';
import { LoggingService } from '../../../core/services/logging.service';

@Component({
  selector: 'ce-display',
  templateUrl: './ce-display.component.html',
  styleUrls: [
    '../../panel.shared.scss',
    './ce-display.component.scss',
  ],
  standalone: false,
})
export class CeDisplayComponent implements OnChanges, OnDestroy {
  @Input() title: string = '';
  @Input() path: string = '';
  @Input() folder: string = '';
  @Input() files: Array<string> = [];
  @Input() triggers: Array<Trigger> = [];
  @Input() keys: Array<string> = [];
  @Input() panel: string | undefined = undefined;

  @ViewChild('handleScript') handleScript: any;

  selected: string = '';
  loggingOpen: boolean = false;
  logs: string = '';

  setTimeout: any = window.setTimeout;
  clearInterval: any = window.clearInterval;

  constructor(
    private cdr: ChangeDetectorRef,
    private code: CodeService,
    private service: BroadcastService,
    public logging: LoggingService,
    @Inject(DOCUMENT) private document: Document,
    private router: Router
  ) {
    this.subscriptions.add(this.router.events.subscribe(this.handleNavigation));
    this.subscriptions.add(this.service.messagesOfType('control').subscribe(this.handleExternal.bind(this)));
  }

  ngOnChanges() {
    this.setTimeout(this.handleFileSelection.bind(this), 100);
  }

  private subscriptions: Subscription = new Subscription();
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  handleFileSelection = () => {
    this.fileSelection(this.files[0]);
  };

  handleExternal = (wrapper: any) => {
    const payload: any = wrapper.payload;

    switch (true) {
      case payload.type === 'trigger-file':
        this.fileSelection(payload.file);
        break;
      case payload.type === 'trigger-code':
        this.triggerFile(payload.trigger);
        break;
      case payload.type === 'toggle-console':
        this.toggleLogging();
        break;
      case payload.type === 'trigger-clear':
        this.clearLogging();
        break;
    }
  };

  editorOptions = {
    theme: 'vs-dark',
    language: 'typescript',
    fontSize: 18,
    height: '900px',
    
    hover: {
      enabled: false,
    },
    minimap: {
      enabled: false,
    },
  };
  script: string = 'function x() {\n  console.log("Hello world");\n}';
  filepath: string = '';

  fileSelection = async (file: string): Promise<void> => {
    this.selected = file;
    const fileAndPath: string = `./assets/talks/${ this.path }/${ this.folder }/${ file }`;
    const code: string = await this.code.getCode(fileAndPath);
    this.script = code;
    this.cdr.detectChanges();

    const message: BroadcastMessage = { type: 'file-update', payload: { file } };
    this.service.publish(message);
  };

  scriptIntervalCount: number = 0;
  scriptLoggingInterval: any;
  triggerFile = async (trigger: Trigger): Promise<void> => {
    this.logging.start();
    this.scriptLoggingInterval = setInterval(() => {
      this.scriptIntervalCount++;
      if (this.scriptIntervalCount >= 360000) {
        this.clearInterval(this.scriptLoggingInterval);
      }
      this.logs = this.logging.logged;
    }, 500);

    const fileAndPath: string = `./assets/talks/${ this.path }/${ this.folder }/${ trigger.file }`;
    await this.code.loadScript({ tag: trigger.file, type: 'text/javascript', location: fileAndPath });

    const init: string = trigger.init;
    await this.code.sleep(100);
    try {
      (window as any)[init]({});
    } catch (error) {
      console.error(error);
    }

    await this.code.sleep(trigger.closeTime || 100);
    this.loggingOpen = true;
  };

  toggleLogging = (): void => {
    this.loggingOpen = !this.loggingOpen;
  };

  clearLogging = (): void => {
    this.logging.clear();
    this.logs = '';
  };

  handleNavigation = (event: any): void => {
    if (event.routerEvent instanceof NavigationSkipped || event instanceof NavigationEnd) {
      this.triggerContainerUpdate();
    }
  };

  triggerContainerUpdate = (): void => {
    this.setTimeout(this.handleContainerUpdate.bind(this, this.document), 100);
  };

  handleContainerUpdate = (_document: any) => {
    const container = _document.getElementById('display-container');
    container!.innerHTML = this.panel === undefined ? '' : this.panel!;
    
    this.logging.stop();
    this.clearInterval(this.scriptLoggingInterval);
  };

  replaceDivWithScript = (templateElement: HTMLElement, _document: any): void => {
    const script = _document.createElement('script');
    this.copyAttributesFromTemplateToScript(templateElement, script);
    this.handleScript.nativeElement.appendChild(script);
  };

  copyAttributesFromTemplateToScript = (templateElement: HTMLElement, script: HTMLScriptElement): void => {
    for (let i = 0, len = templateElement.attributes.length; i < len; i++) {
      script.attributes.setNamedItem(templateElement.attributes[i].cloneNode() as Attr);
    }
  };
}
