import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeEditorComponent } from './code-editor.component';
import { EditButtonsComponent } from '../../shared/edit-buttons/edit-buttons.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { MockCeDisplayComponent } from '../../_spec/components/mock-ce-display.component.spec';
import { MockCeEditorComponent } from '../../_spec/components/mock-ce-editor.component.spec';

import { ActivatedRoute } from '@angular/router';
import { MockActivatedRoute } from '../../_spec/mock-activated-route.spec';

import { CodeService } from '../../core/services/code.service';
import { MockCodeService } from '../../_spec/services/mock-code.service.spec';

import { NGX_MONACO_EDITOR_CONFIG } from 'ngx-monaco-editor-v2';

describe('CodeEditorComponent', () => {
  let component: CodeEditorComponent;
  let fixture: ComponentFixture<CodeEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CodeEditorComponent,
        EditButtonsComponent,

        MockCeDisplayComponent,
        MockCeEditorComponent,
      ],
      imports: [
        MatDialogModule,
        MatIconModule,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: MockActivatedRoute },
        { provide: CodeService, useValue: MockCodeService },
        { provide: NGX_MONACO_EDITOR_CONFIG, useValue: {} },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('expects "saveEvent" to emit a response and navigate to edit/path', () => {
    spyOn(component, 'buildResponse').and.returnValue('RESPONSE');
    spyOn(component.save, 'emit').and.stub();
    spyOn(component.router, 'navigate').and.stub();

    component.saveEvent();
    expect(component.save.emit).toHaveBeenCalledWith('RESPONSE');
    expect(component.router.navigate).toHaveBeenCalledWith(['edit', 'FOLDER']);
  });

  it('expects "buildResponse" to capture data and return the correct object', () => {
    spyOn(component, 'captureElements').and.stub();
    spyOn(component, 'captureAttribute').and.stub();
    component.notes = 'NOTES';
    const expected: any = {
      ACTION: 'save',
      ITEMS: ['notes'],
      slideKey: 'SLIDE-KEY',
      notes: 'NOTES'
    };

    const response: any = component.buildResponse();
    expect(component.captureElements).toHaveBeenCalled();
    expect(component.captureAttribute).toHaveBeenCalledTimes(2);
    expect(response).toEqual(expected);
  });

  it('expects "captureElements" to loop over elements and capture those needed', () => {
    const elementType: string = 'ELEMENT-TYPE';
    const response: any = { ITEMS: [] };
    const elements: Array<any> = [
      { dataset: { required: 'true', editing: 'FIELD1' }, value: 'VALUE1' },
      { dataset: { required: 'false', editing: 'FIELD2' }, value: 'VALUE2' },
      { dataset: { required: 'false', editing: 'FIELD3' }, value: '' },
    ];
    const _document: any = {
      querySelectorAll: () => elements,
    };
    const expected = { ITEMS: ['FIELD1', 'FIELD2'], FIELD1: 'VALUE1', FIELD2: 'VALUE2' };

    component.captureElements(elementType, response, _document);
    expect(response).toEqual(expected);
  });

  it('expects "captureAttribute" to get the attribute data', () => {
    const elementType: string = 'ELEMENT-TYPE';
    const response: any = { ITEMS: [] };
    const responseField: string = 'files'
    const element: any = { dataset: { files: `["FILE1", "FILE2"]` } };
    const _document: any = {
      querySelector: () => element,
    };
    const expected = { ITEMS: ['files'], files: ['FILE1', 'FILE2'] };

    component.captureAttribute(elementType, response, responseField, _document);
    expect(response).toEqual(expected);
  });
});
