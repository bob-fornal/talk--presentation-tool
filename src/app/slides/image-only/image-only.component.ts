import { Component, Input } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { EditButtonsComponent } from 'src/app/shared/edit-buttons/edit-buttons.component';

import { AbstractSlide } from '../abstract.slide';

@Component({
    selector: 'image-only',
    templateUrl: './image-only.component.html',
    styleUrls: [
      '../panel.shared.scss',
      './image-only.component.scss'
    ],
    standalone: true,
    imports: [
      MatButtonModule,
      MatDialogModule,

      EditButtonsComponent,
    ],
})
export class ImageOnlyComponent extends AbstractSlide {
  @Input() title: string = '';
  @Input() image: string = '';
  @Input() imageClass: string = '';
}
