import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { BroadcastMessage } from '../interfaces/broadcast';

@Injectable({
  providedIn: 'root'
})
export class BroadcastService {
  details: any = {
    channelName: 'presentation-tool',
    typeNavigation: 'navigation',
    typeSize: 'size'
  };

  broadcastChannel: any;
  onMessage = new Subject<any>();

  constructor() {
    this.initialize();
  }

  initialize() {
    const name: string = this.details.detailChangeChannel;
    this.broadcastChannel = new BroadcastChannel(name);
    this.broadcastChannel.onmessage = (message: any) => this.onMessage.next(message.data);
  }

  publish(message: BroadcastMessage): void {
    this.broadcastChannel.postMessage(message);
  }

  messagesOfType(type: string): Observable<BroadcastMessage> {
    return this.onMessage.pipe(
      filter(message => message.type === type)
    );
  }
}