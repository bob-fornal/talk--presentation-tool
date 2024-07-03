import { Component, Input } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { AbstractSlide } from '../abstract.slide';

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
export class PanelTripleComponent extends AbstractSlide {
  @Input() title: string = '';
  @Input() text1: string = '';
  @Input() text2: string = '';
  @Input() text3: string = '';

  @Input() fontsize: string | undefined = undefined;
}
