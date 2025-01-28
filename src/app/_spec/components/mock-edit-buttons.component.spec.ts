import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'edit-buttons',
  template: '<div>edit-buttons</div>',
  standalone: false,
})
export class MockEditButtonsComponent {
  @Input() editing: string = '';
  @Input() toggleView: string = '';
  @Input() saveEvent: string = '';
  @Input() cancelEvent: string = '';
  @Input() editNotes: string = '';
  @Output() toggle: EventEmitter<boolean> = new EventEmitter();
}