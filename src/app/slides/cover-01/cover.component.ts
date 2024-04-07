import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
    selector: 'cover-01',
    templateUrl: './cover.component.html',
    styleUrls: ['./cover.component.scss'],
    standalone: true,
    imports: [NgIf]
})
export class Cover01Component {
  @Input() title: string = '';
  @Input() author: string = '';
  @Input() bio1?: string = '';
  @Input() bio2?: string = '';
  @Input() html: string = '';
}
