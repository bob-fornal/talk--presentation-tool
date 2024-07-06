import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';

import { Trigger } from 'src/app/core/interfaces/triggers';

import { AbstractSlide } from '../../abstract.slide';

@Component({
  selector: 'ce-editor',
  standalone: true,
  imports: [
    FormsModule,

    MatInputModule,
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
}
