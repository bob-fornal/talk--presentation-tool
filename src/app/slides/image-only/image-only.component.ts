import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { AbstractSlide } from '../abstract.slide';

@Component({
    selector: 'image-only',
    templateUrl: './image-only.component.html',
    styleUrls: [
      '../panel.shared.scss',
      './image-only.component.scss'
    ],
    standalone: true,
    imports: [
      MatButtonModule,
      MatDialogModule,
    ],
})
export class ImageOnlyComponent extends AbstractSlide {
  @Input() title: string = '';
  @Input() image: string = '';
  @Input() imageClass: string = '';

  constructor(
    dialog: MatDialog,
    route: ActivatedRoute,
    router: Router
  ) {
    super(dialog, route, router);
  }
}
