import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'panel-triple',
  templateUrl: './panel-triple.component.html',
  styleUrl: './panel-triple.component.scss'
})
export class PanelTripleComponent {
  @Input() title: string = '';
  @Input() text1: string = '';
  @Input() text2: string = '';
  @Input() text3: string = '';
  @Input() editing: boolean = false;

  @Output() save: EventEmitter<any> = new EventEmitter();

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  saveEvent = (): void => {
    const response: any = { type: 'save', items: [] };
    const elements: any = document.querySelectorAll('[data-editing]');
    for (let i = 0, len = elements.length; i < len; i++) {
      const item = elements[i];
      const key = item.dataset.editing;
      response.items.push(key);
      response[key] = item.innerText;
    }
    this.save.emit(response);

    const path: string = this.route.snapshot.paramMap.get('folder') || '';
    this.router.navigate(['edit', path]);
  };
}
