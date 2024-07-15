import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationEnd, NavigationSkipped } from '@angular/router';

import { CeDisplayComponent } from './ce-display.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { NGX_MONACO_EDITOR_CONFIG, EditorComponent } from 'ngx-monaco-editor-v2';

import { CodeService } from '../../../core/services/code.service';
import { MockCodeService } from '../../../_spec/services/mock-code.service.spec';

describe('CeDisplayComponent', () => {
  let component: CeDisplayComponent;
  let fixture: ComponentFixture<CeDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CeDisplayComponent,
      ],
      imports: [
        EditorComponent,

        MatButtonModule,
        MatIconModule,
        MatListModule,
      ],
      providers: [
        { provide: CodeService, useValue: MockCodeService },
        { provide: NGX_MONACO_EDITOR_CONFIG, useValue: {} },
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CeDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    component.setTimeout = (fn: any, timer: any) => fn();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('expects "handleFileSelection" to trigger file selection with the first file', () => {
    component.files = ['FILE.js'];
    spyOn(component, 'fileSelection').and.stub();

    component.handleFileSelection();
    expect(component.fileSelection).toHaveBeenCalled();
  });

  it('expects "handleExternal" to trigger file selection for "trigger-file"', () => {
    const payload: any = { type: 'trigger-file', file: 'FILE' };
    spyOn(component, 'fileSelection').and.stub();

    component.handleExternal(payload);
    expect(component.fileSelection).toHaveBeenCalledWith('FILE');
  });

  it('expects "handleExternal" to trigger code for "trigger-code"', () => {
    const payload: any = { type: 'trigger-code', trigger: {
      title: 'TRIGGER', file: 'FILE', init: 'INIT',
    } };
    spyOn(component, 'triggerFile').and.stub();

    component.handleExternal(payload);
    expect(component.triggerFile).toHaveBeenCalledWith(payload.trigger);
  });

  it('expects "handleExternal" to toggle logging for "toggle-console"', () => {
    const payload: any = { type: 'toggle-console' };
    spyOn(component, 'toggleLogging').and.stub();

    component.handleExternal(payload);
    expect(component.toggleLogging).toHaveBeenCalled();
  });

  it('expects "handleExternal" to trigger clear for "trigger-clear"', () => {
    const payload: any = { type: 'trigger-clear' };
    spyOn(component, 'clearLogging').and.stub();

    component.handleExternal(payload);
    expect(component.clearLogging).toHaveBeenCalled();
  });

  it('expects "sleep" to resolve after a set amount of time', () => {
    spyOn(component, 'setTimeout').and.callThrough();

    component.sleep(1000);
    expect(component.setTimeout).toHaveBeenCalled();
  });

  it('expects "fileSelection" to set the code and broadcast', async () => {
    const file: string = 'FILE.js';
    component.path = 'PATH';
    component.folder = 'FOLDER';
    spyOn(component['codeService'], 'getCode').and.returnValue(Promise.resolve('CODE'));
    spyOn(component['cdr'], 'detectChanges').and.stub();
    spyOn(component['service'], 'publish').and.stub();

    await component.fileSelection(file);
    expect(component['codeService'].getCode).toHaveBeenCalledWith('./assets/talks/PATH/FOLDER/FILE.js');
    expect(component.code).toEqual('CODE');
    expect(component['service'].publish).toHaveBeenCalledWith({ type: 'file-update', payload: { file }});
  });

  /*  ****
      TODO: triggerFile Unit Tests / Redesign
  */

  it('expects "toggleLogging" to toggle state', () => {
    component.loggingOpen = false;

    component.toggleLogging();
    expect(component.loggingOpen).toEqual(true);

    component.toggleLogging();
    expect(component.loggingOpen).toEqual(false);
  });

  it('expects "clearLogging" to turn logging off and reset the value', () => {
    spyOn(component.logging, 'clear').and.stub();
    component.logs = 'LOGS';

    component.clearLogging();
    expect(component.logging.clear).toHaveBeenCalled();
    expect(component.logs).toEqual('');
  });

  it('expects "handleNavigation" to handle NavigationSkipped', () => {
    const event: any = {
      routerEvent: new NavigationSkipped(1, '', 'test'),
    };
    spyOn(component, 'triggerContainerUpdate').and.stub();

    component.handleNavigation(event);
    expect(component.triggerContainerUpdate).toHaveBeenCalled();
  });

  it('expects "handleNavigation" to handle NavigationEnd', () => {
    const event: any = new NavigationEnd(1, '', '');
    spyOn(component, 'triggerContainerUpdate').and.stub();

    component.handleNavigation(event);
    expect(component.triggerContainerUpdate).toHaveBeenCalled();
  });

  it('expects "triggerContainerUpdate" to fire handler', () => {
    spyOn(component, 'handleContainerUpdate').and.stub();

    component.triggerContainerUpdate();
    expect(component.handleContainerUpdate).toHaveBeenCalled();
  });

  it('expects "handleContainerUpdate" to clear the HTML and stop logging', () => {
    const element: any = { innerHTML: 'HTML' };
    const document: any = {
      getElementById: () => element,
    };
    component.panel = undefined;
    spyOn(component.logging, 'stop').and.stub();
    spyOn(component, 'clearInterval').and.stub();

    component.handleContainerUpdate(document);
    expect(element.innerHTML).toEqual('');
    expect(component.logging.stop).toHaveBeenCalled();
    expect(component.clearInterval).toHaveBeenCalled();
  });

  it('expects "handleContainerUpdate" to update the HTML and stop logging', () => {
    const element: any = { innerHTML: 'HTML' };
    const document: any = {
      getElementById: () => element,
    };
    component.panel = 'MORE-HTML';
    spyOn(component.logging, 'stop').and.stub();
    spyOn(component, 'clearInterval').and.stub();

    component.handleContainerUpdate(document);
    expect(element.innerHTML).toEqual('MORE-HTML');
    expect(component.logging.stop).toHaveBeenCalled();
    expect(component.clearInterval).toHaveBeenCalled();
  });

  it('expects "replaceDivWithScript" to create and append the element with code', () => {
    const element: HTMLScriptElement = window.document.createElement('script');
    const document: any = {
      createElement: () => element,
    };
    const templateElement: HTMLElement = window.document.createElement('div');
    spyOn(component, 'copyAttributesFromTemplateToScript').and.stub();
    spyOn(component.handleScript.nativeElement, 'appendChild').and.stub();

    component.replaceDivWithScript(templateElement, document);
    expect(component.copyAttributesFromTemplateToScript).toHaveBeenCalledWith(templateElement, element);
    expect(component.handleScript.nativeElement.appendChild).toHaveBeenCalledWith(element);
  });

  it('expects "copyAttributesFromTemplateToScript" to copy', () => {
    const templateElement: HTMLElement = window.document.createElement('div');
    templateElement.setAttribute('src', 'SOURCE')
    const scriptElement: HTMLScriptElement = window.document.createElement('script');
    
    component.copyAttributesFromTemplateToScript(templateElement, scriptElement);
    expect(scriptElement.getAttribute('src')).toEqual('SOURCE');
  });
});
