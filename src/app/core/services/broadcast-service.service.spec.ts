import { TestBed } from '@angular/core/testing';

import { BroadcastService } from './broadcast-service.service';
import { BroadcastMessage } from '../interfaces/broadcast';

describe('BroadcastServiceService', () => {
  let service: BroadcastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BroadcastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('expects "initialize" to configure the broadcast channel', () => {
    service.initialize();
    expect(service.broadcastChannel).toBeTruthy();
    expect(service.broadcastChannel.onmessage).toEqual(jasmine.any(Function));
  });

  it('expects "handleMessage" to update the subject', () => {
    const message: any = { data: { type: 'test'} };
    spyOn(service.onMessage, 'next').and.stub();

    service.handleMessage(message);
    expect(service.onMessage.next).toHaveBeenCalledWith({ type: 'test' });
  });

  it('expects "publish" to broadcast a message', () => {
    const message: BroadcastMessage = { type: 'test', payload: { data: 'DATA' } };
    spyOn(service.broadcastChannel, 'postMessage').and.stub();

    service.publish(message);
    expect(service.broadcastChannel.postMessage).toHaveBeenCalledWith(message);
  });

  it('expects "messagesOfType" to create an observable filter', () => {
    const results: Array<any> = [];
    function handleTest(data: any) {
      results.push(data);
    }
    const expected: Array<any> = [
      { type: 'test', payload: { data: 'test' } },
    ];
    
    service.messagesOfType('test').subscribe(handleTest);
    service.onMessage.next({ type: 'not-test', payload: { data: 'not-test' } });
    service.onMessage.next({ type: 'test', payload: { data: 'test' } });
    expect(results).toEqual(expected);
  });
});
