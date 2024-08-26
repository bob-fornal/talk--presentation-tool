import { Component, Input } from '@angular/core';

@Component({
  selector: 'content-section',
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss'
})
export class SectionComponent {
  @Input() index: number = 0;
  @Input() last?: boolean = false;
  @Input() circleOnly?: boolean = false;
  @Input() biography?: boolean = false;
  @Input() dual?: boolean = false;

  isLeft = (): boolean => {
    return (this.index % 2) === 0;
  };
}
