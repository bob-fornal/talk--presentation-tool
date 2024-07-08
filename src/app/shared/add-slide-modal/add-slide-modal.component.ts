import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { SlideInformationService } from 'src/app/core/services/slide-information.service';
import { SlideStructure, SlideType } from 'src/app/core/interfaces/slide-types';

@Component({
  selector: 'add-slide-modal',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatListModule
  ],
  templateUrl: './add-slide-modal.component.html',
  styleUrl: './add-slide-modal.component.scss'
})
export class AddSlideModalComponent {
  selectedType: SlideType | null = null;
  selectedStructure: SlideStructure | null = null;

  constructor(
    public service: SlideInformationService,
    public dialogRef: MatDialogRef<AddSlideModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  get slideTypes(): Array<SlideType> {
    return this.service.slideTypes;
  }

  selectSlide = (type: SlideType): void => {
    this.selectedType = type;
    this.selectedStructure = this.service.getSlideStructure(type.key);
    console.log(this.selectedType);
    console.log(this.selectedStructure);
  }

  cancel = (): void => {
    this.dialogRef.close({ type: 'cancel' });
  };

  save = (): void => {
    this.dialogRef.close({ type: 'save' });
  };
}
