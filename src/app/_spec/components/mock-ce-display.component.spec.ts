import { Component, Input } from '@angular/core';
import { Trigger } from '../../core/interfaces/triggers';

@Component({
  selector: 'ce-display',
  template: '<h1>ce-display</h1>',
  standalone: false,
})
export class MockCeDisplayComponent {
  @Input() title: string = '';
  @Input() path: string = '';
  @Input() folder: string = '';
  @Input() files: Array<string> = [];
  @Input() triggers: Array<Trigger> = [];
  @Input() keys: Array<string> = [];
  @Input() panel: string | undefined = undefined;
}