import { Component, Input } from '@angular/core';

import { AbstractSlide } from '../abstract.slide';

@Component({
  selector: 'cover-image-wrap',
  templateUrl: './cover-image-wrap.component.html',
  styleUrls: [
    '../cover.shared.scss',
    './cover-image-wrap.component.scss'
  ],
  standalone: false,
})
export class CoverImageWrapComponent extends AbstractSlide {
  @Input() title: string = '';
  @Input() author: string = '';
  @Input() image: string = '';
}
