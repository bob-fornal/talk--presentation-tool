import { Component, Input } from '@angular/core';

import { AbstractSlide } from '../abstract.slide';

@Component({
  selector: 'panel-double',
  templateUrl: './panel-double.component.html',
  styleUrls: [
    '../panel.shared.scss',
    './panel-double.component.scss'
  ],
})
export class PanelDoubleComponent extends AbstractSlide {
  @Input() title: string = '';
  @Input() text1: string = '';
  @Input() text2: string = '';

  @Input() fontsize: string | undefined = undefined;
}

