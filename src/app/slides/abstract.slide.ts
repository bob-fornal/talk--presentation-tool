import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { EditNotesDialogComponent } from 'src/app/shared/edit-notes-dialog/edit-notes-dialog.component';

@Directive()
export abstract class AbstractSlide {
  @Input() notes: string = '';

  @Input() editing: boolean = false;

  @Output() save: EventEmitter<any> = new EventEmitter();

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  saveEvent = (): void => {
    const response: any = { ACTION: 'save', ITEMS: [] };
    const elements: any = document.querySelectorAll('[data-editing]');
    for (let i = 0, len = elements.length; i < len; i++) {
      const item = elements[i];
      const required = item.dataset.required;
      if (required === true || (required === false && item.value.length > 0)) {
        const key = item.dataset.editing;
        response.ITEMS.push(key);
        response[key] = item.value;  
      }
    }

    response.ITEMS.push('notes');
    response.notes = this.notes;
    response.slideKey = this.route.snapshot.paramMap.get('slideKey');
    
    this.save.emit(response);

    const path: string = this.route.snapshot.paramMap.get('folder') || '';
    this.router.navigate(['edit', path]);
  };

  cancelEvent = (): void => {
    const response: any = { ACTION: 'cancel' };
    this.save.emit(response);

    const path: string = this.route.snapshot.paramMap.get('folder') || '';
    this.router.navigate(['edit', path]);
  };

  editNotes = (): void => {
    const notes = this.notes.toString();
    const dialogRef = this.dialog.open(EditNotesDialogComponent, {
      data: { notes },
    });

    dialogRef.afterClosed().subscribe(this.handleEditNotesClosed.bind(this));
  };

  handleEditNotesClosed = (result: any): void => {
    if (result === undefined || result.type === 'cancel') return;

    this.notes = result.data.notes;
    console.log(result, this.notes);
  };

}