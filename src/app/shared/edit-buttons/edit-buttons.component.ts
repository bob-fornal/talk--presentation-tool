import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'edit-buttons',
  templateUrl: './edit-buttons.component.html',
  styleUrl: './edit-buttons.component.scss'
})
export class EditButtonsComponent {
  @Input() editing: boolean = false;
  @Input() toggleView: boolean = false;

  @Input() saveEvent: any;
  @Input() cancelEvent: any;
  @Input() editNotes: any;

  @Output() toggle: EventEmitter<boolean> = new EventEmitter()

  triggerToggleView = (): void => {
    this.toggleView = !this.toggleView;
    this.toggle.emit(this.toggleView);
  };
}
