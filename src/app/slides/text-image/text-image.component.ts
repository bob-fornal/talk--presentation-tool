import { Component, Input } from '@angular/core';

@Component({
    selector: 'text-image',
    templateUrl: './text-image.component.html',
    styleUrls: [
      '../panel.shared.scss',
      './text-image.component.scss'
    ],
    standalone: true
})
export class TextImageComponent {
  @Input() title: string = '';
  @Input() orientation: string = 'left';
  @Input() text: string = '';
  @Input() image: string = '';
  @Input() fontsize: string | undefined = undefined;
}
