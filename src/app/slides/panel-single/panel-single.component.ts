import { Component, Input } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { EditButtonsComponent } from 'src/app/shared/edit-buttons/edit-buttons.component';

import { AbstractSlide } from '../abstract.slide';

@Component({
    selector: 'panel-single',
    templateUrl: './panel-single.component.html',
    styleUrls: [
      '../panel.shared.scss',
      './panel-single.component.scss',
    ],
    standalone: true,
    imports: [
      MatButtonModule,
      MatDialogModule,

      EditButtonsComponent,
    ],
})
export class PanelSingleComponent extends AbstractSlide {
  @Input() title: string = '';
  @Input() text: string = '';

  @Input() fontsize: string | undefined = undefined;
}
