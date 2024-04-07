import { Component, Input } from '@angular/core';

@Component({
    selector: 'cover-02',
    templateUrl: './cover.component.html',
    styleUrls: [
      '../cover.shared.scss',
      './cover.component.scss'
    ],
    standalone: true
})
export class Cover02Component {
  @Input() title: string = '';
  @Input() author: string = '';
  @Input() html: string = '';
}
