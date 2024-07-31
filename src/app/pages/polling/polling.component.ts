import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Structure, StructureType } from '../../core/interfaces/structure';

import { CodeService } from '../../core/services/code.service';
import { WebSocketService } from '../../core/services/web-socket-service.service';

@Component({
  selector: 'app-polling',
  templateUrl: './polling.component.html',
  styleUrl: './polling.component.scss'
})
export class PollingComponent {
  structure: Structure = { ORDER: [], STYLE: [] };

  path: string = '';
  slideKey: string = '';
  page: StructureType = { title: '', type: '', data: { question: '', answers: [] } };

  question: string = '';
  answers: Array<{ answer: string; key: string; }> = [];

  constructor(
    private code: CodeService,
    private route: ActivatedRoute,
    private service: WebSocketService,
  ) {
    this.subscriptions.add(this.code.structure.subscribe(this.handleStructure.bind(this)));
    this.init();
  }

  private subscriptions: Subscription = new Subscription();
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  init = (): void => {
    const path: string = this.route.snapshot.paramMap.get('folder')!;
    this.path = path;
    this.code.getStructure(path);
  };

  selectAnswer = (key: string): void => {
    console.log({ key });
    this.service.sendMessage({
      type: 'sending-answer',
      payload: { key },
    });
  };

  handleStructure = (structure: Structure): void => {
    this.structure = structure;
    this.setPageByRoute(structure);
  };

  setPageByRoute = (structure: Structure): void => {
    if (this.path === '') return;
    if (structure.ORDER.length === 0) return;

    const page = this.route.snapshot.paramMap.get('slideKey')!;
    this.setPage(page, structure);
  };

  setPage = (key: string, structure: Structure): void => {
    if (structure.ORDER.length === 0) return;

    const page: StructureType = (structure[key] as StructureType);
    this.page = page;
    this.question = page.data.question;
    this.answers = [...page.data.answers];
    this.slideKey = key;
  };
}
