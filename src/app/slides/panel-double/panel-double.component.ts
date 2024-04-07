import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'panel-double',
    templateUrl: './panel-double.component.html',
    styleUrls: ['./panel-double.component.scss'],
    standalone: true,
    imports: [MatButtonModule]
})
export class PanelDoubleComponent {
  @Input() title: string = '';
  @Input() textLeft: string = '';
  @Input() textRight: string = '';
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
