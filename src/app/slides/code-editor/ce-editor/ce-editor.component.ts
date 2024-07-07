import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { Trigger } from 'src/app/core/interfaces/triggers';

import { AbstractSlide } from '../../abstract.slide';

import { RowButtonsComponent } from 'src/app/shared/row-buttons/row-buttons.component';

@Component({
  selector: 'ce-editor',
  standalone: true,
  imports: [
    FormsModule,

    // MatButtonModule,
    // MatIconModule,
    MatInputModule,

    RowButtonsComponent,
  ],
  templateUrl: './ce-editor.component.html',
  styleUrls: [
    '../../panel.shared.scss',
    './ce-editor.component.scss',
  ]
})
export class CeEditorComponent extends AbstractSlide {
  @Input() title: string = '';
  @Input() path: string = '';
  @Input() folder: string = '';
  @Input() files: Array<string> = [];
  @Input() triggers: Array<Trigger> = [];
  @Input() keys: Array<string> = [];
  @Input() panel: string | undefined = undefined;

  addRow = (attribute: string, index: number, direction: number): void => {
    console.log(attribute, index, direction);
  };
  removeRow = (attribute: string, index: number): void => {
    console.log(attribute, index);
  };
}
