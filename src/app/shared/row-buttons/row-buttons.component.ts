import { Component, EventEmitter, Output } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'row-buttons',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './row-buttons.component.html',
  styleUrl: './row-buttons.component.scss'
})
export class RowButtonsComponent {
  @Output() add: EventEmitter<number> = new EventEmitter();
  @Output() remove: EventEmitter<null> = new EventEmitter();

  addRow = (direction: number): void => {
    this.add.emit(direction);
  };

  removeRow = (): void => {
    this.remove.emit();
  };
}
