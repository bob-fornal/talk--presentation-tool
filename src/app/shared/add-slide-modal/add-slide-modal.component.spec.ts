import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AddSlideModalComponent } from './add-slide-modal.component';

import { SlideStructure, SlideType } from 'src/app/core/interfaces/slide-types';

describe('AddSlideModalComponent', () => {
  let component: AddSlideModalComponent;
  let fixture: ComponentFixture<AddSlideModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AddSlideModalComponent,

        MatDialogModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: { close: () => ({}) } },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddSlideModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeAll(() => {
    window.onbeforeunload = jasmine.createSpy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('expects "get slideTypes" to return slide types', () => {
    const types: Array<SlideType> = component.service.slideTypes;

    const result: Array<SlideType> = component.slideTypes;
    expect(result).toEqual(types);
  });

  it('expects "selectSlide" to set the data attribute correctly', () => {
    const type: SlideType = { title: 'Cover', key: 'cover-01' };
    const structure: SlideStructure = component.service.blankPatterns['cover-01'];

    component.selectSlide(type);
    expect(component.selectedType).toEqual(type);
    expect(component.selectedStructure).toEqual(structure);
    expect(component.data).toEqual(structure.EMPTY);
  });

  it('expects "cancel" to close the dialog', () => {
    spyOn(component.dialogRef, 'close').and.stub();

    component.cancel();
    expect(component.dialogRef.close).toHaveBeenCalledWith({ type: 'cancel' });
  });

  it('expects "save" to close the dialog', () => {
    const structure: SlideStructure = component.service.blankPatterns['cover-01'];
    const data: any = { ...structure.EMPTY };
    spyOn(component.dialogRef, 'close').and.stub();
    component.data = data;

    component.save();
    expect(component.dialogRef.close).toHaveBeenCalledWith({ type: 'save', data });
  });

  it('expects "getStructureTitle" to return the', () => {
    const key: string = 'author';
    const structure: SlideStructure = component.service.blankPatterns['cover-01'];
    const title: string = (structure as any)[key].title;
    component.selectedStructure = structure;

    const result: string = component.getStructureTitle(key);
    expect(result).toEqual(title);
  });

  it('expects "getStructureType" to return the', () => {
    const key: string = 'author';
    const structure: SlideStructure = component.service.blankPatterns['cover-01'];
    const type: string = (structure as any)[key].type;
    component.selectedStructure = structure;

    const result: string = component.getStructureType(key);
    expect(result).toEqual(type);
  });
});
