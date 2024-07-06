import { Component, Input } from '@angular/core';

import { Trigger } from 'src/app/core/interfaces/triggers';

import { AbstractSlide } from '../abstract.slide';
import { EditButtonsComponent } from 'src/app/shared/edit-buttons/edit-buttons.component';
import { CeDisplayComponent } from './ce-display/ce-display.component';
import { CeEditorComponent } from './ce-editor/ce-editor.component';

import { Subject } from 'rxjs';

@Component({
    selector: 'code-editor',
    templateUrl: './code-editor.component.html',
    standalone: true,
    styleUrl: './code-editor.component.scss',
    imports: [
      EditButtonsComponent,
      CeDisplayComponent,
      CeEditorComponent,
    ]
})
export class CodeEditorComponent extends AbstractSlide {
  @Input() title: string = '';
  @Input() path: string = '';
  @Input() folder: string = '';
  @Input() files: Array<string> = [];
  @Input() triggers: Array<Trigger> = [];
  @Input() keys: Array<string> = [];
  @Input() panel: string | undefined = undefined;

  @Input() external: Subject<any> = new Subject();

  override saveEvent = (): void => {
    const response: any = { ACTION: 'save', ITEMS: [] };
    const elements: any = document.querySelectorAll('[data-editing]');
    for (let i = 0, len = elements.length; i < len; i++) {
      const item = elements[i];
      const required: boolean = item.dataset.required === 'true';
      
      const length: number = this.checkItemLength(item);
      if (required === true || (required === false && length > 0)) {
        const key = item.dataset.editing;
        response.ITEMS.push(key);
        response[key] = this.getItemValue(item);
      }
    }

    response.ITEMS.push('notes');
    response.notes = this.notes;
    response.slideKey = this.route.snapshot.paramMap.get('slideKey');
    
    console.log('response', response);
    this.save.emit(response);

    const path: string = this.route.snapshot.paramMap.get('folder') || '';
    this.router.navigate(['edit', path]);
  };
}
