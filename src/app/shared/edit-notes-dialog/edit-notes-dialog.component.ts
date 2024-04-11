import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-edit-notes-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,

    MatButtonModule,
    MatInputModule,
    MatDialogModule,
  ],
  templateUrl: './edit-notes-dialog.component.html',
  styleUrl: './edit-notes-dialog.component.scss'
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
