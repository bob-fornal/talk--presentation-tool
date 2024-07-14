import { DOCUMENT, NgFor } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, Input, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, NavigationSkipped, Router, RouterLink } from '@angular/router';
import { Subject, Subscription } from 'rxjs';

import { NuMonacoEditorComponent } from '@ng-util/monaco-editor';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { BroadcastMessage } from 'src/app/core/interfaces/broadcast';
import { Trigger } from 'src/app/core/interfaces/triggers';

import { BroadcastService } from 'src/app/core/services/broadcast-service.service';
import { CodeService } from 'src/app/core/services/code.service';
import { LoggingService } from 'src/app/core/services/logging.service';

@Component({
  selector: 'ce-display',
  standalone: true,
  imports: [
    NgFor,
    RouterLink,
    NuMonacoEditorComponent,
    FormsModule,

    MatButtonModule,
    MatIconModule,
    MatListModule,
  ],
  templateUrl: './ce-display.component.html',
  styleUrls: [
    '../../panel.shared.scss',
    './ce-display.component.scss'
  ],
})
export class CeDisplayComponent implements OnChanges, OnDestroy, OnInit {
  @Input() title: string = '';
  @Input() path: string = '';
  @Input() folder: string = '';
  @Input() files: Array<string> = [];
  @Input() triggers: Array<Trigger> = [];
  @Input() keys: Array<string> = [];
  @Input() panel: string | undefined = undefined;

  @Input() external: Subject<any> = new Subject();

  @ViewChild('handleScript') handleScript: any;

  selected: string = '';
  loggingOpen: boolean = false;
  logs: string = '';

  setTimeout: any = window.setTimeout;
  clearInterval: any = window.clearInterval;

  constructor(
    private cdr: ChangeDetectorRef,
    private codeService: CodeService,
    private service: BroadcastService,
    public logging: LoggingService,
    @Inject(DOCUMENT) private document: Document,
    private router: Router
  ) {
    this.subscriptions.add(this.router.events.subscribe(this.handleNavigation));
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

  ngOnInit() {
    this.subscriptions.add(this.external.subscribe(this.handleExternal.bind(this)));
  }

  handleExternal = (payload: any) => {
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
  code: string = 'function x() {\n  console.log("Hello world");\n}';
  filepath: string = '';

  sleep = (ms: number) => new Promise((resolve) => this.setTimeout(resolve, ms));

  fileSelection = async (file: string): Promise<void> => {
    this.selected = file;
    const fileAndPath: string = `./assets/talks/${ this.path }/${ this.folder }/${ file }`;
    const code: string = await this.codeService.getCode(fileAndPath);
    this.code = code;
    this.cdr.detectChanges();

    const message: BroadcastMessage = { type: 'file-update', payload: { file } };
    this.service.publish(message);
  };

  scriptLoaded: { [key: string]: string } = {};
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

    await this.sleep(100);
    const init: string = trigger.init;
    if (this.scriptLoaded[trigger.file] === undefined) {
      const fileAndPath: string = `./assets/talks/${ this.path }/${ this.folder }/${ trigger.file }`;
      this.filepath = fileAndPath;
  
      await this.sleep(100);
      const templateElement = this.handleScript.nativeElement.firstElementChild as HTMLElement;
      this.replaceDivWithScript(templateElement, this.document);
      this.scriptLoaded[trigger.file] = 'loaded';
    }

    try {
      (window as any)[init]({});
    } catch (error) {
      console.error(error);
    }

    await this.sleep(trigger.closeTime || 100);
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
