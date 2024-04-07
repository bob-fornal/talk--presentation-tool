import { Component, Input } from '@angular/core';

@Component({
    selector: 'panel-single',
    templateUrl: './panel-single.component.html',
    styleUrls: ['../panel.shared.scss'],
    standalone: true
})
export class PanelSingleComponent {
  @Input() title: string = '';
  @Input() text: string = '';
}
