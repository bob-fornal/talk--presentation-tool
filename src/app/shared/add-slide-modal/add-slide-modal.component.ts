import { afterNextRender, Component, inject, Inject, Injector, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CdkTextareaAutosize, TextFieldModule } from '@angular/cdk/text-field';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { SlideInformationService } from 'src/app/core/services/slide-information.service';
import { SlideStructure, SlideType } from 'src/app/core/interfaces/slide-types';

@Component({
  selector: 'add-slide-modal',
  standalone: true,
  imports: [
    FormsModule,
    TextFieldModule,

    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule
  ],
  templateUrl: './add-slide-modal.component.html',
  styleUrl: './add-slide-modal.component.scss'
})
export class AddSlideModalComponent {
  private _injector = inject(Injector);
  @ViewChild('autosize') autosize!: CdkTextareaAutosize;
  
  selectedType: SlideType | null = null;
  selectedStructure: SlideStructure | null = null;

  constructor(
    public service: SlideInformationService,
    public dialogRef: MatDialogRef<AddSlideModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  triggerResize() {
    // Wait for content to render, then trigger textarea resize.
    afterNextRender(
      () => {
        this.autosize.resizeToFitContent(true);
      },
      {
        injector: this._injector,
      },
    );
  }

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
