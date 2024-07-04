import { Component, EventEmitter, Input, Output } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'edit-buttons',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './edit-buttons.component.html',
  styleUrl: './edit-buttons.component.scss'
})
export class EditButtonsComponent {
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
