import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'edit-notes-dialog',
  templateUrl: './edit-notes-dialog.component.html',
  styleUrl: './edit-notes-dialog.component.scss',
  standalone: false,
})
export class EditNotesDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<EditNotesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  cancel = (): void => {
    this.dialogRef.close({ type: 'cancel' });
  };

  save = (): void => {
    this.dialogRef.close({ type: 'save', data: this.data });
  };

  handleNotesChange = (notes: string): void => {
    this.data.notes = notes;
  };
}
