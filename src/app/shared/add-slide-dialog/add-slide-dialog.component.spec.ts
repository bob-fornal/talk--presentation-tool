import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TextFieldModule } from '@angular/cdk/text-field';

import { AddSlideDialogComponent } from './add-slide-dialog.component';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';

import { SlideStructure, SlideType } from '../../core/interfaces/slide-types';

describe('AddSlideDialogComponent', () => {
  let component: AddSlideDialogComponent;
  let fixture: ComponentFixture<AddSlideDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AddSlideDialogComponent,
      ],
      imports: [
        FormsModule,
        TextFieldModule,

        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatListModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: { close: () => ({}) } },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSlideDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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
