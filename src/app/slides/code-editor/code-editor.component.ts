import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Trigger } from 'src/app/core/interfaces/triggers';
import { CodeService } from 'src/app/core/services/code.service';

import { environment } from 'src/environment/environment';

@Component({
  selector: 'code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss']
})
export class CodeEditorComponent implements OnChanges {
  @Input() title: string = '';
  @Input() path: string = '';
  @Input() folder: string = '';
  @Input() files: Array<string> = [];
  @Input() triggers: Array<Trigger> = [];
  @Input() keys: Array<string> = [];

  @ViewChild('handleScript') handleScript: any;

  selected: string = '';

  constructor(
    private codeService: CodeService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnChanges() {
    setTimeout(() => {
      this.fileSelection(this.files[0]);
    }, 100);
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

  fileSelection = async (file: string): Promise<void> => {
    this.selected = file;
    const fileAndPath: string = `assets/${ this.path }/${ this.folder }/${ file }`;
    const code: string = await this.codeService.getCode(fileAndPath);
    this.code = code;
  };

  triggerFile = (trigger: Trigger): void => {
    const init: string = trigger.init;
    const fileAndPath: string = `/assets/${ this.path }/${ this.folder }/${ trigger.file }`;
    this.filepath = fileAndPath;

    setTimeout(() => {
      const templateElement = this.handleScript.nativeElement.firstElementChild as HTMLElement;
      this.replaceDivWithScript(templateElement);  
    }, 100);

    setTimeout(() => {
      const env: { [key: string]: string; } = {};
      for (let i = 0, len = this.keys.length; i < len; i++) {
        const key: string = this.keys[i];
        const value: string = (environment as any)[key];
        env[key] = atob(value);
      }

      (window as any)[init](env);
    }, 500, init);
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
