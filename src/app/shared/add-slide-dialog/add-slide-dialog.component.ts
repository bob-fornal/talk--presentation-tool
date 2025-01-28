import { Component, Inject, ViewChild } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { SlideStructure, SlideType } from '../../core/interfaces/slide-types';

import { SlideInformationService } from '../../core/services/slide-information.service';

@Component({
  selector: 'add-slide-dialog',
  templateUrl: './add-slide-dialog.component.html',
  styleUrl: './add-slide-dialog.component.scss',
  standalone: false,
})
export class AddSlideDialogComponent {
  @ViewChild('autosize') autosize!: CdkTextareaAutosize;
  
  selectedType: SlideType | null = null;
  selectedStructure: SlideStructure | null = null;

  constructor(
    public service: SlideInformationService,
    public dialogRef: MatDialogRef<AddSlideDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  get slideTypes(): Array<SlideType> {
    return this.service.slideTypes;
  }

  selectSlide = (type: SlideType): void => {
    this.selectedType = type;
    this.selectedStructure = this.service.getSlideStructure(type.key);
    this.data = { ...this.selectedStructure.EMPTY };
  }

  cancel = (): void => {
    this.dialogRef.close({ type: 'cancel' });
  };

  save = (): void => {
    this.dialogRef.close({ type: 'save', data: { ...this.data } });
  };

  getStructureTitle = (key: string): string => {
    return (this.selectedStructure as any)[key].title;
  };

  getStructureType = (key: string): string => {
    // console.log(key, (this.selectedStructure as any)[key].type);
    return (this.selectedStructure as any)[key].type;
  }

}
