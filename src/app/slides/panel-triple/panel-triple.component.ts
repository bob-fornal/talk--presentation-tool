import { Component, Input } from '@angular/core';
import { AbstractSlide } from '../abstract.slide';

@Component({
  selector: 'panel-triple',
  templateUrl: './panel-triple.component.html',
  styleUrls: [
    '../panel.shared.scss',
    './panel-triple.component.scss'
  ],
  standalone: false,
})
export class PanelTripleComponent extends AbstractSlide {
  @Input() title: string = '';
  @Input() text1: string = '';
  @Input() text2: string = '';
  @Input() text3: string = '';

  @Input() fontsize: string | undefined = undefined;
}
