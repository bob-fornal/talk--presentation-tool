import { Component, Input } from '@angular/core';
import { AbstractSlide } from '../abstract.slide';

@Component({
  selector: 'panel-single-table',
  templateUrl: './panel-single-table.component.html',
  styleUrls: [
    '../panel.shared.scss',
    './panel-single-table.component.scss',
  ],
  standalone: false,
})
export class PanelSingleTableComponent extends AbstractSlide {
  @Input() title: string = '';
  @Input() table: Array<Array<string>> = [[''], ['']];

  @Input() fontsize: string | undefined = undefined;

  getHeaderRow = (): Array<string> => this.table[0];

  getBodyRows = (): Array<Array<string>> => {
    const result = [];
    for (let i = 1, len = this.table.length; i < len; i++) {
      result.push([...this.table[i]]);
    }
    console.log(this.table);
    console.log(result);
    return result;
  };
}
