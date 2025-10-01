import { Component, Input } from '@angular/core';

import { AbstractSlide } from '../abstract.slide';

@Component({
  selector: 'image-double',
  templateUrl: './image-double.component.html',
  styleUrls: [
    '../panel.shared.scss',
    './image-double.component.scss'
  ],
  standalone: false,
})
export class ImageDoubleComponent extends AbstractSlide {
  @Input() title: string = '';
  @Input() image1: string = '';
  @Input() image2: string = '';
}
