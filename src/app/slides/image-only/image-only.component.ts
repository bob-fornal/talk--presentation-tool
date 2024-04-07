import { Component, Input } from '@angular/core';

@Component({
    selector: 'image-only',
    templateUrl: './image-only.component.html',
    styleUrls: [
      '../panel.shared.scss',
      './image-only.component.scss'
    ],
    standalone: true
})
export class ImageOnlyComponent {
  @Input() title: string = '';
  @Input() image: string = '';
}
