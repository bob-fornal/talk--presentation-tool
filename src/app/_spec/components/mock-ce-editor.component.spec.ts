import { Component, Input, Output } from '@angular/core';
import { Trigger } from 'src/app/core/interfaces/triggers';

@Component({
  selector: 'ce-editor',
  template: '<h1>ce-editor</h1>',
  standalone: true,
})
export class MockCeEditorComponent {
  @Input() title: string = '';
  @Input() path: string = '';
  @Input() folder: string = '';
  @Input() files: Array<string> = [];
  @Input() triggers: Array<Trigger> = [];
  @Input() keys: Array<string> = [];
  @Input() panel: string | undefined = undefined;
  @Input() notes: string = '';
  @Input() editing: boolean = false;
  @Output() save: any;
}