import { Component, Input } from '@angular/core';

@Component({
  selector: 'panel-double',
  templateUrl: './panel-double.component.html',
  styleUrls: ['./panel-double.component.scss']
})
export class PanelDoubleComponent {
  @Input() title: string = '';
  @Input() textLeft: string = '';
  @Input() textRight: string = '';
}
