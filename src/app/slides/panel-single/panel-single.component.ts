import { Component, Input } from '@angular/core';
import { AbstractSlide } from '../abstract.slide';

@Component({
  selector: 'panel-single',
  templateUrl: './panel-single.component.html',
  styleUrls: [
    '../panel.shared.scss',
    './panel-single.component.scss',
  ],
  standalone: false,
})
export class PanelSingleComponent extends AbstractSlide {
  @Input() title: string = '';
  @Input() text1: string = '';

  @Input() fontsize: string | undefined = undefined;
}
