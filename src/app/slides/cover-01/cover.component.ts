import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { EditButtonsComponent } from 'src/app/shared/edit-buttons/edit-buttons.component';

import { AbstractSlide } from '../abstract.slide';

@Component({
    selector: 'cover-01',
    templateUrl: './cover.component.html',
    styleUrls: [
      '../cover.shared.scss',
      './cover.component.scss'
    ],
    standalone: true,
    imports: [
      NgIf,

      MatButtonModule,
      MatDialogModule,

      EditButtonsComponent,
    ],
})
export class Cover01Component extends AbstractSlide {
  @Input() title: string = '';
  @Input() author: string = '';
  @Input() bio1?: string = '';
  @Input() bio2?: string = '';
  @Input() html: string = '';
}
