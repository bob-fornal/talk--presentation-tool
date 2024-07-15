import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';

import { AddSlideDialogComponent } from '../add-slide-dialog/add-slide-dialog.component';

@Component({
  selector: 'add-slide',
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

    const dialogRef = this.dialog.open(AddSlideDialogComponent, {
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
