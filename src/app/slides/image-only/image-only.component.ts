import { Component, Input } from '@angular/core';

import { AbstractSlide } from '../abstract.slide';

@Component({
  selector: 'image-only',
  templateUrl: './image-only.component.html',
  styleUrls: [
    '../panel.shared.scss',
    './image-only.component.scss'
  ],
  standalone: false,
})
export class ImageOnlyComponent extends AbstractSlide  {
  @Input() title: string = '';
  @Input() image: string = '';
  @Input() imageClass: string = '';
}
