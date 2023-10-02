import { Component, Input } from '@angular/core';

@Component({
  selector: 'cover-01',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.scss']
})
export class Cover01Component {
  @Input() title: string = '';
  @Input() author: string = '';
  @Input() html: string = '';
}
