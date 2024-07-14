import { Component, Input, OnDestroy } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { AddSlideModalComponent } from '../add-slide-modal/add-slide-modal.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'add-slide',
  standalone: true,
  imports: [],
  templateUrl: './add-slide.component.html',
  styleUrl: './add-slide.component.scss'
})
export class AddSlideComponent implements OnDestroy {
  @Input() index: number = -1;

  constructor(
    private dialog: MatDialog,
  ) { }

  private subscriptions: Subscription = new Subscription();
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }


  handleAddSlide = (event: any): void => {
    event.preventDefault();

    const dialogRef = this.dialog.open(AddSlideModalComponent, {
      data: { index: this.index },
      height: '600px',
      width: '800px',
    });

    this.subscriptions.add(dialogRef.afterClosed().subscribe(this.handleDialogClose));
  };

  handleDialogClose = (result: any) => {
    console.log(result);
  };
}
