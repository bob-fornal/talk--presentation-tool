import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { EditNotesDialogComponent } from 'src/app/shared/edit-notes-dialog/edit-notes-dialog.component';

@Component({
    selector: 'panel-triple',
    templateUrl: './panel-triple.component.html',
    styleUrls: [
      '../panel.shared.scss',
      './panel-triple.component.scss'
    ],
    standalone: true,
    imports: [
      MatButtonModule,
      MatDialogModule,
    ],
})
export class PanelTripleComponent {
  @Input() title: string = '';
  @Input() text1: string = '';
  @Input() text2: string = '';
  @Input() text3: string = '';
  @Input() notes: string = '';
  @Input() editing: boolean = false;

  @Output() save: EventEmitter<any> = new EventEmitter();

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  saveEvent = (): void => {
    const response: any = { type: 'save', items: [] };
    const elements: any = document.querySelectorAll('[data-editing]');
    for (let i = 0, len = elements.length; i < len; i++) {
      const item = elements[i];
      const key = item.dataset.editing;
      response.items.push(key);
      response[key] = item.innerText;
    }
    this.save.emit(response);

    const path: string = this.route.snapshot.paramMap.get('folder') || '';
    this.router.navigate(['edit', path]);
  };

  cancelEvent = (): void => {
    const response: any = { type: 'cancel' };
    this.save.emit(response);

    const path: string = this.route.snapshot.paramMap.get('folder') || '';
    this.router.navigate(['edit', path]);
  };

  editNotes = (): void => {
    const dialogRef = this.dialog.open(EditNotesDialogComponent, {
      data: { notes: this.notes },
    });

    dialogRef.afterClosed().subscribe(this.handleEditNotesClosed.bind(this));
  };

  handleEditNotesClosed = (result: any): void => {
    console.log(result);
  };
}
