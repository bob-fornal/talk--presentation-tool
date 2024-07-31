import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { AbstractSlide } from '../abstract.slide';

import { WebSocketService } from '../../core/services/web-socket-service.service';

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
  @Input() data: any = {};

  @Input() fontsize: string | undefined = undefined;

  pollingPage: string = '';
  count: any = {};

  constructor(
    public override dialog: MatDialog,
    public override route: ActivatedRoute,
    public override router: Router,
    
    private service: WebSocketService,
  ) {
    super(dialog, route, router);
    this.service.count$.subscribe(this.handleCountChange.bind(this));
  }

  ngOnInit(): void {
    const origin: string = 'https://www.bobs-tech-presentations.com';
    const page: string = 'polling';
    const folder: string = this.route.snapshot.params['folder'];
    const slideKey: string = this.route.snapshot.params['slideKey'];

    const pollingPage: string = `${origin}/${page}/${folder}/${slideKey}`
    this.pollingPage = pollingPage;
  }

  handleCountChange = (data: any) => {
    this.count = data;
  };

  getWidth = (key: string): string => {
    if (this.count.hasOwnProperty(key) === false) return 'width: 0.25em;';
    const total = this.getTotalCount();
    const width = (this.count[key] / total) * 100;
    return `width: ${width}%;`;
  };

  getTotalCount = (): number => {
    let count: number = 0;
    const keys: Array<string> = Object.keys(this.count);
    keys.forEach((key: string) => {
      count += this.count[key];
    });
    return count;
  };

  getItemCount = (key: string): string => {
    if (this.count.hasOwnProperty(key) === false) return '';
    return this.count[key].toString();
  };
}
