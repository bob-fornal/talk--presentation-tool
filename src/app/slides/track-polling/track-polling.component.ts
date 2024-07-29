import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { AbstractSlide } from '../abstract.slide';
import { Location, LocationStrategy } from '@angular/common';

@Component({
  selector: 'track-polling',
  templateUrl: './track-polling.component.html',
  styleUrls: [
    '../panel.shared.scss',
    './track-polling.component.scss',
  ]
})
export class TrackPollingComponent extends AbstractSlide implements OnInit {
  @Input() title: string = '';
  @Input() text1: string = '';

  @Input() fontsize: string | undefined = undefined;

  pollingPage: string = '';

  constructor(
    public override dialog: MatDialog,
    private location: Location,
    private locationStrategy: LocationStrategy,
    public override route: ActivatedRoute,
    public override router: Router
  ) {
    super(dialog, route, router);
  }

  ngOnInit(): void {
    const origin: string = 'https://www.bobs-tech-presentations.com';
    const folder: string = this.route.snapshot.params['folder'];
    const slideKey: string = this.route.snapshot.params['slideKey'];
    const page: string = `${origin}/${folder}/${slideKey}`
    this.pollingPage = page;
  }
}
