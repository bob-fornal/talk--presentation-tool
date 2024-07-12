import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CeEditorComponent } from './ce-editor.component';

import { MatDialogModule } from '@angular/material/dialog';

import { ActivatedRoute } from '@angular/router';
import { MockActivatedRoute } from 'src/app/_spec/mock-activated-route.spec';

describe('CeEditorComponent', () => {
  let component: CeEditorComponent;
  let fixture: ComponentFixture<CeEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CeEditorComponent,
      
        MatDialogModule,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: MockActivatedRoute },
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeAll(() => {
    window.onbeforeunload = jasmine.createSpy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('expects "addRow" to handle zero index add of file', () => {
    const attribute: string = 'files';
    const index: number = 0;
    component.files = ['file1.js'];
    const expected: Array<string> = ['', 'file1.js'];

    component.addRow(attribute, index);
    expect(component.files).toEqual(expected);
  });

  it('expects "addRow" to handle last index add of file', () => {
    const attribute: string = 'files';
    const index: number = 1;
    component.files = ['file1.js'];
    const expected: Array<string> = ['file1.js', ''];

    component.addRow(attribute, index);
    expect(component.files).toEqual(expected);
  });

  it('expects "addRow" to handle zero index add of triggers', () => {
    const attribute: string = 'triggers';
    const index: number = 0;
    component.triggers = [{ title: 'TRIGGER', file: 'file1.js', init: 'INIT' }];
    const expected: Array<any> = [
      { title: '', file: '', init: '' },
      { title: 'TRIGGER', file: 'file1.js', init: 'INIT' },
    ];

    component.addRow(attribute, index);
    expect(component.triggers).toEqual(expected);
  });

  it('expects "addRow" to handle last index add of triggers', () => {
    const attribute: string = 'triggers';
    const index: number = 1;
    component.triggers = [{ title: 'TRIGGER', file: 'file1.js', init: 'INIT' }];
    const expected: Array<any> = [
      { title: 'TRIGGER', file: 'file1.js', init: 'INIT' },
      { title: '', file: '', init: '' },
    ];

    component.addRow(attribute, index);
    expect(component.triggers).toEqual(expected);
  });

  it('expects "removeRow" to handle removing a file by index', () => {
    const attribute: string = 'files';
    const index: number = 0;
    component.files = ['FILE1', 'FILE2'];
    const expected: Array<string> = ['FILE2'];

    component.removeRow(attribute, index);
    expect(component.files).toEqual(expected);
  });

  it('expects "removeRow" to handle removing a trigger by index', () => {
    const attribute: string = 'triggers';
    const index: number = 0;
    component.triggers = [
      { title: 'TRIGGER1', file: 'file1.js', init: 'INIT1' },
      { title: 'TRIGGER2', file: 'file2.js', init: 'INIT2' },
    ];;
    const expected: Array<any> = [{ title: 'TRIGGER2', file: 'file2.js', init: 'INIT2' }];

    component.removeRow(attribute, index);
    expect(component.triggers).toEqual(expected);
  });
});
