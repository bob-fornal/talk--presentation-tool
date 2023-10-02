import { Component, Input } from '@angular/core';

@Component({
  selector: 'image-only',
  templateUrl: './image-only.component.html',
  styleUrls: ['./image-only.component.scss']
})
export class ImageOnlyComponent {
  @Input() title: string = '';
  @Input() image: string = '';
}
