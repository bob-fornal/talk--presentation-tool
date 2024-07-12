import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { AbstractSlide } from './abstract.slide';

import { MatDialogModule } from '@angular/material/dialog';

import { ActivatedRoute } from '@angular/router';
import { MockActivatedRoute } from 'src/app/_spec/mock-activated-route.spec';
import { EditNotesDialogComponent } from '../shared/edit-notes-dialog/edit-notes-dialog.component';

@Component({
  selector: 'test-component',
  template: '<h1>Test Component</h1>',
  standalone: true,
  imports: [
    MatDialogModule,
  ]
})
class TestComponent extends AbstractSlide {}

describe('AbstractSlide', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
      providers: [
        { provide: ActivatedRoute, useValue: MockActivatedRoute },
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeAll(() => {
    window.onbeforeunload = jasmine.createSpy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('expects "setView" to set the state', () => {
    component.toggleView = false;

    component.setView(true);
    expect(component.toggleView).toEqual(true);

    component.setView(false);
    expect(component.toggleView).toEqual(false);
  });

  it('expects "saveEvent" to build and emit the JSON structure', () => {
    const elements: Array<any> = [
      { dataset: { editing: 'ITEM1', required: 'true' }, value: 'VALUE1' },
      { dataset: { editing: 'ITEM2', required: 'false' }, value: 'VALUE2' },
      { dataset: { editing: 'ITEM3', required: 'false' }, value: '' },
    ];
    component.document = {
      querySelectorAll: () => elements,
    };
    component.notes = 'NOTES';
    const expected: any = {
      ACTION: 'save',
      ITEMS: ['ITEM1', 'ITEM2', 'notes'],
      ITEM1: 'VALUE1',
      ITEM2: 'VALUE2',
      notes: 'NOTES',
      slideKey: 'SLIDE-KEY',
    };
    spyOn(component.save, 'emit').and.stub();
    spyOn(component.router, 'navigate').and.stub();

    component.saveEvent();
    expect(component.save.emit).toHaveBeenCalledWith(expected);
    expect(component.router.navigate).toHaveBeenCalledWith(['edit', 'FOLDER']);
  });

  it('expects "checkItemLength" to return a length if item has a value', () => {
    const item: any = { value: 'VALUE' };

    const result: number = component.checkItemLength(item);
    expect(result).toEqual(5);
  });

  it('expects "checkItemLength" to return a length if item does not have a value', () => {
    const item: any = { innerText: 'INNER-TEXT' };

    const result: number = component.checkItemLength(item);
    expect(result).toEqual(10);
  });

  it('expects "getItemValue" to return a length if item has a value', () => {
    const item: any = { value: 'VALUE' };

    const result: string = component.getItemValue(item);
    expect(result).toEqual('VALUE');
  });

  it('expects "getItemValue" to return a length if item does not have a value', () => {
    const item: any = { innerText: 'INNER-TEXT' };

    const result: string = component.getItemValue(item);
    expect(result).toEqual('INNER-TEXT');
  });

  it('expects "cancelEvent" to emit and route', () => {
    spyOn(component.save, 'emit').and.stub();
    spyOn(component.router, 'navigate').and.stub();

    component.cancelEvent();
    expect(component.save.emit).toHaveBeenCalledWith({ ACTION: 'cancel' });
    expect(component.router.navigate).toHaveBeenCalledWith(['edit', 'FOLDER']);
  });

  it('expects "editNotes" to open the dialog', () => {
    component.notes = 'NOTES';
    spyOn(component.dialog, 'open').and.callThrough();

    component.editNotes();
    expect(component.dialog.open).toHaveBeenCalledWith(EditNotesDialogComponent, {
      data: { notes: 'NOTES' },
      height: '400px',
      width: '600px',
    });
  });

  it('expects "handleEditNotesCoded" to handle undefined', () => {
    const result: any = undefined;
    component.notes = '';

    component.handleEditNotesClosed(result);
    expect(component.notes).toEqual('');
  });

  it('expects "handleEditNotesCoded" to handle cancel', () => {
    const result: any = { type: 'cancel' };
    component.notes = '';

    component.handleEditNotesClosed(result);
    expect(component.notes).toEqual('');
  });

  it('expects "handleEditNotesCoded" to handle cancel', () => {
    const result: any = { type: 'save', data: { notes: 'NOTES' } };
    component.notes = '';

    component.handleEditNotesClosed(result);
    expect(component.notes).toEqual('NOTES');
  });

  it('expects "getCleanCode" to use the 3rd-party tool', () => {
    const code: string = 'CODE';
    spyOn(component.prettify, 'html').and.returnValue('CONVERTED-CODE');

    const result: string = component.getCleanCode(code);
    expect(result).toEqual('CONVERTED-CODE');
  });

  it('expects "convertCleanedCode" to do nothing, return the original code', () => {
    const code: string = 'CODE';

    const result: string = component.convertCleanedCode(code);
    expect(result).toEqual('CODE');
  });
});
