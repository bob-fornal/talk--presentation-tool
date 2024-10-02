import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private useLocal: boolean = false;
  private url: string = (this.useLocal === true)
    ? 'ws://localhost:3000/websocket'
    : 'wss://talk-node-server.onrender.com/websocket';
  private project: string = 'project:tech-presentation-tool';

  private ws: any;

  private _count: any = {};
  public count$: BehaviorSubject<any> = new BehaviorSubject<any>({});

  constructor() {
    this.ws = new WebSocket(this.url);
    this.ws.onmessage = this.handleOnMessage.bind(this);
    this.ws.onopen = this.handleOnOpen.bind(this);
    this.ws.onerror = this.handleOnError.bind(this);
    this.ws.onclose = this.handleOnClose.bind(this);
  }

  private handleOnMessage(event: MessageEvent<any>): void {
    const data: any = JSON.parse(event.data);
    if (data.type === 'sending-answer') {
      const key: string = data.payload.key;
      if (this._count.hasOwnProperty(key) === true) {
        this._count[key]++;
      } else {
        this._count[key] = 1;
      }
      this.count$.next(this._count);
    }
  };

  private handleOnOpen(): void {
    console.log('opened');
  };

  private handleOnError(error: any): void {
    console.log(error);
  };

  private handleOnClose(): void {
    console.log('closed');
  }

  public sendMessage = (message: any): void => {
    message.project = this.project;
    this.ws.send(JSON.stringify(message));
  };

  public closeService = (): void => {
    if (this.ws === null) return;
    this.ws.close();
    this.ws = null;
  };

  public pingNodeServer = async (): Promise<boolean> => {
    const url: string = (this.useLocal === true)
      ? 'http://localhost:3000/'
      : 'https://talk-node-server.onrender.com';
    const result: any = await fetch(url, { method: 'HEAD' });
    console.log('ping status', result.status === 200);
    return result.status === 200;
  };
}
