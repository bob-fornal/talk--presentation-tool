import { Component, Input } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { AddSlideModalComponent } from '../add-slide-modal/add-slide-modal.component';

@Component({
  selector: 'add-slide',
  standalone: true,
  imports: [],
  templateUrl: './add-slide.component.html',
  styleUrl: './add-slide.component.scss'
})
export class AddSlideComponent {
  @Input() index: number = -1;

  constructor(
    private dialog: MatDialog,
  ) { }

  handleAddSlide = (event: any): void => {
    event.preventDefault();

    const dialogRef = this.dialog.open(AddSlideModalComponent, {
      data: { index: this.index },
      height: '400px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(this.handleDialogClose);
  };

  handleDialogClose = (result: any) => {
    console.log(result);
  };
}
