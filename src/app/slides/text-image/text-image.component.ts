import { Component, Input } from '@angular/core';

@Component({
  selector: 'text-image',
  templateUrl: './text-image.component.html',
  styleUrls: ['./text-image.component.scss']
})
export class TextImageComponent {
  @Input() title: string = '';
  @Input() orientation: string = 'left';
  @Input() text: string = '';
  @Input() image: string = '';
}
