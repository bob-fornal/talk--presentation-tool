import { Directive, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import prettify from 'simply-beautiful';

import { MatDialog } from '@angular/material/dialog';

import { EditNotesDialogComponent } from '../shared/edit-notes-dialog/edit-notes-dialog.component';

@Directive()
export abstract class AbstractSlide implements OnDestroy {
  @Input() component: any = EditNotesDialogComponent;
  @Input() notes: string = '';

  @Input() editing: boolean = false;
  public toggleView: boolean = false;

  @Output() save: EventEmitter<any> = new EventEmitter();

  document: any = window.document;
  prettify: any = prettify;

  constructor(
    public dialog: MatDialog,
    public route: ActivatedRoute,
    public router: Router
  ) { }

  private subscriptions: Subscription = new Subscription();
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  setView = (state: boolean): void => {
    this.toggleView = state;
  };

  saveEvent = (): void => {
    const response: any = { ACTION: 'save', ITEMS: [] };
    const elements: any = this.document.querySelectorAll('[data-editing]');
    for (let i = 0, len = elements.length; i < len; i++) {
      const item = elements[i];
      const required: boolean = item.dataset.required === 'true';
      
      const length: number = this.checkItemLength(item);
      if (required === true || (required === false && length > 0)) {
        const key = item.dataset.editing;
        response.ITEMS.push(key);
        response[key] = this.getItemValue(item);
      }
    }

    response.ITEMS.push('notes');
    response.notes = this.notes;
    response.slideKey = this.route.snapshot.paramMap.get('slideKey');
    
    this.save.emit(response);

    const path: string = this.route.snapshot.paramMap.get('folder')!;
    this.router.navigate(['edit', path]);
  };

  checkItemLength = (item: any): number => {
    if (item.hasOwnProperty('value') === true) {
      return item.value.trim().length;
    } else {
      return item.innerText.trim().length;
    }
  };

  getItemValue = (item: any): string => {
    if (item.value !== undefined) {
      return item.value.trim();
    } else {
      return item.innerText.trim();
    }
  };

  cancelEvent = (): void => {
    const response: any = { ACTION: 'cancel' };
    this.save.emit(response);

    const path: string = this.route.snapshot.paramMap.get('folder')!;
    this.router.navigate(['edit', path]);
  };

  editNotes = (): void => {
    const notes = this.notes.toString();
    const dialogRef = this.dialog.open(this.component, {
      data: { notes },
      height: '400px',
      width: '600px',
    });

    this.subscriptions.add(dialogRef.afterClosed().subscribe(this.handleEditNotesClosed.bind(this)));
  };

  handleEditNotesClosed = (result: any): void => {
    if (result === undefined || result.type === 'cancel') return;

    this.notes = result.data.notes;
  };

  getCleanCode = (code: string): string => {
    const options = {
      indent_size: 4,
      indent_char: ' ',
      jslint_happy: true,
      max_char: 254,
      brace_style: 'expand',
      unformatted: ['a', 'sub', 'sup', 'b', 'i', 'u']
    };
    const converted: string = this.prettify.html(code, options);
    return converted;
  };

  convertCleanedCode = (code: string): string => {
    return code;
  };
}