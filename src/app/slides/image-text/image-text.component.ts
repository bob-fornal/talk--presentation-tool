import { Component, Input } from '@angular/core';

import { AbstractSlide } from '../abstract.slide';

@Component({
  selector: 'image-text',
  templateUrl: './image-text.component.html',
  styleUrls: [
    '../panel.shared.scss',
    './image-text.component.scss'
  ],
  standalone: false,
})
export class ImageTextComponent extends AbstractSlide {
  @Input() title: string = '';
  @Input() orientation: string = 'left';
  @Input() text1: string = '';
  @Input() image: string = '';

  @Input() fontsize: string | undefined = undefined;
}
