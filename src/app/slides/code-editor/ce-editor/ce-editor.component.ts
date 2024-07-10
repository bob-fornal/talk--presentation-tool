import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';

import { Trigger } from 'src/app/core/interfaces/triggers';

import { AbstractSlide } from '../../abstract.slide';

import { RowButtonsComponent } from 'src/app/shared/row-buttons/row-buttons.component';

type CECKey = keyof CeEditorComponent;

@Component({
  selector: 'ce-editor',
  standalone: true,
  imports: [
    FormsModule,

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

  empty: { [key: string]: any } = {
    files: '',
    triggers: { title: '', file: '', init: '' },
  };

  addRow = (attribute: string, index: number): void => {
    switch (true) {
      case attribute === 'files':
        const filesArray: Array<string> = [...this.files];
        const newFilesArray: Array<string> = [
          ...filesArray.slice(0, index),
          this.empty[attribute],
          ...filesArray.slice(index),
        ];
        this.files = newFilesArray;
        break;
      case attribute === 'triggers':
        const triggersArray: Array<Trigger> = [...this.triggers];
        const newTriggerArray: Array<Trigger> = [
          ...triggersArray.slice(0, index),
          this.empty[attribute],
          ...triggersArray.slice(index),
        ];
        this.triggers = newTriggerArray;
        break;
    }
  };

  removeRow = (attribute: string, index: number): void => {
    switch (true) {
      case attribute === 'files':
        const filesArray: Array<string> = [...this.files];
        const newFilesArray: Array<string> = filesArray.toSpliced(index, 1);
        this.files = newFilesArray;
        break;
      case attribute === 'triggers':
        const triggersArray: Array<Trigger> = [...this.triggers];
        const newTriggerArray: Array<Trigger> = triggersArray.toSpliced(index, 1);
        this.triggers = newTriggerArray;
        break;
    }
  };

  stringifyFiles = (): string => {
    return JSON.stringify(this.files);
  };

  stringifyTriggers = (): string => {
    return JSON.stringify(this.triggers);
  };
}
