import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';

import { AbstractSlide } from '../abstract.slide';
import { Trigger } from '../../core/interfaces/triggers';

@Component({
  selector: 'code-editor',
  templateUrl: './code-editor.component.html',
  styleUrl: './code-editor.component.scss'
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
    const response: any = this.buildResponse();
    this.save.emit(response);

    const path: string = this.route.snapshot.paramMap.get('folder')!;
    this.router.navigate(['edit', path]);
  };

  buildResponse = (): any => {
    const response: any = { ACTION: 'save', ITEMS: [] };
    this.captureElements('[data-editing]', response, document);
    this.captureAttribute('[data-files]', response, 'files', document);
    this.captureAttribute('[data-triggers]', response, 'triggers', document);

    response.notes = this.notes;
    response.slideKey = this.route.snapshot.paramMap.get('slideKey');

    response.ITEMS.push('notes');
    return response;
  };

  captureElements = (elementType: string, response: any, _document: any): void => {
    const elements: any = _document.querySelectorAll(elementType);
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
  };

  captureAttribute = (elementType: string, response: any, responseField: string, _document: any): void => {
    const checkFileElement: any = _document.querySelector(elementType);
    const checkData: any = JSON.parse(checkFileElement.dataset[responseField]);
    response[responseField] = checkData;
    response.ITEMS.push(responseField);
  };
}
