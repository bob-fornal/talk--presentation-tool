import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { AbstractSlide } from '../abstract.slide';

@Component({
    selector: 'panel-double',
    templateUrl: './panel-double.component.html',
    styleUrls: [
      '../panel.shared.scss',
      './panel-double.component.scss'
    ],
    standalone: true,
    imports: [
      MatButtonModule,
      MatDialogModule,
    ],
})
export class PanelDoubleComponent extends AbstractSlide {
  @Input() title: string = '';
  @Input() textLeft: string = '';
  @Input() textRight: string = '';

  @Input() fontsize: string | undefined = undefined;

  constructor(
    dialog: MatDialog,
    route: ActivatedRoute,
    router: Router
  ) {
    super(dialog, route, router);
  }
}
