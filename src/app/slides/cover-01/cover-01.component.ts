import { Component, Input } from '@angular/core';

import { AbstractSlide } from '../abstract.slide';

@Component({
  selector: 'cover-01',
  templateUrl: './cover-01.component.html',
  styleUrls: [
    '../cover.shared.scss',
    './cover-01.component.scss'
  ],
})
export class Cover01Component extends AbstractSlide {
  @Input() title: string = '';
  @Input() author: string = '';
  @Input() bio1?: string = '';
  @Input() bio2?: string = '';
  @Input() html: string = '';
}
