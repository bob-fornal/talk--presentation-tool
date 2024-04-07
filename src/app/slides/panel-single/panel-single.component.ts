import { Component, Input } from '@angular/core';

@Component({
    selector: 'panel-single',
    templateUrl: './panel-single.component.html',
    styleUrls: ['./panel-single.component.scss'],
    standalone: true
})
export class PanelSingleComponent {
  @Input() title: string = '';
  @Input() text: string = '';
}
