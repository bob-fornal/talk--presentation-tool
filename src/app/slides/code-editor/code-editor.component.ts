import { DOCUMENT, NgFor } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Trigger } from 'src/app/core/interfaces/triggers';
import { CodeService } from 'src/app/core/services/code.service';

import { environment } from 'src/environment/environment';
import { FormsModule } from '@angular/forms';
import { NuMonacoEditorComponent } from '@ng-util/monaco-editor';
import { RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { Subject } from 'rxjs';
import { BroadcastService } from 'src/app/core/services/broadcast-service.service';
import { BroadcastMessage } from 'src/app/core/interfaces/broadcast';
import { LoggingService } from 'src/app/core/services/logging.service';

@Component({
    selector: 'code-editor',
    templateUrl: './code-editor.component.html',
    styleUrls: [
      '../panel.shared.scss',
      './code-editor.component.scss'
    ],
    standalone: true,
    imports: [
      NgFor,
      RouterLink,
      NuMonacoEditorComponent,
      FormsModule,

      MatButtonModule,
      MatIconModule,
      MatListModule,
    ]
})
export class CodeEditorComponent implements OnChanges, OnInit {
  @Input() title: string = '';
  @Input() path: string = '';
  @Input() folder: string = '';
  @Input() files: Array<string> = [];
  @Input() triggers: Array<Trigger> = [];
  @Input() keys: Array<string> = [];

  @Input() external: Subject<any> = new Subject();

  @ViewChild('handleScript') handleScript: any;

  selected: string = '';
  loggingOpen: boolean = false;
  logs: string = '';

  constructor(
    private cdr: ChangeDetectorRef,
    private codeService: CodeService,
    public logging: LoggingService,
    @Inject(DOCUMENT) private document: Document,
    private service: BroadcastService,
  ) {}

  ngOnChanges() {
    setTimeout(() => {
      this.fileSelection(this.files[0]);
    }, 100);
  }

  ngOnInit() {
    this.external.subscribe((payload: any) => {
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
    });
  }

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

  sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  fileSelection = async (file: string): Promise<void> => {
    this.selected = file;
    const fileAndPath: string = `./assets/${ this.path }/${ this.folder }/${ file }`;
    const code: string = await this.codeService.getCode(fileAndPath);
    this.code = code;
    this.cdr.detectChanges();

    const message: BroadcastMessage = { type: 'file-update', payload: { file } };
    this.service.publish(message);
  };

  triggerFile = async (trigger: Trigger): Promise<void> => {
    this.logging.start();

    await this.sleep(100);
    const init: string = trigger.init;
    const fileAndPath: string = `./assets/${ this.path }/${ this.folder }/${ trigger.file }`;
    this.filepath = fileAndPath;

    await this.sleep(100);
    const templateElement = this.handleScript.nativeElement.firstElementChild as HTMLElement;
    this.replaceDivWithScript(templateElement);  

    await this.sleep(500);
    const env: { [key: string]: any; } = {};
    for (let i = 0, len = this.keys.length; i < len; i++) {
      const key: string = this.keys[i];
      const value: string = (environment as any)[key];
      env[key] = atob(value);
    }
    env['callback'] = this.handleTriggerCallback.bind(this);

    (window as any)[init](env);
  };

  handleTriggerCallback = (): void => {
    this.logs = this.logging.logged;
    this.logging.stop();
  };

  toggleLogging = (): void => {
    this.loggingOpen = !this.loggingOpen;
  };

  clearLogging = (): void => {
    this.logging.clear();
    this.logs = '';
  };

  replaceDivWithScript = (templateElement: HTMLElement): void => {
    const script = this.document.createElement('script');
    this.copyAttributesFromTemplateToScript(templateElement, script);
    this.handleScript.nativeElement.appendChild(script);
  };

  copyAttributesFromTemplateToScript = (templateElement: HTMLElement, script: HTMLScriptElement): void => {
    for (let i = 0, len = templateElement.attributes.length; i < len; i++) {
      script.attributes.setNamedItem(templateElement.attributes[i].cloneNode() as Attr);
    }
  };
}
