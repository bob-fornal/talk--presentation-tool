import { Component, Input } from '@angular/core';

@Component({
  selector: 'panel-triple',
  templateUrl: './panel-triple.component.html',
  styleUrl: './panel-triple.component.scss'
})
export class PanelTripleComponent {
  @Input() title: string = '';
  @Input() text1: string = '';
  @Input() text2: string = '';
  @Input() text3: string = '';
}
