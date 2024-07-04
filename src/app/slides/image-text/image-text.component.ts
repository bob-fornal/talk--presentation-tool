import { Component, Input } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { EditButtonsComponent } from 'src/app/shared/edit-buttons/edit-buttons.component';

import { AbstractSlide } from '../abstract.slide';

@Component({
  selector: 'image-text',
  templateUrl: './image-text.component.html',
  styleUrls: [
    '../panel.shared.scss',
    './image-text.component.scss'
  ],
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,

    EditButtonsComponent,
  ],
})
export class ImageTextComponent extends AbstractSlide {
  @Input() title: string = '';
  @Input() orientation: string = 'left';
  @Input() text: string = '';
  @Input() image: string = '';

  @Input() fontsize: string | undefined = undefined;
}
