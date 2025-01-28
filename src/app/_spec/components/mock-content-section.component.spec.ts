import { Component, Input } from '@angular/core';

@Component({
  selector: 'content-section',
  template: '<h1>content-section</h1>',
  standalone: false,
})
export class MockContentSection {
  @Input() index: number = 0;
  @Input() last?: boolean = false;
  @Input() circleOnly?: boolean = false;
  @Input() biography?: boolean = false;
  @Input() dual?: boolean = false;
}